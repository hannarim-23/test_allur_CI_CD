# 1. Базовый образ с Node.js (версия котора установлена и я ею пользуюсь)
FROM node:24.12.0-slim 

# 2. Устанавливаем зависимости для браузеров Playwright (Chromium)
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# 3. Рабочая папка внутри контейнера
WORKDIR /app

# 4. Копируем package.json и package-lock.json (для кеширования зависимостей)
COPY package*.json ./

# 5. Устанавливаем npm-зависимости
RUN npm ci

# 6. Устанавливаем браузеры Playwright (Chromium, Firefox, WebKit)
RUN npx playwright install --with-deps chromium

# 7. Копируем весь остальной код проекта
COPY . .

# 8. Команда по умолчанию (запуск всех тестов)
CMD ["npx", "playwright", "test"]