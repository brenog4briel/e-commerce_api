export interface Produto {
    produto_id: string;
    nome: string;
    preco: number;
    proprietario: string;
    qtd_estoque: number;
    pedido_de_compra_id?: string;
    lista_de_desejos_id?: string;
    usuario_id?: string;
    criadoEm?: Date;
    atualizadoEm?: Date;
}

export interface CriacaoProduto {
    nome: string;
    preco: number;
    proprietario: string;
    qtd_estoque: number;
    usuario_id: string;
}

export interface ProdutoRepository {
    create(data:CriacaoProduto): Promise<Produto>
    update({produto_id,nome,preco,proprietario,qtd_estoque}:Produto): Promise<Produto>
    findAll(proprietario:string): Promise<Produto[] | null>;
    findOne(nome:string,proprietario:string): Promise<Produto | null>
    delete(produto_id:string): Promise<boolean>
}