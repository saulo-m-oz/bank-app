FROM node:18.12.1

WORKDIR /app/frontend

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]