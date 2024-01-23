FROM node:20.10.0 as builder

WORKDIR /app
COPY /front/package.json /app/package.json
RUN npm install

COPY /front .
RUN npm run build

FROM nginx:1.21.3

RUN rm /usr/share/nginx/html/index.html

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/nginx.conf

COPY /nginx/nginx.conf /etc/nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY /nginx/default.conf /etc/nginx/conf.d/