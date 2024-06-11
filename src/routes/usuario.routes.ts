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

    fastify.post<{Body:UsuarioData}>("/",async(req,reply) => {
        try {
            const data = await usuarioUseCase.create(req.body);
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.put<{Body:Usuario ; Params:{usuario_id : string}}>("/:usuario_id", async(req,reply) => {
        const {usuario_id} = req.params;
        const {nome, endereco, CEP,imagem } = req.body;
        try {
            const data = await usuarioUseCase.updateUserInfo(usuario_id,nome,endereco,CEP,imagem);
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

    fastify.post<{Params:{email:string}}>('/recuperacao/:email', async(req, reply) => {
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAIL_HOST,
            port: Number(process.env.NODEMAIL_PORT),
            secure: false, // use SSL
            auth: {
                user: process.env.NODEMAIL_USER,
                pass: process.env.NODEMAIL_PASS,
            }
    });

        let email = req.params.email
        try {
            let message = await transporter.sendMail({
            from: 'brenosacerdote@academico.ufs.br',
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
            html:`<h1>Email enviado para ${email}</h1>`
        })
        } catch (error) {
            reply.send(error)
        }
        
    })
}
