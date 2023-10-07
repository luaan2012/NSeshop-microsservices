FROM node:16.14 AS builder

WORKDIR /app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

COPY ./src/assets/fonts/Poppins /app/src/assets/fonts/poppins

RUN ng build --configuration production

FROM nginx:latest

COPY --from=builder /app/dist/web-spa /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80