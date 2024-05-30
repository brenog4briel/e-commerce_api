import { prisma } from "../database/prisma-client";
import { ProdutoData, Produto, ProdutoRepository } from "../interfaces/produto.interface";

class ProdutoRepositoryPrisma implements ProdutoRepository {

    async create({nome,preco,proprietario,qtd_estoque,usuario_id,categoria}: ProdutoData): Promise<Produto> {
        const result = await prisma.produto.create({
            data:{
                nome,
                preco,
                proprietario,
                qtd_estoque,
                usuario_id,
                categoria
            }
        })

        return result
    }

    async update({produto_id,nome,preco,proprietario,qtd_estoque,categoria}: Produto): Promise<Produto> {
        const result = await prisma.produto.update({
            where:{
                produto_id,
            },
            data: {
                nome,
                preco,
                proprietario,
                qtd_estoque,
                categoria
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

    async listByCategories(categoria: string): Promise<Produto[] | null> {
        const result = await prisma.produto.findMany({
            where: {
                categoria
            }
        })
        return result || null;
    }

    async listAllProducts(): Promise<Produto[] | null> {
        const result = await prisma.produto.findMany();
        return result || null
    }
}

export {ProdutoRepositoryPrisma}