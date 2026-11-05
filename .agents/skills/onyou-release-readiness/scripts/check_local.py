"""Run the existing text boundary checker locally; never certify unreviewed binaries."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys

PROJECT = Path(__file__).resolve().parents[4]


def private_path(value):
    allowed = (PROJECT / '.local/review').resolve()
    path = Path(value).resolve()
    if not allowed.is_relative_to(PROJECT) or not path.is_relative_to(allowed):
        raise ValueError('Private evidence must stay under project .local/review')
    return path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--candidate', required=True)
    parser.add_argument('--deny-file', required=True)
    parser.add_argument('--report', required=True)
    parser.add_argument('--staged', action='store_true')
    args = parser.parse_args()
    report = private_path(args.report)
    candidate = Path(args.candidate).resolve()
    if candidate != PROJECT and not candidate.is_relative_to(private_path('.local/review')):
        raise ValueError('Candidate must be this project or its private review workspace')
    deny = private_path(args.deny_file)
    if report.suffix != '.json':
        raise ValueError('Reports must be JSON evidence files')
    if report.exists():
        if report.stat().st_nlink != 1 or report.samefile(deny):
            raise ValueError('Report is a hard link or the deny file')
        previous = json.loads(report.read_text())
        if not isinstance(previous, dict) or previous.get('checker') != 'tools/check-public-boundary.mjs':
            raise ValueError('Refuse to overwrite unrelated evidence')
    if not deny.is_file() or report == deny:
        raise ValueError('Missing deny file or colliding report destination')
    # The Node checker validates deny-list shape. Never print its contents.
    wrapper = PROJECT / '.codex/bin/onyou-dev'
    node = [str(wrapper), 'node'] if wrapper.is_file() else [shutil.which('node') or 'node']
    guard = Path('/usr/bin/sandbox-exec')
    if sys.platform != 'darwin' or not guard.is_file():
        print(json.dumps({'status': 'incomplete', 'reason': 'network-denied-runner-required'}))
        return 2
    env = os.environ.copy()
    for key in list(env):
        if key.startswith('GIT_') or any(x in key.upper() for x in ['TOKEN', 'SECRET', 'API_KEY']):
            env.pop(key, None)
    policy = '(version 1)(allow default)(deny network*)'
    scope = subprocess.run([str(guard), '-p', policy, 'git', 'rev-parse', '--show-toplevel'],
                           cwd=candidate, env=env, stdout=subprocess.PIPE,
                           stderr=subprocess.PIPE, timeout=15)
    if scope.returncode or Path(scope.stdout.decode().strip()).resolve() != candidate:
        raise ValueError('Candidate must be the exact Git root')
    relative_report = str(report.relative_to(PROJECT))
    ignored = subprocess.run([str(guard), '-p', policy, 'git', 'check-ignore', '--no-index', '-q', '--', relative_report],
                             cwd=PROJECT, env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=15)
    tracked = subprocess.run([str(guard), '-p', policy, 'git', 'ls-files', '--error-unmatch', '--', relative_report],
                             cwd=PROJECT, env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=15)
    if ignored.returncode != 0 or tracked.returncode != 1:
        raise ValueError('Evidence must be ignored and untracked')
    command = [str(guard), '-p', policy, *node,
               str(PROJECT / 'tools/check-public-boundary.mjs'), '--deny-file', str(deny)]
    if args.staged:
        command.append('--staged')
    proc = subprocess.run(command, cwd=candidate, env=env, stdout=subprocess.PIPE,
                          stderr=subprocess.PIPE, timeout=120)
    try:
        result = json.loads(proc.stdout)
        if not isinstance(result.get('passed'), bool) or not isinstance(result.get('uninspectedBinaryOrSymlink'), int):
            raise ValueError('Unexpected checker output')
    except (ValueError, AttributeError):
        # Never print raw tool output or an exception that could contain private values.
        print(json.dumps({'status': 'incomplete', 'reason': 'checker-failed-or-invalid-output'}))
        return 2
    omitted = result['uninspectedBinaryOrSymlink']
    if not result['passed'] or proc.returncode != 0:
        status, code = 'blocked', 1
    elif omitted:
        status, code = 'incomplete', 2
    else:
        status, code = 'text-scope-passed', 0
    payload = {'status': status, 'scope': 'index-text' if args.staged else 'working-text',
               'releaseApproved': False, 'networkDeniedForChecker': True,
               'historyReviewed': False, 'mediaReviewed': False, 'installerReviewed': False,
               'checker': 'tools/check-public-boundary.mjs',
               'checkerSha256': hashlib.sha256((PROJECT / 'tools/check-public-boundary.mjs').read_bytes()).hexdigest(),
               'evidenceReusableWithoutCandidateManifest': False, 'result': result}
    report.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    flags = os.O_WRONLY | os.O_CREAT | os.O_TRUNC | getattr(os, 'O_NOFOLLOW', 0)
    fd = os.open(report, flags, 0o600)
    with os.fdopen(fd, 'w') as stream:
        os.fchmod(stream.fileno(), 0o600)
        json.dump(payload, stream, indent=2)
        stream.write('\n')
    print(json.dumps({'status': status, 'textFiles': result['textFiles'],
                      'findings': len(result['failures']), 'uninspected': omitted,
                      'releaseApproved': False}))
    return code


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (ValueError, OSError, subprocess.SubprocessError):
        print(json.dumps({'status': 'incomplete', 'reason': 'local-check-could-not-complete'}))
        sys.exit(2)
