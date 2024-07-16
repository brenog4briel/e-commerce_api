import { Produto, ProdutoData } from "./produto.interface";
import { Usuario } from "./usuario.interface";

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
export interface Pedido_de_compra_Repository {
    create(usuario:Usuario) : Promise<Pedido_de_compra>
    adicionaProdutos(pedido_de_compra_id:string,produtos:Produto) : Promise<Pedido_de_compra | null>
    removeProdutos(pedido_de_compra_id:string,produto:Produto) : Promise<void>
    deletePedido(pedido_de_compra_id:string): Promise<void>
    getPedidoByUserId(usuario_id:string) : Promise<Pedido_de_compra | null>
}