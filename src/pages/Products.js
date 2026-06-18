//Poducts
import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class Products extends BasePage {
  constructor(page) {
    super(page);

    this.sortContainer = page.getByTestId('product-sort-container');
    this.inventoryList = page.getByTestId('inventory-list');
    this.addCartBtn = page.locator('[data-test^="add-to-cart-"]');
    this.shoppingCart = page.getByTestId('shopping-cart-badge');
  }

  async addToCart(productName) {
    const shoppingCartTextBefore = await this.getCartCount();
    console.log('shoppingCartTextBefore = ', shoppingCartTextBefore);

    //без await потомучто он создает объект, а ищет его, только когда вызывает к нему действия: click(), fill(), expect(), isVisible()
    const productItem = this.inventoryList.locator(
      `.inventory_item:has-text("${productName}")`
    );
    await expect(productItem).toBeVisible();

    const addButton = productItem.locator(this.addCartBtn);
    await addButton.click();

    // 3. Проверяем, что бейдж появился и счетчик увеличился
    await expect(this.shoppingCart).toBeVisible();
    const newText = await this.shoppingCart.textContent();
    console.log('Новый счетчик:', newText);

    const shoppingCartTextAfter = await this.getCartCount();
    console.log('shoppingCartTextAfter = ', shoppingCartTextAfter);

    expect(shoppingCartTextAfter).toBe(shoppingCartTextBefore + 1);
  }

  async getCartCount() {
    try {
      // Пробуем получить текст
      const text = await this.shoppingCart.textContent();
      return text ? Number(text) : 0;
    } catch {
      // Если бейджа нет - корзина пуста
      return 0;
    }
  }
}
