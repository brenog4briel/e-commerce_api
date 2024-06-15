import { FastifyInstance } from "fastify";
import { UsuarioUseCase } from "../usecases/usuario.usecase";
import Multer from "fastify-multer"
import multipart from "@fastify/multipart"
export async function UploadRoutes(fastify: FastifyInstance) {
    const usuarioUseCase = new UsuarioUseCase();

    const storage = Multer.diskStorage({
        destination: function(req,file,cb) {
            cb(null,"upload/");
        },
        filename: function(req,file,cb) {
            cb(null,new Date().toISOString() + file.originalname)
        }
    })

    const upload = Multer({
        storage:storage
    })


    fastify.post<{Params:{usuario_id:string}}>("/:usuario_id",{preHandler:upload.single("file")} ,async(req,reply) => {
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

