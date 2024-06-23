import { FastifyInstance } from "fastify";
import { UsuarioData, Usuario } from "../interfaces/usuario.interface";
import { UsuarioUseCase } from "../usecases/usuario.usecase";
import { AuthService } from "../auth/auth.usecase";
import nodemailer from "nodemailer"
import Mailgun from "mailgun.js";
import formData from "form-data"
import crypto from "crypto"

export async function UsuarioRoutes(fastify:FastifyInstance) {

    const usuarioUseCase = new UsuarioUseCase();
    const authService = new AuthService();
    let verifyCode :string ;
    const mailgun = new Mailgun(formData);
    const client = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY!});

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
        verifyCode = Math.random().toString(36).slice(-8);
        // const emailExiste = await usuarioUseCase.findByEmail(email);
        // if (emailExiste) {
            try {
               client.messages.create(process.env.MAILGUN_HOST!, {
                from: process.env.MAILGUN_FROM,
                to: [email],
                subject: "Recuperação de senha E-commerce",
                text: "Testing some Mailgun awesomeness!",
                html: `<h1>O seu código de recuperação é ${verifyCode}!</h1>`
                })
                .then(msg => console.log(msg)) // logs response data
                .catch(err => console.log(err));
            } 
            catch (error) {
                reply.send(error)
                throw new Error("Houve um erro ao realizar a recuperação de senha")
            }
        // }
        // else {
        //     throw new Error("O email fornecido não está cadastrado no banco de dados!")
        // }
    })

    fastify.post<{Params:{codigo:string}}>('/recuperacao/verificacao/:codigo', async(req, reply) => {
        const {codigo} = req.params;

        if (codigo === verifyCode) {
            return reply.send("Sucesso!")
        }
        
        throw new Error("Código de verificação incorreto")
        
    })
}
