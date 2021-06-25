FROM node:12.16.1 as builder

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN cd dist && gzip -k index.js

FROM nginx:1.17.9-alpine
RUN apk update && apk add bash

COPY --from=builder /app/dist /usr/share/nginx/html/
COPY --from=builder /app/deploy/env.sh ./
COPY --from=builder /app/deploy/nginx.conf.template /etc/nginx/
COPY --from=builder /app/deploy/docker-entrypoint.sh ./

RUN chmod ugo+x docker-entrypoint.sh
EXPOSE 80

# read envs and start nginx
CMD ./docker-entrypoint.sh