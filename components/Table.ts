import { Locator, Page } from '@playwright/test';

export class Table {
  private readonly locator: Locator;

  constructor(page: Page, selector: string) {
    this.locator = page.locator(selector);
  }

  async getRowCount(): Promise<number> {
    return await this.locator.locator('tr').count();
  }

  async getCellValue(rowIndex: number, colIndex: number): Promise<string> {
    const row = this.locator.locator('tr').nth(rowIndex);
    const cell = row.locator('td').nth(colIndex);
    return await cell.innerText();
  }
}
