const fastify   = require("fastify")();
const path      = require("path");
const WebSocket = require("uws").Server;

const wss = new WebSocket({
    server: fastify.server,
});

wss.on("connection", (ws) => {
    console.log("User connected");

    ws.on("message", (msg, flags) => {
        console.log(JSON.parse(msg));
    });

    ws.on("close", (code, msg) => console.log("Connection closed"))
});

fastify.use(require("serve-static")(path.join(__dirname, "/public")));

fastify.listen(8080, () => {
    console.log(`Server listening on port 8080`);
});