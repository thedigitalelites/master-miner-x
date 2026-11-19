# Master Miner X — Crypto Mining page (React + Vite)

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

The `dist/` folder in this package is already built and can be uploaded to any static host.

## Section order

1. Header + hero + coin ticker
2. Why mine it, instead of buying it (Option A / Option B)
3. Machines we run (brand strip)
4. Don't just buy Bitcoin. Mine it. (production cost, spot price, chart, 3 steps, stats bar)
5. What does $100,000 buy today? (budget slider and best fleet)
6. Bitcoin Miners Live by December 31 (hosting tiers + miner cards)
7. Run the numbers banner + Why buy and host with Master Miner X
8. Enterprise hosting built for performance (features + pricing card)
9. Repair explorer (tap a part)
10. Bitcoin mining calculator
11. Coin ticker
12. Ready to build with us? (CTA)
13. FAQ
14. Footer

## Where to edit

- `src/data/content.js` holds all copy, miner list, prices, FAQ and footer links. All figures are placeholders.
- `src/lib/mining.js` holds the mining maths (BTC/day, hosting cost, payback).
- `src/styles.css` holds the theme. Colours, fonts and spacing are CSS variables at the top of the file.
- `src/components/Hud.jsx` is the chamfered neon panel used across the page (`cut="xs|sm|md|lg|notch"`).
- Images are in `public/img/`.
