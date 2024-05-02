export interface Produto {
  nome: string
  preco: number
  proprietario: string
  qtd_estoque: number
}

export interface ProdutoRepository {
    create(data:Produto): Promise<Produto>
}