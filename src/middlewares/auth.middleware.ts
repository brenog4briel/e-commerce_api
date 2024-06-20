import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../auth/auth.usecase";

export async function authMiddleware(req:FastifyRequest,reply:FastifyReply) {
    const authService = new AuthService();
    const tokenReceived : string = req.headers.authorization!;
    const tokenFormatted = tokenReceived.slice(7,tokenReceived.length)

    if (!tokenFormatted) {reply.status(401).send({message:"Usuário não autorizado!"})}
    
    const isAuth = await authService.verifyToken(tokenFormatted);
    }