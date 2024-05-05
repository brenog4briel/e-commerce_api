import { CriacaoUsuario, Usuario, UsuarioRepository } from "../interfaces/usuario.interface";
import { UsuarioRepositoryPrisma } from "../repository/usuario.repository";

class UsuarioUseCase {
    private usuarioRepository: UsuarioRepository
    constructor() {
        this.usuarioRepository = new UsuarioRepositoryPrisma()
    }

    async create({nome,email,senha,endereco,CEP}:CriacaoUsuario): Promise<Usuario> {

        const usuarioExiste = await this.usuarioRepository.findOne(email);
        if (usuarioExiste) {throw new Error("Usuário já cadastrado!")}

        const result = await this.usuarioRepository.create({nome,senha,email,endereco,CEP});
        return result;
    }
}

export {UsuarioUseCase}