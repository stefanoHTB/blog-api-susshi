FROM node:latest

WORKDIR /usr/app

COPY package*.json ./
RUN npm install 

COPY . .

EXPOSE 3000

CMD node dist/server.js