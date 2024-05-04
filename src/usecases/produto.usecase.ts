import { CriacaoProduto, Produto, ProdutoRepository } from "../interfaces/produto.interface";
import { ProdutoRepositoryPrisma } from "../repository/produto.repository";

class ProdutoUseCase {
    private produtoRepository : ProdutoRepository;

    constructor() {
        this.produtoRepository = new ProdutoRepositoryPrisma();
    }

    async create({nome,preco,proprietario,qtd_estoque}: CriacaoProduto) : Promise<Produto> {
        const result = await this.produtoRepository.create({nome,preco,proprietario,qtd_estoque});
        return result;
    }
}

export {ProdutoUseCase}