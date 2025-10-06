import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cookieAcceptButton: Locator;
  readonly buyTab: Locator;
  readonly rentTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-testid="search-box"]');
    this.searchButton = page.locator('button[data-testid="search-submit"]');
    this.cookieAcceptButton = page.locator('#didomi-notice-agree-button');
    this.buyTab = page.locator('#reka-tabs-v-0-2-0-trigger-buy');
    this.rentTab = page.locator('#reka-tabs-v-0-2-0-trigger-rent');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.acceptCookiesIfPresent();
  }

  async acceptCookiesIfPresent() {
    try {
      await this.cookieAcceptButton.click({ timeout: 3000 });
    } catch {
      // Cookie banner not present or already accepted
    }
  }

  async isLoaded(): Promise<boolean> {
    await expect(this.searchInput).toBeVisible();
    return true;
  }

  async searchForLocation(location: string) {
    await this.searchInput.fill(location);
    
    // Wait for autocomplete to appear and click the matching option
    const autocompleteOption = this.page.locator(`text="${location}"`).first();
    await autocompleteOption.waitFor({ state: 'visible' });
    await autocompleteOption.click();
  }

  async switchToBuyTab() {
    await this.buyTab.click();
    await expect(this.buyTab).toHaveAttribute('aria-selected', 'true');
  }

  async switchToRentTab() {
    await this.rentTab.click();
    await expect(this.rentTab).toHaveAttribute('aria-selected', 'true');
  }
}