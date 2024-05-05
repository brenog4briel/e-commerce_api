import { prisma } from "../database/prisma-client";
import { CriacaoUsuario, Usuario, UsuarioRepository } from "../interfaces/usuario.interface";
import crypto from "crypto"

class UsuarioRepositoryPrisma implements UsuarioRepository {
    async create(data:CriacaoUsuario): Promise<Usuario> {
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.pbkdf2Sync(data.senha, salt, 500, 512, 'sha512').toString();
        const result = await prisma.usuario.create({
            data:{
                nome: data.nome,
                senha: hash ,
                email: data.email,
                endereco: data.endereco,
                CEP: data.CEP,
            }
        })
        return result;
    }

    async findOne(email:string): Promise<Usuario | null> {
        const result = await prisma.usuario.findFirst({
            where:{
                email
            }
        })
        return result || null;
    }

    async findEmailById(usuario_id: number): Promise<string | null> {
        const result = await prisma.usuario.findFirst({
            where:{
                usuario_id
            }
        })
        return result?.email || null
    }
}

export {UsuarioRepositoryPrisma}