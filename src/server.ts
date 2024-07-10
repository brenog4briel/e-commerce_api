import fastify, { FastifyInstance } from "fastify";
import { UsuarioRoutes } from "./routes/usuario.routes";
import { ProdutoRoutes } from "./routes/produto.routes";
import { Pedido_de_compraRoutes } from "./routes/pedido_de_compra_.routes";
import 'dotenv/config'
import cors from "@fastify/cors"
import { UploadRoutes } from "./routes/upload.routes";
import Multer from "fastify-multer"
import { Lista_de_desejosRoutes } from "./routes/lista_de_desejos.routes";
import { Historico_de_comprasRoutes } from "./routes/historico_de_compras.routes";

const app: FastifyInstance = fastify();

app.register(Multer.contentParser)

app.register(UsuarioRoutes, {
  prefix: "/usuarios",
});

app.register(UploadRoutes, {
  prefix:"/upload"
})

app.register(ProdutoRoutes,{
  prefix:"/produtos"
})

app.register(Pedido_de_compraRoutes, {
  prefix:"/pedido_de_compra"
})

app.register(Lista_de_desejosRoutes,{
  prefix:"/lista_de_desejos"
})

app.register(Historico_de_comprasRoutes,{
  prefix:"/historico_de_compras"
})

app.register(cors,{
  origin:"*",
  credentials:true,
  optionsSuccessStatus:200
})

app.listen({host:"0.0.0.0",port:process.env.PORT? Number(process.env.PORT) : 4000 }, () => {
  console.log(`The server is running in port ${process.env.PORT}`);
});
