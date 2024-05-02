import { FastifyInstance } from "fastify";
import { ProdutoUseCase } from "../usecases/produto.usecase";
import { Produto } from "../interfaces/produto.interface";

export async function produtoRoutes(fastify:FastifyInstance) {
    const produtoUseCase = new ProdutoUseCase()

     fastify.post<{Body:Produto}>("/", async(req,reply) => {
        const {nome,preco,proprietario,qtd_estoque} = req.body;
        try {
            const data = await produtoUseCase.create({nome,preco,proprietario,qtd_estoque});
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
     })

     fastify.get("/",(req,reply) => {
        reply.send("Olá")
     })
}
