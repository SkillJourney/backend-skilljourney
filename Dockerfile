FROM node:23-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN chmod +x wait-for-postgres.sh

CMD ["sh", "-c", "./wait-for-postgres.sh"]
