FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn add node-sass
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
EXPOSE 80
RUN mkdir /usr/share/nginx/html/edtrio
COPY --from=builder /app/build /usr/share/nginx/html/edtrio
COPY --from=builder /app/build/index.html /usr/share/nginx/html
RUN chown -R 101:101 /usr/share/nginx/html && rm /usr/share/nginx/html/edtrio/index.html
