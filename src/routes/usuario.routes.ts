import { FastifyInstance } from "fastify";
import { CriacaoUsuario } from "../interfaces/usuario.interface";
import { UsuarioUseCase } from "../usecases/usuario.usecase";

export async function UsuarioRoutes(fastify:FastifyInstance) {

    const usuarioUseCase = new UsuarioUseCase();

    fastify.get("/",(req,reply) => {
        reply.send("Olá!")
    })

    fastify.post<{Body:CriacaoUsuario}>("/",async(req,reply) => {
        const {nome,senha,email,endereco,CEP} = req.body;
        try {
            const data = await usuarioUseCase.create({nome,senha,email,endereco,CEP});
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
}