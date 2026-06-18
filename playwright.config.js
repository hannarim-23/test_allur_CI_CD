// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Папка, где лежат тесты
  testDir: './tests',
  /* Run tests in files in parallel */
  // Запускать тесты параллельно (быстрее)
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // Не показывать детали при прогоне (меньше шума)
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // Количество повторных прогонов упавших тестов
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // Количество параллельных процессов
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // Репортеры (куда выводить результаты)
  reporter: [ ['html', { outputFolder: 'playwright-report' }],
  ['allure-playwright', { outputFolder: 'allure-results' }] // Allure данные
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // Базовый URL для всех тестов
    baseURL: 'https://www.saucedemo.com/',

    // Снимать скриншот при падении
    screenshot: 'only-on-failure',

    // Записывать видео при падении
    video: 'retain-on-failure',

    // Таймаут для действий (кликов, ввода)
    actionTimeout: 5000,

    // ✅ Настройка для getByTestId
    testIdAttribute: 'data-test',  // По умолчанию и так 'data-test'

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // Сохраняет трейс только при повторном запуске упавшего теста
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
