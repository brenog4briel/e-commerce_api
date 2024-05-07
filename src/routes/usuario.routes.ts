import { FastifyInstance } from "fastify";
import { CriacaoUsuario } from "../interfaces/usuario.interface";
import { UsuarioUseCase } from "../usecases/usuario.usecase";
import { AuthService } from "../auth/auth.usecase";

export async function UsuarioRoutes(fastify:FastifyInstance) {

    const usuarioUseCase = new UsuarioUseCase();
    const authService = new AuthService();

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

    fastify.post<{Body:CriacaoUsuario}>("/login",async(req,reply) => {
        const {email,senha} = req.body;
        try {

            const data = await authService.login(email,senha)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
}