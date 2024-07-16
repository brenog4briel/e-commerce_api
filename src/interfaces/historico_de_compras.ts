import { Produto } from "./produto.interface";

export interface Historico_de_compras {
    historico_de_compras_id:string;
    total_de_aquisicoes: number; 
    preco_total_gasto: number;
    usuario_id:string;
    produtos?: Produto[];
}
export interface Historico_de_compras_Repository {
    create(usuario_id:string): Promise<Historico_de_compras>
    adicionaProdutos(lista_de_desejos_id:string, produto:Produto[]) : Promise<Historico_de_compras>
    getListByUserId(usuario_id:string) : Promise<Historico_de_compras | null>
}