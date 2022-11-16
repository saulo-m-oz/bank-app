FROM node:18.12.1

RUN mkdir app/backend

WORKDIR /app/backend

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]