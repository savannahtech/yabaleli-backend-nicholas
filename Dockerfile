FROM node:20

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "dev"]