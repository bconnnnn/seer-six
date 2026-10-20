# Six connected interfaces for Seer

A public, interactive design study for the [Seer design contest on POIDH](https://poidh.xyz/mainnet/bounty/38), following the **Electric Foundation** visual direction (violet accents, dark/light treatments, compact market surfaces).

This is original concept work, not a fork of Seer production software, and is **not** a wallet, a trading application or a provider of live market data.

## Six publicly hosted demos

1. **Seer homepage:** https://bconnnnn.github.io/seer-six/?view=home
2. **Seer App (general market explorer):** https://bconnnnn.github.io/seer-six/?view=markets
3. **Deep (multi-outcome and AI-agent markets):** https://bconnnnn.github.io/seer-six/?view=deep
4. **Futarchy (conditional market outcomes):** https://bconnnnn.github.io/seer-six/?view=futarchy
5. **Opportunity Markets (reviewer-selection forecasts):** https://bconnnnn.github.io/seer-six/?view=opportunities
6. **Risk Pricing (comparative DeFi risk):** https://bconnnnn.github.io/seer-six/?view=risk

## What works

- Shared navigation and an Electric Foundation-inspired purple theme, with a light/dark mode switch.
- Market Explorer: instant text search, category filtering, session watchlist.
- Deep: select among four mutually exclusive outcomes and inspect candidate context.
- Futarchy: change a hypothetical adoption assumption and inspect both conditional scenario estimates.
- Opportunity Markets: sort, select, and compare submissions without granting the market decision authority.
- Risk Pricing: change time horizon or protocol category and compare estimates.
- Responsive layout with keyboard-visible focus styles and reduced-motion handling.

## Design rationale

**One grammar, different decisions.** Repeated navigation, probability bars, card spacing and typography make all six interfaces feel connected. Each application adapts its information hierarchy to the underlying question rather than forcing every market into the same trading layout.

**Forecasts are evidence, not authority.** Deep shows the full outcome field, Futarchy compares conditional forecasts with the final governance decision, Opportunity Markets separates predictions from review, and Risk Pricing avoids claiming that market estimates equal safety.

**Changes from the reference kit.** The public Electric Foundation Figma kit is the starting point for purple contrast, dark/light versions and compact card vocabulary. The concept deliberately adds more generous editorial typography on entry screens, a persistent cross-app sidebar and plain-language caveats to make complex market types approachable.

**Illustrative, not fabricated live data.** All sample prices, percentages, projects and volumes are synthetic; no external trading APIs are called. Wallet actions open an explanation instead of requesting signatures.

## Local verification

- `node --check app-base.js` and `node --check app-extra.js`.
- Headless Chrome rendered all six URL states.
- Headless Chrome interaction tests passed for market filters/search/watch, Deep selection, Futarchy slider, Opportunity sorting/selection, and Risk horizon/category filters.
- The prototype does not require npm, a build step, or dependencies at runtime apart from optional Google Fonts.

## Reference

- [Electric Foundation public Figma brand kit](https://www.figma.com/design/cB6ZFMUkBwMBhHadLdiSmh/Seer-Branding?node-id=118-16652)
