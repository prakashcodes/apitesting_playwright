import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

export class LoginPageFacade {
  private readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async goto() {
    await this.loginPage.goto();
  }

  async login(username: string, password: string): Promise<void> {
    await this.loginPage.enterUsername(username);
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickLogin();
  }

  async getErrorMessage(): Promise<string> {
    return await this.loginPage.getErrorMessageText();
  }
}
