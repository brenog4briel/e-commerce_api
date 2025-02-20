import { FastifyInstance } from "fastify";
import { UsuarioUseCase } from "../usecases/usuario.usecase";
import { ProdutoUseCase } from "../usecases/produto.usecase";

export async function UploadRoutes(fastify: FastifyInstance) {

    const usuarioUseCase = new UsuarioUseCase();

    fastify.put<{Params:{usuario_id:string}; Body:{imagem:string}}>("/usuario/:usuario_id",async(req,reply) => {
        const {usuario_id} = req.params;
        const {imagem} = req.body;
        try {
            usuarioUseCase.updateUserImage(usuario_id,imagem)
            reply.send("Upload realizado com sucesso!")
        } catch (error) {
            throw new Error("Houve um erro ao realizar o upload do arquivo")
        }
    });
}

