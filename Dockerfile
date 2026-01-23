FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["sh", "-c", "npm run db:deploy && npm run start"]
