//loginPage.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';

const Users = {
  standard: 'standard_user',
  locked: 'locked_out_user',
  problem: 'problem_user',
  performance: 'performance_glitch_user',
  visual: 'visual_user',
  error: 'error_user',
};
const PASSWORD = 'secret_sauce';
const invalid = 'INVALID';

test.describe('Login page test', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    const isVisible = await loginPage.isOnLoginPage();
    expect(isVisible).toBe(true);
  });

  test('login with valid date', async ({ page }) => {
    await loginPage.login(Users.standard, PASSWORD);
    await loginPage.expectLoginSuccess();
  });

  test('login with INvalid date', async ({ page }) => {
    await loginPage.login(invalid, PASSWORD);
    await expect(page).toHaveURL('/');
    await loginPage.expectLoginError();
  });
});
