import { FastifyInstance } from "fastify";
import { fieldsUpload } from "../upload/upload";
import { UsuarioUseCase } from "../usecases/usuario.usecase";

export async function UploadRoutes(fastify: FastifyInstance) {
    const usuarioUseCase = new UsuarioUseCase();

    fastify.post<{Body:{usuario_id:string}}>("/",{preHandler:fieldsUpload} ,async(req:any,reply:any) => {
        const {usuario_id} = req.body;
        try {
            usuarioUseCase.updateUserImage(usuario_id,req.file)
            reply.send("Upload realizado com sucesso!")
        } catch (error) {
            throw new Error("Houve um erro ao realizar o upload do arquivo")
        }
    });
}

