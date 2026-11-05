@REM Modified by Onyou Office on 2026-10-31 for the independent Onyou Office local development build.
@echo off
rem onyouoffice launcher for the packaged Windows app: <install>\resources\cli\onyouoffice.cmd
setlocal
set ELECTRON_RUN_AS_NODE=1
"%~dp0..\..\Onyou Office.exe" "%~dp0genoffice.cjs" %*
endlocal
