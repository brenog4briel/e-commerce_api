import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../auth/auth.usecase";

export async function authMiddleware(req:FastifyRequest,reply:FastifyReply) {
    const authService = new AuthService();

    const token:any = req.headers["token"];

    if (!token) {reply.status(401).send({message:"Usuário não autorizado!"})}
    
    const isAuth = await authService.verifyToken(token);
    }