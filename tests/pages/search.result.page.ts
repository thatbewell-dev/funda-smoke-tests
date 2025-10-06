import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly propertyListings: Locator;
  readonly firstListing: Locator;
  readonly resultsCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.propertyListings = page.locator('a[href*="/detail/"]');
    this.firstListing = this.propertyListings.first();
    this.resultsCount = page.locator('text=/\\d+ koopwoningen|\\d+ huurwoningen/').first();
  }

  async waitForResults() {
    await expect(this.firstListing).toBeVisible();
  }

  async getResultsCount(): Promise<number> {
    const count = await this.propertyListings.count();
    return count;
  }

  async hasResults(): Promise<boolean> {
    const count = await this.getResultsCount();
    return count > 0;
  }

  async clickFirstListing() {
    await this.firstListing.click();
  }

  async verifyMinimumResults(minCount: number = 1) {
    const count = await this.getResultsCount();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }
}