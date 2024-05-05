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
    create(data: CriacaoUsuario): Promise<Usuario>
    findOne(email:string): Promise<Usuario | null>
    findEmailById(usuario_id:number | undefined): Promise<string | null>
}