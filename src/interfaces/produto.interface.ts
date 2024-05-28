export interface Produto {
    produto_id: string;
    nome: string;
    preco: number;
    proprietario: string;
    qtd_estoque: number;
    categoria: string;
    usuario_id?: string;
    criadoEm?: Date;
    atualizadoEm?: Date;
}

export interface ProdutoData {
    nome: string;
    preco: number;
    proprietario: string;
    categoria:string;
    qtd_estoque: number;
    usuario_id: string;
}

export interface ProdutoRepository {
    create(data:ProdutoData): Promise<Produto>
    update({produto_id,nome,preco,proprietario,qtd_estoque,categoria}:Produto): Promise<Produto>
    findAll(proprietario:string): Promise<Produto[] | null>;
    findOne(nome:string,proprietario:string): Promise<Produto | null>
    delete(produto_id:string): Promise<boolean>
}