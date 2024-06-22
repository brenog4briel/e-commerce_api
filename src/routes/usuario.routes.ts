import { FastifyInstance } from "fastify";
import { UsuarioData, Usuario } from "../interfaces/usuario.interface";
import { UsuarioUseCase } from "../usecases/usuario.usecase";
import { AuthService } from "../auth/auth.usecase";
import nodemailer from "nodemailer"

export async function UsuarioRoutes(fastify:FastifyInstance) {

    const usuarioUseCase = new UsuarioUseCase();
    const authService = new AuthService();

    fastify.get("/",(req,reply) => {
        reply.send("Olá!")
    })

    // fastify.get<{Params:{usuario_id:string}}>("/id=:usuario_id",async(req,reply) => {
    //     const {usuario_id} = req.params;
    //     try {
    //         const data = await usuarioUseCase.findEmailById(usuario_id);
    //         return reply.send(data)
    //     } catch (error) {
    //         throw new Error("Houve um erro ao criar o usuário")
    //     }
    // })

    fastify.get<{Params:{email:string}}>("/usuario/:email",async(req,reply) => {
        const {email} = req.params;
        try {
            const data = await usuarioUseCase.findByEmail(email);
            return reply.send(data)
        } catch (error) {
            throw new Error("Houve um erro ao retornar o usuário")
        }
    })

    fastify.post<{Body:UsuarioData}>("/",async(req,reply) => {
        try {
            const data = await usuarioUseCase.create(req.body);
            return reply.send(data)
        } catch (error) {
            throw new Error("Houve um erro ao criar o usuário")
        }
    })

    fastify.put<{Body:Usuario ; Params:{usuario_id : string}}>("/:usuario_id", async(req,reply) => {
        const {usuario_id} = req.params;
        const {nome, endereco, CEP } = req.body;
        try {
            const data = await usuarioUseCase.updateUserInfo(usuario_id,nome,endereco,CEP);
            return reply.send(data)
        } catch (error) {
            throw new Error("Houve um erro ao atualizar o usuário")

        }
    })

    fastify.post<{Body:UsuarioData}>("/login",async(req,reply) => {
        const {email,senha} = req.body;
        try {

            const data = await authService.login(email,senha)
            return reply.send(data)
        } catch (error) {
            throw new Error("Houve um erro ao realizar a autenticação")
        }
    })

    fastify.post<{Params:{email:string}}>('/recuperacao/:email', async(req, reply) => {
        const {email} = req.params;

        const transporter = nodemailer.createTransport({
            service:"gmail",
            host: process.env.NODEMAIL_HOST,
            port: Number(process.env.NODEMAIL_PORT),
            secure:true,
            auth: {
                user: process.env.NODEMAIL_USER,
                pass: process.env.NODEMAIL_PASS,
            }
    });

        const emailExiste = await usuarioUseCase.findByEmail(email);
        if (emailExiste) {
            try {
                let message = await transporter.sendMail({
                from: process.env.NODEMAIL_HOST,
                to: email,
                subject: 'Recuperação de senha E-commerce',
                text: 'That was easy!',
                html:`<h1>Solicitação de recuperação de senha E-commerce</h1>`
            })
            } catch (error) {
                reply.send(error)
                throw new Error("Houve um erro ao realizar a recuperação de senha")
            }
        }
        else {
            throw new Error("O email fornecido não está cadastrado no banco de dados!")
        }
        
    })
}
