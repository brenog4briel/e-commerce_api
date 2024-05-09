import { ProdutoData, Produto, ProdutoRepository } from "../interfaces/produto.interface";
import { ProdutoRepositoryPrisma } from "../repository/produto.repository";

class ProdutoUseCase {
    private produtoRepository : ProdutoRepository;
    constructor() {
        this.produtoRepository = new ProdutoRepositoryPrisma();

    }

    async create({nome,preco,proprietario,qtd_estoque,usuario_id}: ProdutoData) : Promise<Produto> {
        const result = await this.produtoRepository.create({nome,preco,proprietario,qtd_estoque,usuario_id});
        return result;
    }

    async update({produto_id,nome,preco,proprietario,qtd_estoque}:Produto){

        const result = await this.produtoRepository.update({
            produto_id,
            nome,
            preco,
            proprietario,
            qtd_estoque
        })
        return result;
    }

    async delete(produto_id:string) : Promise<boolean>{
        const result = await this.produtoRepository.delete(produto_id);
        return result;
    }

    async findAll(proprietario:string): Promise<Produto[] | null>{
        const result = await this.produtoRepository.findAll(proprietario);
        return result || null;
    }

    async findOne(nome:string,proprietario:string): Promise<Produto | null>{
        const result = await this.produtoRepository.findOne(nome,proprietario);
        return result || null;
    }   
}

export {ProdutoUseCase}