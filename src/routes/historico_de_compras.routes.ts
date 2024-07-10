import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Produto, ProdutoData } from "../interfaces/produto.interface";
import { Historico_de_compras_Usecase } from "../usecases/historico_de_compras";

export async function Historico_de_comprasRoutes(fastify:FastifyInstance) {

    const historico_de_compras_Usecase = new Historico_de_compras_Usecase();

    fastify.addHook("preHandler",authMiddleware)

    fastify.get("/", (req,reply) => {
        reply.send("Olá")
    })
    fastify.post<{Body: {usuario_id:string}}>("/",async(req,reply) => {
        const {usuario_id} = req.body;
        try {
            const result = await historico_de_compras_Usecase.create(usuario_id);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao criar o histórico de compras")

        }
    })

    fastify.put<{Body: {historico_de_compras_id:string, produto:ProdutoData}}>("/adiciona-produto",async(req,reply) => {
        const {historico_de_compras_id,produto} = req.body;
        console.log(req.body)
        try {
            const result = await historico_de_compras_Usecase.adicionaProduto(historico_de_compras_id,produto);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao adicionar um produto ao histórico de compras")
        }
    })

    fastify.get<{Params: {usuario_id:string}}>("/historico/:usuario_id",async(req,reply) => {
        const {usuario_id} = req.params;
        try {
            const result = await historico_de_compras_Usecase.getListIdByUserId(usuario_id);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao resgatar a informação do histórico de compras")
        }
    })

     fastify.get<{Params: {historico_de_compras_id:string}}>("/:historico_de_compras",async(req,reply) => {
        const {historico_de_compras_id} = req.params;
        try {
            const result = await historico_de_compras_Usecase.getListById(historico_de_compras_id);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao resgatar o histórico de compras")
        }
    })
}
