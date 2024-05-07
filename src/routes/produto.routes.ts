import { FastifyInstance } from "fastify";
import { CriacaoProduto } from "../interfaces/produto.interface";
import { ProdutoUseCase } from "../usecases/produto.usecase";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function ProdutoRoutes(fastify: FastifyInstance) {

    const produtoUseCase = new ProdutoUseCase();
    fastify.addHook("preHandler",authMiddleware);

    fastify.get("/",(req,reply) => {
        reply.send("Olá")
    })

    fastify.post<{Body: CriacaoProduto}>("/", async(req,reply) => {
        const token = req.headers["token"];

        const {usuario_id,nome,preco,proprietario,qtd_estoque} = req.body;

        try {
            const result = await produtoUseCase.create({usuario_id,nome,preco,proprietario,qtd_estoque});
            return reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    })
    
    fastify.put<{Body: {nome:string,preco:number,proprietario:string,qtd_estoque:number}; Params:{produto_id:string}}>('/:produto_id',async(req,reply) => {
        const produto_id = req.params.produto_id;
        const {nome,preco,proprietario,qtd_estoque} = req.body;

        try {
            const result = await produtoUseCase.update({produto_id,nome,preco,proprietario,qtd_estoque})
            return reply.send(result);
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.delete<{Params:{produto_id:string}}>("/:produto_id",async(req,reply) => {
        const {produto_id} = req.params;
        console.log(produto_id)
        try {
            const result = await produtoUseCase.delete(produto_id);
            return reply.send(result);
        } catch (error) {
            reply.send(error)
        }
    })


} 