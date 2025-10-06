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