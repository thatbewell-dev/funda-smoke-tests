import { test as base } from '@playwright/test';
import { HomePage } from '../tests/pages/home.page';
import { SearchResultsPage } from '../tests/pages/search.result.page';
import { PropertyDetailPage } from '../tests/pages/property.detail.page';
import * as dotenv from 'dotenv';

dotenv.config();

type PageFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  propertyDetailPage: PropertyDetailPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  
  propertyDetailPage: async ({ page }, use) => {
    await use(new PropertyDetailPage(page));
  },
});

export { expect } from '@playwright/test';