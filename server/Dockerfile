FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

EXPOSE 3000

RUN yarn start
