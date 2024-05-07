import fastify, { FastifyInstance } from "fastify";
import { UsuarioRoutes } from "./routes/usuario.routes";
import { ProdutoRoutes } from "./routes/produto.routes";

const app: FastifyInstance = fastify();

app.register(UsuarioRoutes, {
  prefix: "/usuarios",
});

app.register(ProdutoRoutes,{
  prefix:"/produtos"
})

app.listen({ port: 3500 }, () => {
  console.log("The server is running in port 3500");
});
