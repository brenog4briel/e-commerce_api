import { FastifyInstance } from "fastify";
import { UsuarioUseCase } from "../usecases/usuario.usecase";
import { Usuario } from "../interfaces/usuario.interface";

export async function usuarioRoutes(fastify: FastifyInstance) {
    const usuarioUseCase = new UsuarioUseCase();

    fastify.post<{ Body: Usuario }>("/", async(req, reply) => {
        const { nome, senha, email, endereco, CEP } = req.body;
        try {
            const data = await usuarioUseCase.create({ nome, senha, email, endereco, CEP });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get("/", (req, reply) => {
        reply.send("Olá");
    });
}
