import Multer from "fastify-multer"
import { UsuarioUseCase } from "../usecases/usuario.usecase";

const usuarioUseCase = new UsuarioUseCase()

const ROOT_PATH = process.env.ROOT_PATH || __dirname

const storage = Multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,ROOT_PATH);
    },
    filename: function(req,file,cb) {
        cb(null,file.originalname)
    }
})

const upload = Multer({
    storage:storage
})

export const fieldsUpload = upload.single("file")
