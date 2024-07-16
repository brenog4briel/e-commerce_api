import { FastifyInstance } from "fastify";
import { Pedido_de_compra_UseCase } from "../usecases/pedido_de_compra_usecase";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Produto } from "../interfaces/produto.interface";
import { Usuario } from "../interfaces/usuario.interface";

export async function Pedido_de_compraRoutes(fastify:FastifyInstance) {

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

    fastify.put<{Body:{pedido_de_compra_id:string,produto: Produto}}>("/adiciona-produto",async(req,reply) => { 
        const {pedido_de_compra_id,produto} = req.body;
        try {
            const result = await pedido_de_compra.adicionaProduto(pedido_de_compra_id,produto);
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao adicionar o produto ao pedido de compra")

        }
    })

    fastify.put<{Body:{pedido_de_compra_id:string,produto: Produto}}>("/remove-produto",async(req,reply) => { 
        const {pedido_de_compra_id,produto} = req.body;
        try {
            const result = await pedido_de_compra.removeProduto(pedido_de_compra_id,produto);
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao remover o produto ao pedido de compra")

        }
    })

    fastify.delete<{Body:{pedido_de_compra_id:string}}>("/remove-all",async(req,reply) => { 
        const {pedido_de_compra_id} = req.body;
        try {
            const result = await pedido_de_compra.deletePedido(pedido_de_compra_id);
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao limpar o pedido de compra")

        }
    })

    fastify.get<{Params:{usuario_id: string}}>("/pedido/:usuario_id",async(req,reply) => { 
        const {usuario_id} = req.params;
        try {
            const result = await pedido_de_compra.getPedidoByUserId(usuario_id);
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao resgatar a informação do pedido de compra")

        }
    })
}