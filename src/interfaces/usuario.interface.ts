import { Lista_de_desejos } from "./lista_de_desejos.interface";
import { Pedido_de_compra } from "./pedido_de_compra.interface";
import {Produto} from "./produto.interface"

export interface Usuario {
    usuario_id: string;
    nome: string;
    senha: string;
    email: string;
    endereco: string;
    CEP: string;
    produtos?: Produto[];
    lista_de_desejos?: Lista_de_desejos;
    pedido_de_compra?: Pedido_de_compra[];
    criadoEm?: Date
    atualizadoEm?: Date
}

export interface UsuarioData {
    nome: string;
    senha: string;
    email: string;
    endereco: string;
    CEP: string;
    produtos?: Produto[];
    lista_de_desejos?: Lista_de_desejos;
    pedido_de_compra?: Pedido_de_compra[];
}

export interface UsuarioRepository {
    create(data: UsuarioData): Promise<Usuario>
    findByEmail(email:string): Promise<Usuario | null>
    findEmailById(usuario_id:string | undefined): Promise<string | null>
    updateUserInfo(usuario_id:string,nome:string,endereco:string,CEP:string) : Promise<Usuario>;
    updateUserProducts(usuario: Usuario, produto:Produto) : Promise<Usuario>;
}