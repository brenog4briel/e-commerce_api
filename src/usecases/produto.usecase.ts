import { ProdutoData, Produto, ProdutoRepository } from "../interfaces/produto.interface";
import { UsuarioRepository } from "../interfaces/usuario.interface";
import { ProdutoRepositoryPrisma } from "../repository/produto.repository";
import { UsuarioRepositoryPrisma } from "../repository/usuario.repository";

class ProdutoUseCase {
    private produtoRepository : ProdutoRepository;
    private usuarioRepository : UsuarioRepository;
    constructor() {
        this.produtoRepository = new ProdutoRepositoryPrisma();
        this.usuarioRepository = new UsuarioRepositoryPrisma();

    }

    async create({nome,preco,proprietario,qtd_estoque,usuario_id}: ProdutoData) : Promise<Produto> {
        const result = await this.produtoRepository.create({nome,preco,proprietario,qtd_estoque,usuario_id});
        this.usuarioRepository.updateUserProducts({nome,preco,proprietario,qtd_estoque,usuario_id})

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