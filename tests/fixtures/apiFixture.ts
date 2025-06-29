import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';

export type TestFixtures = {
  apiRequest: (method: string, url: string, options?: any) => Promise<any>;
  authToken: string;
  fakeData: { username: string; email: string; postTitle: string; postBody: string };
  pageWithAuth: import('@playwright/test').Page;
};

export const test = base.extend<TestFixtures>({
  apiRequest: async ({ request }, use) => {
    const apiRequest = async (method: string, url: string, options: any = {}) => {
      const defaultOptions = {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
      };
      const response = await request[method.toLowerCase()](url, defaultOptions);
      return { status: response.status(), body: await response.json().catch(() => ({})) };
    };
    await use(apiRequest);
  },

  authToken: async ({}, use) => {
    // Mock authentication token (replace with real auth logic if needed)
    const token = `Bearer ${faker.string.uuid()}`;
    await use(token);
  },

  fakeData: async ({}, use) => {
    const data = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      postTitle: faker.lorem.sentence(),
      postBody: faker.lorem.paragraph(),
    };
    await use(data);
  },

  pageWithAuth: async ({ page }, use) => {
    // Mock setting authentication cookie (replace with real auth if needed)
    await page.context().addCookies([
      {
        name: 'auth_token',
        value: `Bearer ${faker.string.uuid()}`,
        domain: 'www.example.com',
        path: '/',
        expires: -1,
        httpOnly: true,
        secure: true,
      },
    ]);
    await use(page);
  },
});