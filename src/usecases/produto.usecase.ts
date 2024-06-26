import { ProdutoData, Produto, ProdutoRepository } from "../interfaces/produto.interface";
import { ProdutoRepositoryPrisma } from "../repository/produto.repository";

class ProdutoUseCase {
    private produtoRepository : ProdutoRepository;
    constructor() {
        this.produtoRepository = new ProdutoRepositoryPrisma();

    }

    async create({nome,preco,proprietario,qtd_estoque,usuario_id,categoria,imagem}: ProdutoData) : Promise<Produto> {
        const result = await this.produtoRepository.create({nome,preco,proprietario,qtd_estoque,usuario_id,categoria,imagem});
        return result;
    }

    async update({produto_id,nome,preco,proprietario,qtd_estoque,categoria,imagem}:Produto){

        const result = await this.produtoRepository.update({
            produto_id,
            nome,
            preco,
            proprietario,
            qtd_estoque,
            categoria,
            imagem
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

    async findOne(produto_id:string): Promise<Produto | null>{
        const result = await this.produtoRepository.findOne(produto_id);
        return result || null;
    }   
    
    async listByCategories(categoria:string): Promise<Produto[] | null> {
        const result = await this.produtoRepository.listByCategories(categoria);
        return result || null;
    }

    async listAllProducts(pagina:number): Promise<Produto[] | null> {
        const result = await this.produtoRepository.listAllProducts(pagina);
        return result || null;
    }

    async updateProductImage(produto_id:string,imagem:string) : Promise<Produto> {
        const result = await this.produtoRepository.updateProductImage(produto_id,imagem)
        return result;
    }
}

export {ProdutoUseCase}