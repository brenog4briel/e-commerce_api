import { FastifyInstance } from "fastify";
import { Pedido_de_compra_UseCase } from "../usecases/pedido_de_compra_usecase";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ProdutoData } from "../interfaces/produto.interface";
import { Usuario } from "../interfaces/usuario.interface";

export async function CompraRoutes(fastify:FastifyInstance) {

    const pedido_de_compra = new Pedido_de_compra_UseCase()

    fastify.addHook("preHandler",authMiddleware);

    fastify.get("/",(req,reply) => {
        reply.send("Olá")
    })

    fastify.post<{Body:{usuario:Usuario}}>("/",async(req,reply) => { 
        const {usuario} = req.body;
        try {
            const result = await pedido_de_compra.create(usuario);
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao criar o pedido de compra")
        }
    })

    fastify.put<{Body:{pedido_de_compra_id:string,produto: ProdutoData}}>("/adiciona-produto",async(req,reply) => { 
        const {pedido_de_compra_id,produto} = req.body;
        try {
            const result = await pedido_de_compra.adicionaProduto(pedido_de_compra_id,produto);
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao atualizar o pedido de compra")

        }
    })

    fastify.put<{Body:{pedido_de_compra_id:string,produto_id: string}}>("/remove-produto",async(req,reply) => { 
        const {pedido_de_compra_id,produto_id} = req.body;
        try {
            const result = await pedido_de_compra.removeProduto(pedido_de_compra_id,produto_id);
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao atualizar o pedido de compra")

        }
    })
}