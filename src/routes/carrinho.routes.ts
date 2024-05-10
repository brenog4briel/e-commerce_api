import { FastifyInstance } from "fastify";
import { Lista_de_desejos_Usecase } from "../usecases/lista_de_desejos_usecase";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Lista_de_desejos_Data } from "../interfaces/lista_de_desejos.interface";
import { ProdutoData } from "../interfaces/produto.interface";

export async function CarrinhoRoutes(fastify:FastifyInstance) {

    const lista_de_desejos_Usecase = new Lista_de_desejos_Usecase();
    
    fastify.addHook("preHandler",authMiddleware);

    fastify.get("/", (req,reply) => {
        reply.send("Olá")
    })

    fastify.post<{Body: Lista_de_desejos_Data}>("/",async(req,reply) => {
        try {
            const result = await lista_de_desejos_Usecase.create(req.body);
            return reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    })

    fastify.put<{Body: {lista_de_desejos_id:string, produtos:ProdutoData[]}}>("/",async(req,reply) => {
        try {
            const result = await lista_de_desejos_Usecase.adicionaProduto(req.body.lista_de_desejos_id,req.body.produtos);
            return reply.send(result);
        } catch (error) {
            reply.send(error);
        }
    })
}
