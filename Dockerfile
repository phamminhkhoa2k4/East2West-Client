# Sử dụng image Node.js với phiên bản 21.0.0
FROM node:21.0.0-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# Expose cổng 3000 của Next.js
EXPOSE 3000

CMD ["npm", "start"]