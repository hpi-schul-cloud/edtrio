FROM node:lts as builder

WORKDIR '/app'
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
RUN apk update && apk add bash
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY --from=builder /app/deploy/env.sh ./
COPY ./deploy/nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# read envs and start nginx
CMD bash ./env.sh /usr/share/nginx/html/env.js && nginx -g "daemon off;"