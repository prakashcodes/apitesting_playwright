import { Page } from '@playwright/test';

export async function mockGetUsers(page: Page) {
  await page.route('**/api/users*', async (route) => {
    const json = {
      page: 1,
      per_page: 6,
      total: 12,
      total_pages: 2,
      data: [
        {
          id: 1,
          email: 'mock.user@reqres.in',
          first_name: 'Mock',
          last_name: 'User',
          avatar: 'https://reqres.in/img/faces/1-image.jpg',
        },
      ],
      support: {
        url: 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral',
        text: 'Tired of React? Try SolidJS!',
      },
    };
    await route.fulfill({ json });
  });
}

export async function mockCreateUserError(page: Page) {
  await page.route('**/api/users', async (route) => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Bad Request' }),
    });
  });
}
