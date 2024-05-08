import { Produto } from "./produto.interface";

export interface Lista_de_desejos {
    usuario_id: string;
    preco_acumulado: number;
    produto: Produto[];
}

