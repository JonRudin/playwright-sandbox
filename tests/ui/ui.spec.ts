import { test, expect } from '@playwright/test';

test.describe('UI Testing', () => {
  test('Verify page title', async ({ page }) => {
    // Given: I navigate to the page
    await page.goto('/');

    // When: I check the page title
    const title = await page.title();

    // Then: The title should be "Example Domain"
    await test.step('Verify title', async () => {
      expect(title).toBe('Example Domain');
    });
  });
});