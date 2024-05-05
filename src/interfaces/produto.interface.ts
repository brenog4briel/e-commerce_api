export interface Produto {
    produto_id: number;
    nome: string;
    preco: number;
    proprietario: string;
    qtd_estoque: number;
    criadoEm?: Date;
    atualizadoEm?: Date;
    usuario_id?: number;
}

export interface CriacaoProduto {
    nome: string;
    preco: number;
    proprietario: string;
    qtd_estoque: number;
    usuario_id: number;
}

export interface ProdutoRepository {
    create(data:CriacaoProduto): Promise<Produto>
    update({produto_id,nome,preco,proprietario,qtd_estoque}:Produto): Promise<Produto>
    findAll(proprietario:string): Promise<Produto[] | null>;
    findOne(nome:string,proprietario:string): Promise<Produto | null>
    delete(produto_id:number): Promise<boolean>
}