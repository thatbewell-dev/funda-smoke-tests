import { Page, Locator, expect } from '@playwright/test';

export class PropertyDetailPage {
  readonly page: Page;
  readonly propertyTitle: Locator;
  readonly propertyPrice: Locator;
  readonly propertyAddress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.propertyTitle = page.locator('h1').first();
    this.propertyPrice = page.locator('[data-test-id="price"], h3, span').filter({ hasText: /€|EUR/ }).first();
    this.propertyAddress = page.locator('[data-test-id="address"], h2, .address').first();
  }

  async isLoaded(): Promise<boolean> {
    await expect(this.propertyTitle).toBeVisible();
    return true;
  }

  async verifyPageElements() {
    await expect(this.propertyTitle).toBeVisible();
    await expect(this.page.url()).toContain('/detail/');
  }

  async getPropertyTitle(): Promise<string> {
    return await this.propertyTitle.textContent() || '';
  }
}