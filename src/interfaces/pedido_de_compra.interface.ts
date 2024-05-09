import { ProdutoData } from "./produto.interface";

export interface Pedido_de_compra {
    pedido_de_compra_id: string;
    usuario_id: string;
    data: Date;
    total_a_pagar: number;
    endereco: string;
    CEP: string;
    desconto: number | null;
    produtos?: ProdutoData[];
}

export interface Pedido_de_compra_Data{
    usuario_id: string;
    total_a_pagar: number;
    endereco: string;
    CEP: string;
    desconto: number;
    produtos: ProdutoData[];
}

export interface Pedido_de_compra_Repository {
    create(pedido_de_compra:Pedido_de_compra_Data) : Promise<Pedido_de_compra>
    // adicionaProdutos(pedido_de_compra_id:string,produtos:ProdutoData[]) : Promise<Pedido_de_compra>
}