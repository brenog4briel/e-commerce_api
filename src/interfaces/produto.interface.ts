export interface Produto {
  produto_id: number
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
    update({nome,preco,proprietario,qtd_estoque}:CriacaoProduto) : Promise<CriacaoProduto | null>
}