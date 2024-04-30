import { prisma } from "../database/prisma-client";
import { Usuario, UsuarioRepository } from "../interfaces/usuario.interface";

class UsuarioRepositoryPrisma implements UsuarioRepository {
    async create(data: Usuario): Promise<Usuario> {
        const result = await prisma.usuario.create({
            data: {
                nome: data.nome,
                senha: data.senha,
                email: data.email,
                endereco: data.endereco,
                CEP: data.CEP,
            },
        });

        return result;
    }
}

export { UsuarioRepositoryPrisma };
