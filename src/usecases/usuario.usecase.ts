import { Usuario, UsuarioRepository } from "../interfaces/usuario.interface";
import { UsuarioRepositoryPrisma } from "../repository/usuario.repository";

class UsuarioUseCase {
    private usuarioRepository: UsuarioRepository;
    constructor() {
        this.usuarioRepository = new UsuarioRepositoryPrisma();
    }

    async create({ nome, senha, email, endereco, CEP }: Usuario): Promise<Usuario> {
        const result = await this.usuarioRepository.create({ nome, senha, email, endereco, CEP });
        return result;
    }
}

export { UsuarioUseCase };
