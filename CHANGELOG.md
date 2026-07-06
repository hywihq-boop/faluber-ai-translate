# Changelog

All notable changes to Faluber Translate.

## [2.0.10] - 2025-07-07
- Auto-hide floating widget when video enters fullscreen

## [2.0.9] - 2025-07-06
- Code cleanup and optimization

## [2.0.8] - 2025-07-05
- Auto-split long text into segments for translation

## [2.0.7] - 2025-07-04
- Dynamic `max_tokens` for panel translation
- Cache hit rate improvements

## [2.0.6] - 2025-07-03
- Panel translation: abort in-flight requests, extend debounce, reduce `max_tokens`

## [2.0.5] - 2025-07-02
- Panel translation improvements: merge input listeners, auto-retranslate on clear

## [2.0.2] - 2025-07-01
- Display version number in popup
- Enhanced "context invalidated" error tolerance
- Fixed Japanese kana text being skipped by CJK detection
- Fixed Japanese translation: lowered `minLen` to 1 for non-Chinese target languages

## [2.0.0] - 2025-06-30
- **Breaking**: Removed low-tier mode; kept Standard and High modes
- Ctrl+Explain bubble: cursor-level precision with `caretRangeFromPoint`
- New floating translation panel (`Alt+Q`) with side-by-side input/output
- Panel target language follows global settings
- Added `reasoning_effort: low` to translation and explain requests
- Product website redesigned as single-page scrolling layout

## [1.x] - 2025-06
- Initial releases with core translation functionality
- Multi-API management (10 provider presets)
- 50 target languages + 20 UI languages
- Smart caching with persistent storage
- Hover-to-see-original
- Scroll-aware viewport translation
- MutationObserver for dynamic content
