#/bin/bash

export NODE_ENV=production && \
export EDITOR_API_URL=https://editor.test.schul-cloud.org && \
export SERVER_API_URL=https://api.test.schul-cloud.org && \
export EDITOR_SOCKET_URL=wss://editor.test.schul-cloud.org && \
npm run build