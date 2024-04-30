import fastify, { FastifyInstance } from "fastify";
import { usuarioRoutes } from "./routes/usuario.routes";

const app: FastifyInstance = fastify({ logger: true });

app.register(usuarioRoutes, {
  prefix: "/usuarios",
});

app.listen({ port: 3500 }, () => {
  console.log("The server is running in port 3500");
});
