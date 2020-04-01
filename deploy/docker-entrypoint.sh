bash ./env.sh /usr/share/nginx/html/env.js
cd /etc/nginx
envsubst '${CORS_URL}' < nginx.conf.template > /etc/nginx/nginx.conf
nginx -g "daemon off;"