const fastify = require("fastify")();
const path    = require("path");

fastify.use(require("serve-static")(path.join(__dirname, "/public")));

fastify.listen(8080, () => {
    console.log(`Server listening on port 8080`);
});