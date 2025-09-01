# ----------- Stage 1: Build frontend -----------
FROM node:20 AS frontend-build

# Устанавливаем рабочую директорию
WORKDIR /app/frontend

# Копируем package.json и package-lock.json для установки зависимостей
COPY frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь фронтенд
COPY frontend/ .

# Собираем фронтенд
RUN npm run build

# ----------- Stage 2: Build backend -----------
FROM node:20 AS backend-build

WORKDIR /app/backend

# Копируем package.json и package-lock.json бекенда
COPY backend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь бекенд
COPY backend/ .

# Копируем собранный фронтенд из предыдущего stage
COPY --from=frontend-build /app/frontend/dist /app/backend/public

# Экспортируем порт
EXPOSE 3000

# Старт сервера
CMD ["node", "server.js"]
