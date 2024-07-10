import { FastifyInstance } from "fastify";
import { ProdutoData } from "../interfaces/produto.interface";
import { ProdutoUseCase } from "../usecases/produto.usecase";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function ProdutoRoutes(fastify: FastifyInstance) {

    const produtoUseCase = new ProdutoUseCase();

    fastify.get("/",(req,reply) => {
        reply.send("Olá")
    })

    fastify.post<{Body: ProdutoData}>("/",{preHandler:[authMiddleware]},async(req,reply) => {
        try {
            const result = await produtoUseCase.create(req.body);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao criar o produto")

        }
    })
    
    fastify.put<{Body: {nome:string,preco:number,proprietario:string,qtd_estoque:number,categoria:string,imagem:string}; Params:{produto_id:string}}>('/:produto_id',{preHandler:[authMiddleware]},async(req,reply) => {
        const produto_id = req.params.produto_id;
        const {nome,preco,proprietario,qtd_estoque,categoria,imagem} = req.body;

        try {
            const result = await produtoUseCase.update({produto_id,nome,preco,proprietario,qtd_estoque,categoria,imagem})
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao atualizar as informações do produto")

        }
    })

    fastify.get<{Params:{produto_id:string}}>("/produto/:produto_id",async(req,reply) => {
        const {produto_id} = req.params;
        try {
            const result = await produtoUseCase.findOne(produto_id);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao resgatar o produto")
        }
    })

    fastify.delete<{Params:{produto_id:string}}>("/:produto_id",{preHandler:[authMiddleware]},async(req,reply) => {
        const {produto_id} = req.params;
        try {
            const result = await produtoUseCase.delete(produto_id);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao remover o produto")
        }
    })

    fastify.get<{Params: {categoria:string}}>("/categorias/:categoria", async(req,reply) => {
        const {categoria} = req.params;
        const lowerCaseCategoria = categoria.toLowerCase()
        try {
            const result = await produtoUseCase.listByCategories(lowerCaseCategoria);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao resgatar os produtos desta categoria")
        }
    })
    
    fastify.get<{Params:{pagina:number}}>("/pagina=:pagina", async(req,reply) => {
        const {pagina} = req.params;
        try {
            const result = await produtoUseCase.listAllProducts(pagina);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao resgatar os produtos")
        }
    })

    
    fastify.get<{Params:{proprietario:string}}>("/proprietario/:proprietario", async(req,reply) => {
        const {proprietario} = req.params;
        try {
            const result = await produtoUseCase.listProductsByOwner(proprietario)
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao resgatar os itens cadastrados por esse proprietário")
        }
    })

     fastify.put<{Params:{produto_id:string},Body:{quantidade:number}}>("/atualiza-estoque/:produto_id", async(req,reply) => {
        const {produto_id} = req.params;
        const {quantidade} = req.body
        try {
            const result = await produtoUseCase.updateProductQuantity(produto_id,quantidade)
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao atualizar o estoque do produto")
        }
    })

     fastify.get("/mais-vendidos", async(req,reply) => {
        try {
            const result = await produtoUseCase.getBestSellers()
            return reply.send(result)
        } catch (error) {
            throw new Error("Houve um erro ao resgatar os produtos mais vendidos")
        }
    })


} 