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

    async findByEmail(email:string): Promise<Usuario | null> {
        const result = await this.usuarioRepository.findByEmail(email);
        return result
    }

    async findEmailById(usuario_id: string): Promise<string | null> {
        const result = await this.usuarioRepository.findEmailById(usuario_id);
        return result;
    }

    async updateUserInfo(usuario_id:string,nome?:string,endereco?:string,CEP?:string,imagem?:string): Promise<Usuario> {
        const result = await this.usuarioRepository.updateUserInfo(usuario_id, nome, endereco, CEP );
        return result;

    }

    async updateUserImage(usuario_id:string,imagem:string) : Promise<Usuario> {
        const result = await this.usuarioRepository.updateUserImage(usuario_id,imagem)
        return result;
    }

    
}

export {UsuarioUseCase}