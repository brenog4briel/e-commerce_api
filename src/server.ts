import fastify, { FastifyInstance, FastifyListenOptions } from "fastify";
import { UsuarioRoutes } from "./routes/usuario.routes";
import { ProdutoRoutes } from "./routes/produto.routes";
import { CompraRoutes } from "./routes/compra.routes";
import 'dotenv/config'
import cors from "@fastify/cors"
const app: FastifyInstance = fastify();

app.register(UsuarioRoutes, {
  prefix: "/usuarios",
});

app.register(ProdutoRoutes,{
  prefix:"/produtos"
})

app.register(CompraRoutes, {
    prefix:"/compra"
})

app.register(cors,{
  origin:"https://e-commerce-api-5sxy.onrender.com",
  credentials:true,
  optionsSuccessStatus:200
})

app.listen({host:"0.0.0.0",port:process.env.PORT? Number(process.env.PORT) : 4000 }, () => {
  console.log("The server is running in port 3500");
});
