import { test, expect } from '@playwright/test';
import { UserApiFacade } from '../../facade/api/UserApiFacade';

test.describe('Users API Tests', () => {
  let userApi: UserApiFacade;

  test.beforeEach(async ({ request }) => {
    userApi = new UserApiFacade(request);
  });

  test('should fetch users list', async () => {
    const response = await userApi.getUsers(2);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      job: 'Software Engineer'
    };
    const response = await userApi.createUser(userData);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe(userData.name);
  });
});
