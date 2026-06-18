//LoginPage.js
import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';
import { ERROR_MESSAGES } from '../fixtures/errorMessages.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.title = page.locator('.login_logo');
    this.userNameInput = page.getByTestId('username');
    this.userPasswordInput = page.getByTestId('password');
    this.loginBtn = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  // Метод для входа с данными стандартного пользователя
  async login(userName, password) {
    await this.userNameInput.fill(userName);
    await this.userPasswordInput.fill(password);
    await this.loginBtn.click();
  }

  // Проверка, что мы на странице логина
  async isOnLoginPage() {
    await expect(this.title).toBeVisible();
    await expect(this.userNameInput).toBeVisible();
    await expect(this.userPasswordInput).toBeVisible();
    await expect(this.loginBtn).toBeVisible();
    return true;
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(
      ERROR_MESSAGES.invalidCredentials
    );
    return true;
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL('/inventory.html');
    return true;
  }

}
