import { FastifyInstance } from "fastify";
import { UsuarioData, Usuario } from "../interfaces/usuario.interface";
import { UsuarioUseCase } from "../usecases/usuario.usecase";
import { AuthService } from "../auth/auth.usecase";

export async function UsuarioRoutes(fastify:FastifyInstance) {

    const usuarioUseCase = new UsuarioUseCase();
    const authService = new AuthService();

    fastify.get("/",(req,reply) => {
        reply.send("Olá!")
    })

    fastify.post<{Body:UsuarioData}>("/",async(req,reply) => {
        const {nome,email,senha,CEP,endereco,lista_de_desejos,pedido_de_compra,produtos} = req.body;
        try {
            const data = await usuarioUseCase.create({nome,email,senha,CEP,endereco,lista_de_desejos,pedido_de_compra,produtos});
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.put<{Body:Usuario ; Params:{usuario_id : string}}>("/:usuario_id", async(req,reply) => {
        const {usuario_id} = req.params;
        const {nome, endereco, CEP } = req.body;
        try {
            const data = await usuarioUseCase.updateUserInfo(usuario_id,nome,endereco,CEP);
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.post<{Body:UsuarioData}>("/login",async(req,reply) => {
        const {email,senha} = req.body;
        try {

            const data = await authService.login(email,senha)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
}