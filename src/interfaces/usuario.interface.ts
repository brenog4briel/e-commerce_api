export interface Usuario {
  nome: string;
  senha: string;
  email: string;
  endereco: string;
  CEP: string;
  criadoEm:Date;
  atualizadoEm:Date;
}

export interface CriacaoUsuario {
  nome: string;
  senha: string;
  email: string;
  endereco: string;
  CEP: string;
}

// UsuarioRepository conterá todos os métodos disponibilizados para essa interface

export interface UsuarioRepository {
  create(data: CriacaoUsuario): Promise<Usuario>;
}
