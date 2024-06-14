import { FastifyInstance } from "fastify";
import { Pedido_de_compra_Data } from "../interfaces/pedido_de_compra.interface";
import { Pedido_de_compra_UseCase } from "../usecases/pedido_de_compra_usecase";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ProdutoData } from "../interfaces/produto.interface";

export async function CompraRoutes(fastify:FastifyInstance) {

    const pedido_de_compra = new Pedido_de_compra_UseCase()

    fastify.addHook("preHandler",authMiddleware);

    fastify.get("/",(req,reply) => {
        reply.send("Olá")
    })

    fastify.post<{Body:Pedido_de_compra_Data}>("/",async(req,reply) => { 
        try {
            const result = await pedido_de_compra.create(req.body);
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao criar o pedido de compra")
        }
    })

     fastify.put<{Body:{pedido_de_compra_id:string,produtos: ProdutoData[]}}>("/",async(req,reply) => { 
        try {
            const result = await pedido_de_compra.adicionaProduto(req.body.pedido_de_compra_id,req.body.produtos);
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao atualizar o pedido de compra")

        }
    })
}