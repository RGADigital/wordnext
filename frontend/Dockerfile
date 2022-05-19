FROM node:16-alpine

WORKDIR /app/frontend
COPY package.json /app/frontend

ENV PATH /app/frontend/node_modules/.bin:$PATH

RUN yarn install

EXPOSE 3000

CMD ["node", "server.js"]
