# README translations

The canonical introduction is the English [root README](../../README.md).
The other 20 introductions in `i18n/` cover all 21 interface languages.
This follows the existing translated-document boundary of the English-comment guard. English appears first
in language navigation; the remaining languages follow the ISO-code ordering in
`LANG_OPTIONS` in the Shell settings. The app language order is unchanged.

Use the same outline: product purpose, capabilities, getting started, AI/cost/data,
known limitations, contribution routes, and license/origins. Localize for readers;
do not copy the upstream author's personal story or make new product claims.
Translate these essentials in every version. Detailed developer documents remain
in their existing languages; these introductions do not imply every repository
document is available in 21 languages.

When changing a fact, update the English original and all translations together.
Keep setup commands, provider limitations, source-preview status, support address,
Apache-2.0 and upstream acknowledgements consistent. `README.en.md` remains a
compatibility link to the English homepage. Do not add installer/download badges
before installers are actually available.

Use native language names without flag icons. Keep paragraphs and word boundaries
readable; do not insert arbitrary hard line breaks into translated sentences.
Arabic and Hebrew use right-to-left prose; keep commands in fenced code blocks.
Report wording corrections through the repository's normal pull-request process.

Structure reference: [GitHub's README guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes).
There is no mandatory universal GitHub README template.

## Header and badges

The English homepage uses the existing product icon and the product name alone.
Keep language choices in an expandable section. Stars and CI badges must point to
this repository, and the Apache badge links to the actual project license.

Product Hunt and Trendshift embeds require the actual product/repository entry and
its issued identifier. Add those only when available and use award/rank wording
only when it is true. Do not borrow another product's badge, claim GitHub Trending
placement, or show a download badge before an installer release exists.
