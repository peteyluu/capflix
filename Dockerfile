FROM node:latest

WORKDIR /usr/src/capflixContainer

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
