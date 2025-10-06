# Funda · UI Smoke Tests

**What**  
Five fast smoke checks to prove funda.nl is up and the core search/inspect path renders. Tiny, strict, CI-ready.

---

## Run
```bash
npm install
npx playwright install chromium
cat .env   # set FUNDA_UA (keep private)
npx playwright test
npx playwright show-report
```

## CI & reports
- GitHub Actions workflow: **Run Smoke Tests**.
- After a run: **Actions → the run → Artifacts → download**:
  - `playwright-report` (HTML report zip)
  - `test-results` (traces/screenshots/videos)
- Reports are **downloaded from job artifacts**.

## Why these choices
- **Playwright + TS** → solid auto-waits, great traces, maintainable types.
- **Chromium only (for smoke)** → speed + determinism; other browsers can live in regression.
- **Selectors** → `data-testid`
- **Fixtures + tiny Page Objects** → one place for UA/cookies; clean, readable tests.
- **Behavioral asserts** → URLs/results/visible widgets

## Why these 5 smoke tests (my thinking)

- **ST-01 · Homepage loads & search is visible**  
  If the home page doesn’t load or the search box isn’t there, nothing else matters. This is our heartbeat: proves the site is up, the cookie banner isn’t blocking, and the basic shell renders.

- **ST-02 · Buy search (city) shows results**  
  Buying is the main path. A simple city search proves routing to `/koop`, geocoding, indexing, and result rendering. If this breaks, users can’t even start their journey.

- **ST-03 · Rent search (city) shows results**  
  Renting is the second big path. Running the same check for `/huur` catches config drift between Buy and Rent (different facets, toggles, or data sources) without extra noise.

- **ST-04 · Open first listing → details render**  
  Results are useless if the details page doesn’t load properly. Clicking the first listing and seeing title/price/media proves navigation works and the template can bind real data.

**ST-05 · Buy ↔ Rent tabs keep mode & state**  
  Switching tabs and running a quick search should route to the correct mode (`/koop` vs `/huur`) without losing the area/filters. This catches mode desyncs or state loss quickly.