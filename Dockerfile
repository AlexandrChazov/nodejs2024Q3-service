FROM node:22-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "start:dev"]