import fastify, { FastifyInstance } from "fastify";
import { UsuarioRoutes } from "./routes/usuario.routes";
import { ProdutoRoutes } from "./routes/produto.routes";
import { CompraRoutes } from "./routes/compra.routes";
import 'dotenv/config'
import cors from "@fastify/cors"
import { UploadRoutes } from "./routes/upload.routes";
import Multer from "fastify-multer"
import multipart from '@fastify/multipart'

const app: FastifyInstance = fastify();

app.register(Multer.contentParser)
app.register(multipart);

app.register(UsuarioRoutes, {
  prefix: "/usuarios",
});

app.register(UploadRoutes, {
  prefix:"/upload"
})

app.register(ProdutoRoutes,{
  prefix:"/produtos"
})

app.register(CompraRoutes, {
    prefix:"/compra"
})

app.register(cors,{
  origin:"*",
  credentials:true,
  optionsSuccessStatus:200
})

app.listen({host:"0.0.0.0",port:process.env.PORT? Number(process.env.PORT) : 4000 }, () => {
  console.log("The server is running in port 3500");
});
