import { FastifyInstance } from "fastify";
import { fieldsUpload } from "../upload/upload";
import { UsuarioUseCase } from "../usecases/usuario.usecase";

export async function UploadRoutes(fastify: FastifyInstance) {
    const usuarioUseCase = new UsuarioUseCase();

    fastify.post<{Params:{usuario_id:string}}>("/:usuario_id",{preHandler:fieldsUpload} ,async(req,reply) => {
        const {usuario_id} = req.params;
        const file = JSON.stringify(req.file);
        try {
            usuarioUseCase.updateUserImage(usuario_id,file)
            reply.send("Upload realizado com sucesso!")
        } catch (error) {
            throw new Error("Houve um erro ao realizar o upload do arquivo")
        }
    });
}

