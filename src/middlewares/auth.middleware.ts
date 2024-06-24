import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../auth/auth.usecase";

export async function authMiddleware(req:FastifyRequest,reply:FastifyReply) {
    
    const authService = new AuthService();
    // Postman
    // const {token}  = req.headers;
    
    // if (!token) {throw new Error("Você não tem permissão para acessar essa rota!")}
    // const isAuth = await authService.verifyToken(token);

    //Render

    const tokenReceived : string = req.headers.authorization!;
    if (!tokenReceived) {throw new Error("Você não tem permissão para acessar essa rota!")}
    const tokenFormatted = tokenReceived.slice(7,tokenReceived.length)

    if (!tokenFormatted) {reply.status(401).send({message:"Usuário não autorizado!"})}
    
    const isAuth = await authService.verifyToken(tokenFormatted);

    }