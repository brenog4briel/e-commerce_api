import { prisma } from "../database/prisma-client";
import { Usuario, UsuarioData, UsuarioRepository } from "../interfaces/usuario.interface";
import bcrypt from "bcryptjs";


class UsuarioRepositoryPrisma implements UsuarioRepository {
    async create(data:UsuarioData): Promise<Usuario> {
        const hashedPassword = await bcrypt.hash(data.senha,10);
        const result = await prisma.usuario.create({
            data:{
                nome: data.nome,
                senha: hashedPassword ,
                email: data.email,
                endereco: data.endereco,
                CEP: data.CEP,
                produtos:{},
                lista_de_desejos:{},
                pedido_de_compra:{},
                imagem: ""
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

    async updateUserInfo(usuario_id:string,nome?:string,endereco?:string,CEP?:string) : Promise<Usuario> {
        const result = await prisma.usuario.update({
            where: {
                usuario_id,
            },
            data:{
                nome,
                endereco,
                CEP,
            }
        })

        return result;
    }

    async updateUserImage(usuario_id: string, imagem: string): Promise<Usuario> {
        const result = await prisma.usuario.update({
            where:{ usuario_id : usuario_id},
            data: {
                imagem: imagem
            }
        })
        return result;
    }
}

export {UsuarioRepositoryPrisma}