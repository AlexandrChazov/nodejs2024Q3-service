FROM node:22-alpine3.18

WORKDIR /server

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

EXPOSE ${SERVER_PORT}

CMD ["sh", "-c", "npm run migration:run && npm run start:dev"]