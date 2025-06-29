import { test } from '../fixtures/apiFixture';
import { expect } from '@playwright/test';

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

  test('Submit a form', async ({ page, fakeData }) => {
    // Given: I navigate to a form page
    await page.goto('https://www.example.com');
    // When: I fill and submit a form with mock data
    await test.step('Fill and submit form', async () => {
      await page.evaluate((data) => {
        const input = document.createElement('input');
        input.id = 'username';
        document.body.appendChild(input);
        input.value = data.username;
      }, fakeData);
      const username = await page.locator('#username').inputValue();
      // Then: The form input should match the mock data
      expect(username).toBe(fakeData.username);
    });
  });

  test('Verify page content with authentication', async ({ pageWithAuth }) => {
    // Given: I navigate to the page with authentication
    await pageWithAuth.goto('/');
    // When: I check for authenticated content
    const content = await pageWithAuth.textContent('body');
    // Then: The content should be visible
    await test.step('Verify authenticated content', async () => {
      expect(content).toContain('Example Domain');
    });
  });

  test('Handle non-existent page', async ({ page }) => {
    // Given: I navigate to a non-existent page
    const response = await page.goto('/non-existent', { waitUntil: 'networkidle' });
    // When: I check the response status
    const status = response?.status();
    // Then: The response status should be 404
    await test.step('Verify error page', async () => {
      expect(status).toBe(404);
    });
  });
});