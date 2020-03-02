FROM node:lts as builder

WORKDIR '/app'
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY --from=builder /app/deploy/env.sh ./

# TODO copy env generator file
# and execute on startup (CMD)
CMD bash env.sh