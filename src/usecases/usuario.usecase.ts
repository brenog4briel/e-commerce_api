import { Usuario, UsuarioData, UsuarioRepository } from "../interfaces/usuario.interface";
import { UsuarioRepositoryPrisma } from "../repository/usuario.repository";

class UsuarioUseCase {
    private usuarioRepository: UsuarioRepository
    constructor() {
        this.usuarioRepository = new UsuarioRepositoryPrisma()
    }

    async create({nome,email,senha,CEP,endereco,lista_de_desejos,pedido_de_compra,produtos,imagem}:UsuarioData): Promise<Usuario> {
        const usuarioExiste = await this.usuarioRepository.findByEmail(email);
        if (usuarioExiste) {throw new Error("Usuário já cadastrado!")}

        const result = await this.usuarioRepository.create({nome,email,senha,CEP,endereco,lista_de_desejos,pedido_de_compra,produtos,imagem});
        return result;
    }

    async updateUserInfo(usuario_id?:string,nome?:string,endereco?:string,CEP?:string,imagem?:string): Promise<Usuario> {
        const result = await this.usuarioRepository.updateUserInfo(usuario_id, nome, endereco, CEP,imagem );
        return result;

    }
}

export {UsuarioUseCase}