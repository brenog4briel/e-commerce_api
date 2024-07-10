export interface Produto {
    produto_id: string;
    nome: string;
    preco: number;
    proprietario: string;
    qtd_estoque: number;
    categoria: string;
    imagem:string;
    numero_vendas?:number;
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
    imagem:string;
    usuario_id: string;
}

export interface ProdutoRepository {
    create(data:ProdutoData): Promise<Produto>
    update({produto_id,nome,preco,proprietario,qtd_estoque,categoria}:Produto): Promise<Produto>
    findAll(proprietario:string): Promise<Produto[] | null>;
    findOne(produto_id:string): Promise<Produto | null>
    delete(produto_id:string): Promise<boolean>
    listByCategories(categoria:string):Promise<Produto[] | null>
    listAllProducts(pagina:number): Promise<Produto[] | null>
    updateProductImage(produto_id:string,imagem:string) : Promise<Produto>;
    listProductsByOwner(proprietario:string) : Promise<Produto[] | null>
    updateProductQuantity(produto_id:string,quantidade:number) : Promise<Produto>
    getBestSellers() : Promise<Produto[]>

}