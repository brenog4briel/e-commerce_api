import { prisma } from "../database/prisma-client";
import { Produto, ProdutoRepository } from "../interfaces/produto.interface";

class ProdutoRepositoryPrisma implements ProdutoRepository {
    async create(data: Produto): Promise<Produto> {
        const result = await prisma.produto.create({
            data: {
                nome: data.nome,
                preco:data.preco,
                proprietario:data.proprietario,
                qtd_estoque:data.qtd_estoque
            },
        });

        return result;
    }
}

export { ProdutoRepositoryPrisma };
