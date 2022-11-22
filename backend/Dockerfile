FROM node:18.12.1

WORKDIR /app/backend

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "dev"]