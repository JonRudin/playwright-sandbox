import { test } from '../fixtures/apiFixture'; // Import test from fixture
import { expect } from '@playwright/test'; // Import expect separately

test.describe('API Testing', () => {
  test('Verify API response', async ({ apiRequest }) => {
    // Given: The API endpoint is set
    const endpoint = 'https://jsonplaceholder.typicode.com/posts/1';

    // When: I send a GET request
    const response = await apiRequest('GET', endpoint);

    // Then: The response status should be 200 and contain a title
    await test.step('Verify status and title', async () => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title');
    });
  });
});