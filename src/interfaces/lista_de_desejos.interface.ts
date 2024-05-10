import { Produto, ProdutoData } from "./produto.interface";

export interface Lista_de_desejos {
    lista_de_desejos_id: string
    usuario_id: string;
    preco_acumulado: number;
    produto?: Produto[];
}

export interface Lista_de_desejos_Data {
    usuario_id: string;
    preco_acumulado: number;
    produto: Produto[];
}


export interface Lista_de_desejos_Repository {
    create(Lista_de_desejos: Lista_de_desejos_Data): Promise<Lista_de_desejos>
    adicionaProdutos(pedido_de_compra_id:string,produtos:ProdutoData[]) : Promise<Lista_de_desejos>
}