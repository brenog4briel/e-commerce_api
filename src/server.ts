import fastify, { FastifyInstance } from "fastify";
import { usuarioRoutes } from "./routes/usuario.routes";
import { produtoRoutes } from "./routes/produto.routes";

const app: FastifyInstance = fastify({ logger: true });

app.register(usuarioRoutes, {
  prefix: "/usuarios",
});

app.register(produtoRoutes, {
  prefix:"/produtos"
})

app.listen({ port: 3500 }, () => {
  console.log("The server is running in port 3500");
});
