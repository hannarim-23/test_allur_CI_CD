//BasePage.js
import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url = '/') {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  // Метод для получения заголовка страницы
  async getPageTitle() {
    return await this.page.title();
  }
  /*
  async expectError(locator, expectedText) {
    await expect(locator).toBeVisible();
    await expect(locator).toContainText(expectedText);
    return true;
  }
*/
  /*
  // Метод для скриншота (пригодится для отчета)
  async takeScreenshot(name) {
    await this.page.screenshot({ 
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }*/
}
