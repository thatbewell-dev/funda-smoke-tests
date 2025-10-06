/**
 * Test Data Management
 * 
 * Centralized test data to avoid hardcoding in tests.
 * Makes tests more maintainable and easier to update.
 */

export const TEST_LOCATIONS = {
  AMSTERDAM: 'Amsterdam',
  ROTTERDAM: 'Rotterdam',
  UTRECHT: 'Utrecht',
  THE_HAGUE: 'Den Haag',
  EINDHOVEN: 'Eindhoven',
} as const;

export const EXPECTED_URL_PATTERNS = {
  BUY_SEARCH: /.*\/zoeken\/koop\?selected_area.*/i,
  RENT_SEARCH: /.*\/zoeken\/huur\?selected_area.*/i,
  BUY_DETAIL: /.*\/detail\/koop\/.*/i,
  RENT_DETAIL: /.*\/detail\/huur\/.*/i,
} as const;

export const MIN_RESULTS_THRESHOLD = {
  AMSTERDAM: 100,  // Major city, should have many results
  ROTTERDAM: 50,   // Large city
  UTRECHT: 30,     // Medium city
  DEFAULT: 1,      // Minimum for any search
} as const;