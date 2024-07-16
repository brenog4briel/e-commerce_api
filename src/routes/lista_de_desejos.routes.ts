import { FastifyInstance } from "fastify";
import { Lista_de_desejos_Usecase } from "../usecases/lista_de_desejos_usecase";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Produto } from "../interfaces/produto.interface";

export async function Lista_de_desejosRoutes(fastify:FastifyInstance) {

    const lista_de_desejos_Usecase = new Lista_de_desejos_Usecase();

    fastify.addHook("preHandler",authMiddleware)

    fastify.get("/", (req,reply) => {
        reply.send("Olá")
    })
    fastify.post<{Body: {usuario_id:string}}>("/",async(req,reply) => {
        const {usuario_id} = req.body;
        try {
            const result = await lista_de_desejos_Usecase.create(usuario_id);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao criar a lista de desejos")

        }
    })

    fastify.put<{Body: {lista_de_desejos_id:string, produto:Produto}}>("/adiciona-produto",async(req,reply) => {
        const {lista_de_desejos_id,produto} = req.body;
        console.log(req.body)
        try {
            const result = await lista_de_desejos_Usecase.adicionaProduto(lista_de_desejos_id,produto);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao adicionar um produto a lista de desejos")
        }
    })

    fastify.put<{Body: {lista_de_desejos_id:string, produto:Produto}}>("/remove-produto",async(req,reply) => {
        const {lista_de_desejos_id,produto} = req.body;
        try {
            const result = await lista_de_desejos_Usecase.removeProduto(lista_de_desejos_id,produto);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao remover um produto a lista de desejos")
        }
    })

    fastify.put<{Body: {lista_de_desejos_id:string}}>("/remove-all",async(req,reply) => {
        const {lista_de_desejos_id} = req.body;
        try {
            const result = await lista_de_desejos_Usecase.removeAllProducts(lista_de_desejos_id);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao limpar a lista de desejos")
        }
    })

    fastify.get<{Params: {usuario_id:string}}>("/lista/:usuario_id",async(req,reply) => {
        const {usuario_id} = req.params;
        try {
            const result = await lista_de_desejos_Usecase.getListByUserId(usuario_id);
            return reply.send(result);
        } catch (error) {
            throw new Error("Houve um erro ao resgatar a informação da lista de desejos")
        }
    })

}
