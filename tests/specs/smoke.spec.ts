import { test, expect } from '../fixtures';
import { TEST_LOCATIONS, EXPECTED_URL_PATTERNS } from '../data/test.data';

test.describe('Funda.nl Smoke Tests @smoke', () => {
  
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.acceptCookiesIfPresent();
  });

  test('ST-01: Homepage loads successfully and main elements are visible', async ({ homePage }) => {
    const isLoaded = await homePage.isLoaded();
    expect(isLoaded).toBe(true);
    
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.buyTab).toBeVisible();
    await expect(homePage.rentTab).toBeVisible();
  });

  test('ST-02: Search functionality works for buying properties', async ({ page, homePage, searchResultsPage }) => {
    await homePage.searchForLocation(TEST_LOCATIONS.AMSTERDAM);
    
    await page.waitForURL(EXPECTED_URL_PATTERNS.BUY_SEARCH);
    
    expect(page.url()).toContain('selected_area');
    expect(page.url()).toContain(TEST_LOCATIONS.AMSTERDAM.toLowerCase());
    
    await searchResultsPage.waitForResults();
    await searchResultsPage.verifyMinimumResults(1);
    
    const resultsCount = await searchResultsPage.getResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });

    test('ST-03: Search functionality works for rental properties', async ({ page, homePage, searchResultsPage }) => {
    await homePage.rentTab.click();
    await homePage.searchForLocation(TEST_LOCATIONS.ROTTERDAM);

    await expect(page).toHaveURL(EXPECTED_URL_PATTERNS.RENT_SEARCH);
    await searchResultsPage.waitForResults();

    const count = await searchResultsPage.getResultsCount();
    expect(count).toBeGreaterThan(0);
  });

  test('ST-04: Property detail page loads when clicking on a listing', async ({ page, homePage, searchResultsPage, propertyDetailPage }) => {
    await homePage.searchForLocation(TEST_LOCATIONS.UTRECHT);
    
    await page.waitForURL(EXPECTED_URL_PATTERNS.BUY_SEARCH);
    
    await searchResultsPage.waitForResults();
    await searchResultsPage.clickFirstListing();
    
    await page.waitForURL(EXPECTED_URL_PATTERNS.BUY_DETAIL);
    
    await propertyDetailPage.verifyPageElements();
    
    const title = await propertyDetailPage.getPropertyTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  test('ST-05: Navigation between buy and rent tabs works correctly', async ({ homePage }) => {
    await expect(homePage.buyTab).toBeVisible();
    await expect(homePage.rentTab).toBeVisible();
    
    await homePage.switchToRentTab();
    await homePage.switchToBuyTab();
  });
});