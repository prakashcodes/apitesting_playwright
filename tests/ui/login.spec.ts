import { test, expect } from '@playwright/test';
import { LoginPageFacade } from '../../facade/pages/LoginPageFacade';

test.describe('Login UI Tests', () => {
  let loginPageFacade: LoginPageFacade;

  test.beforeEach(async ({ page }) => {
    loginPageFacade = new LoginPageFacade(page);
    await loginPageFacade.goto();
  });

  test('should login successfully with valid credentials', async () => {
    const username = process.env.USER_EMAIL || 'standard_user';
    const password = process.env.USER_PASSWORD || 'secret_sauce';
    
    await loginPageFacade.login(username, password);
    
    // Example assertion - adjusting based on target app (like Swag Labs)
    // await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('should show error with invalid credentials', async () => {
    await loginPageFacade.login('invalid_user', 'invalid_password');
    // await expect(loginPageFacade.getErrorMessage()).toBeVisible();
  });
});
