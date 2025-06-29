import { test } from '../fixtures/apiFixture';
import { expect } from '@playwright/test';

test.describe('API Testing', () => {
  test('Verify API response for single post', async ({ apiRequest }) => {
    // Given: The API endpoint is set
    const endpoint = 'https://jsonplaceholder.typicode.com/posts/1';

    // When: I send a GET request
    const response = await apiRequest('GET', endpoint);

    // Then: The response status should be 200 and contain a title
    await test.step('Verify status and title', async () => {
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('body');
    });
  });

  test('Create a new post', async ({ apiRequest, fakeData, authToken }) => {
    // Given: I have an API endpoint and mock data
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';
    const payload = {
      title: fakeData.postTitle,
      body: fakeData.postBody,
      userId: 1,
    };

    // When: I send a POST request with authentication
    const response = await apiRequest('POST', endpoint, {
      headers: { Authorization: authToken },
      data: payload,
    });

    // Then: The response status should be 201 and contain the posted data
    await test.step('Verify post creation', async () => {
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(payload.title);
      expect(response.body.body).toBe(payload.body);
    });
  });

  test('Retrieve multiple posts', async ({ apiRequest }) => {
    // Given: The API endpoint for posts is set
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';

    // When: I send a GET request for all posts
    const response = await apiRequest('GET', endpoint);

    // Then: The response status should be 200 and return an array
    await test.step('Verify multiple posts', async () => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  test('Handle invalid endpoint', async ({ apiRequest }) => {
    // Given: An invalid API endpoint
    const endpoint = 'https://jsonplaceholder.typicode.com/invalid';

    // When: I send a GET request
    const response = await apiRequest('GET', endpoint);

    // Then: The response status should be 404
    await test.step('Verify error response', async () => {
      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
    });
  });
});