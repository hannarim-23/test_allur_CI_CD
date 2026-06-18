// productsPage
import { test, expect } from '@playwright/test';
import { Products } from '../src/pages/Products';
import { LoginPage } from '../src/pages/LoginPage';

const Users = {
  standard: 'standard_user',
};
const PASSWORD = 'secret_sauce';
const nameProduct = 'Sauce Labs Bolt T-Shirt';

test.describe('tests for Products', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    const isVisible = await loginPage.isOnLoginPage();
    expect(isVisible).toBe(true);
    await loginPage.login(Users.standard, PASSWORD);
    await loginPage.expectLoginSuccess();
  });

  test('add products to cart', async ({ page }) => {
    const products = new Products(page);
    await products.addToCart(nameProduct);
  });
});
