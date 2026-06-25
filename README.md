# 🧪 Playwright + Allure + Docker

Проект с автотестами на Playwright для сайта [SauceDemo](https://www.saucedemo.com/).  
Всё настроено для запуска через **Docker**, с генерацией **Allure-отчетов** и автоматическим деплоем на **GitHub Pages** через **GitHub Actions**.

---

## 🚀 Быстрый старт (запуск через Docker)

Это самый простой способ запустить тесты. Вам нужен только [Docker](https://www.docker.com/get-started/).

# Скачать образ и запустить тесты

docker run --rm anya94qwe/my-playwright-tests:latest
Если хотите сохранить отчеты к себе на компьютер:
docker run --rm -v $(pwd)/allure-results:/app/allure-results anya94qwe/my-playwright-tests:latest

📦 Локальный запуск (без Docker)
Если вы хотите запускать тесты без Docker, у вас должна быть установлена Node.js (версия 20 или выше).

# Установить зависимости

npm install

# Установить браузеры Playwright

npx playwright install

# Запустить тесты

npx playwright test

📊 Где смотреть результаты?

1. GitHub Pages (Allure-отчет)
   После каждого прогона тестов в CI/CD, Allure-отчет автоматически публикуется на GitHub Pages:
   👉 https://hannarim-23.github.io/test_allur_CI_CD/

2. Артефакты в GitHub Actions
   playwright-report — HTML-отчет Playwright

3. allure-report — отчет Allure

4. test-results — результаты тестов

🐳 Docker
Образ с тестами опубликован в Docker Hub: anya94qwe/my-playwright-tests:latest

Собрать образ локально (если меняли код)
docker build -t anya94qwe/my-playwright-tests:latest .

Запушить обновленный образ в Docker Hub
docker push anya94qwe/my-playwright-tests:latest

📁 Структура проекта
.
├── .github/workflows/ # CI/CD (GitHub Actions)
│ └── playwright.yml
├── tests/ # Папка с тестами
│ ├── loginPage.spec.js
│ └── productsPage.spec.js
├── Dockerfile # Сборка Docker-образа
├── .dockerignore # Что не копировать в образ
├── package.json # Зависимости
├── playwright.config.js # Конфиг Playwright
└── README.md # Этот файл

⚙️ CI/CD (GitHub Actions)
Пайплайн настроен на автоматический запуск тестов при пуше в ветки: main, master, tests, docker.

- Запускает тесты в Docker-контейнере
- Генерирует Allure-отчет
- Сохраняет артефакты
- Деплоит Allure-отчет на GitHub Pages
