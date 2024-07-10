import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../auth/auth.usecase";

export async function authMiddleware(req:FastifyRequest,reply:FastifyReply) {
    
    const authService = new AuthService();

     
    //Para teste no postman

    // const tokenReceived : string = req.headers.token;
    // if (!tokenReceived) {throw new Error("Você não tem permissão para acessar essa rota!")}
    // const isAuth = await authService.verifyToken(tokenReceived);

    const tokenReceived : string = req.headers.authorization!;
    if (!tokenReceived) {throw new Error("Você não tem permissão para acessar essa rota!")}
    const tokenFormatted = tokenReceived.slice(7,tokenReceived.length)

    if (!tokenFormatted) {reply.status(401).send({message:"Usuário não autorizado!"})}
    
    const isAuth = await authService.verifyToken(tokenFormatted);

    }