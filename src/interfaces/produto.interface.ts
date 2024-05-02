export interface Produto {
  nome: string
  preco: number
  proprietario: string
  qtd_estoque: number;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface CriacaoProduto {
  nome: string
  preco: number
  proprietario: string
  qtd_estoque: number;
}

export interface ProdutoRepository {
    create(data:CriacaoProduto): Promise<Produto>
}