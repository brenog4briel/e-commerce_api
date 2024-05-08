import { prisma } from "../database/prisma-client";
import { Usuario, UsuarioRepository } from "../interfaces/usuario.interface";
import bcrypt from "bcryptjs";


class UsuarioRepositoryPrisma implements UsuarioRepository {
    async create(data:Usuario): Promise<Usuario> {
        const hashedPassword = await bcrypt.hash(data.senha,10);
        const result = await prisma.usuario.create({
            data:{
                nome: data.nome,
                senha: hashedPassword ,
                email: data.email,
                endereco: data.endereco,
                CEP: data.CEP,
                lista_de_desejos:undefined,
                produto:undefined,
                pedido_de_compra:undefined
            }
        })
        return result;
    }

    async findByEmail(email:string): Promise<Usuario | null> {
        const result = await prisma.usuario.findFirst({
            where:{
                email
            }
        })
        return result || null;
    }

    async findEmailById(usuario_id: string): Promise<string | null> {
        const result = await prisma.usuario.findFirst({
            where:{
                usuario_id
            }
        })
        return result?.email || null
    }
}

export {UsuarioRepositoryPrisma}