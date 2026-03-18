import { Locator, Page } from '@playwright/test';

export class Modal {
  private readonly locator: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page, selector: string) {
    this.locator = page.locator(selector);
    this.closeButton = this.locator.locator('.close-btn');
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async getTitle(): Promise<string> {
    return await this.locator.locator('.modal-title').innerText();
  }
}
