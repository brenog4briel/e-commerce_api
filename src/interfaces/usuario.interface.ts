export interface Usuario {
    usuario_id: number;
    nome: string;
    senha: string;
    email: string;
    endereco: string;
    CEP: string;
    criadoEm: Date
    atualizadoEm: Date
}

export interface CriacaoUsuario {
    nome: string;
    senha: string;
    email: string;
    endereco: string;
    CEP: string;
}

export interface UsuarioRepository {
    create(data:CriacaoUsuario): Promise<Usuario>
}