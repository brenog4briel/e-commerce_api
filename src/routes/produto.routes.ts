import { FastifyInstance } from "fastify";
import { ProdutoData } from "../interfaces/produto.interface";
import { ProdutoUseCase } from "../usecases/produto.usecase";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function ProdutoRoutes(fastify: FastifyInstance) {

    const produtoUseCase = new ProdutoUseCase();
    fastify.addHook("preHandler",authMiddleware);

    fastify.get("/",(req,reply) => {
        reply.send("Olá")
    })

    fastify.post<{Body: ProdutoData}>("/", async(req,reply) => {
        try {
            const result = await produtoUseCase.create(req.body);
            return reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    })
    
    fastify.put<{Body: {nome:string,preco:number,proprietario:string,qtd_estoque:number,categoria:string,imagem:string}; Params:{produto_id:string}}>('/:produto_id',async(req,reply) => {
        const produto_id = req.params.produto_id;
        const {nome,preco,proprietario,qtd_estoque,categoria,imagem} = req.body;

        try {
            const result = await produtoUseCase.update({produto_id,nome,preco,proprietario,qtd_estoque,categoria,imagem})
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

    fastify.get<{Params: {categoria:string}}>("/:categoria", async(req,reply) => {
        const {categoria} = req.params;
        const lowerCaseCategoria = categoria.toLowerCase()
        try {
            const result = await produtoUseCase.listByCategories(lowerCaseCategoria);
            return reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    })
    
    fastify.get<{Params:{pagina:number}}>("/pagina=:pagina", async(req,reply) => {
        const {pagina} = req.params;
        try {
            const result = await produtoUseCase.listAllProducts(pagina);
            return reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    })


} 