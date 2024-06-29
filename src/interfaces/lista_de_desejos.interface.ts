import { Produto, ProdutoData } from "./produto.interface";

export interface Lista_de_desejos {
    lista_de_desejos_id: string
    usuario_id: string;
    preco_acumulado: number;
    produto?: Produto[];
}
export interface Lista_de_desejos_Repository {
    create(usuario_id:string): Promise<Lista_de_desejos>
    adicionaProdutos(lista_de_desejos_id:string, produto:ProdutoData) : Promise<Lista_de_desejos>
    removeProduto(lista_de_desejos_id:string,produto_id:string) : Promise<Lista_de_desejos>
}