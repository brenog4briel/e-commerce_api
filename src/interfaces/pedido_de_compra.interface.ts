import { Produto } from "./produto.interface";

export interface Pedido_de_compra {
    pedido_de_compra_id: string;
    usuario_id: string;
    data: Date;
    numero: string;
    total_a_pagar: number;
    endereco: string;
    CEP: string;
    desconto: number | null;
    produto: Produto[];
}
