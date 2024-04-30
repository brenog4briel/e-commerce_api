export interface Usuario {
  nome: string;
  senha: string;
  email: string;
  endereco: string;
  CEP: string;
}

// UsuarioRepository conterá todos os métodos disponibilizados para essa interface

export interface UsuarioRepository {
  create(data: Usuario): Promise<Usuario>;
}
