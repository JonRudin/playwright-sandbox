import { test as base } from '@playwright/test';

export type ApiFixture = {
  apiRequest: (method: string, url: string, options?: any) => Promise<any>;
};

export const test = base.extend<ApiFixture>({
  apiRequest: async ({ request }, use) => {
    const apiRequest = async (method: string, url: string, options: any = {}) => {
      const response = await request[method.toLowerCase()](url, options);
      return { status: response.status(), body: await response.json() };
    };
    await use(apiRequest);
  },
});