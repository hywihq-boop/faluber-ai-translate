# Changelog

All notable changes to Faluber AI翻译.

## [0.1.1] - 2026-07-19
- 修复圆形 mini 球无法拖拽的 bug
- 修复 Alt+T 第二次按不会还原原文的 bug（START_TRANSLATION 改为三段切换）
- 修复删除打赏 CSS 后模板字符串未闭合导致插件不加载的 bug

## [0.1.0] - 2026-07-19
- 插件更名为 **Faluber AI翻译**（Edge 商店上架准备）
- 移除打赏功能（CSS/弹窗/计数逻辑/二维码图标）
- 版本号重置为 0.1.0（测试版）

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
