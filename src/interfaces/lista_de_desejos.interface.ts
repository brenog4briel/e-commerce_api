import { Produto } from "./produto.interface";

export interface Lista_de_desejos {
    lista_de_desejos_id: string
    usuario_id: string;
    preco_acumulado: number;
    produto: Produto[];
}

