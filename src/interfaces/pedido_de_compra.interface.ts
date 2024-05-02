export interface Pedido_de_compra {
    usuario_id: number;
    data: Date;
    numero: string;
    total_a_pagar: number;
    endereco: string;
    CEP: string;
    desconto: number | null;
}
