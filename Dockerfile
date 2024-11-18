FROM node:22-alpine3.18

WORKDIR /server

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "start:dev"]