import { prisma } from "../database/prisma-client";
import { CriacaoProduto, Produto, ProdutoRepository } from "../interfaces/produto.interface";

class ProdutoRepositoryPrisma implements ProdutoRepository {


    async create(data: CriacaoProduto): Promise<Produto> {
        const result = await prisma.produto.create({
            data:{
                nome: data.nome,
                preco: data.preco,
                proprietario: data.proprietario,
                qtd_estoque: data.qtd_estoque,
                usuario_id: data.usuario_id,
            }
        })

        return result
    }

    async update({produto_id,nome,preco,proprietario,qtd_estoque}: Produto): Promise<Produto> {
        const result = await prisma.produto.update({
            where:{
                produto_id,
            },
            data: {
                nome,
                preco,
                proprietario,
                qtd_estoque
            }
        })
        return result;
    }

    async delete( produto_id : string): Promise<boolean> {
        const result = await prisma.produto.delete({
            where:{
                produto_id
            }
        })
        return result ? true : false
    }

    async findAll(proprietario: string): Promise<Produto[] | null> {
        const result = await prisma.produto.findMany({
            where:{
                proprietario
            }
        })
            
        return result || null;
    }

    async findOne(nome:string,proprietario:string): Promise<Produto | null> {
         const result = await prisma.produto.findFirst({
            where:{
               OR:[
                {nome},
                {proprietario}
               ]
            }
        })
            
        return result || null;
    }
}

export {ProdutoRepositoryPrisma}