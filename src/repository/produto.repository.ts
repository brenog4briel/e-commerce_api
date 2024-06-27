import { prisma } from "../database/prisma-client";
import { ProdutoData, Produto, ProdutoRepository } from "../interfaces/produto.interface";

class ProdutoRepositoryPrisma implements ProdutoRepository {

    async create({nome,preco,proprietario,qtd_estoque,usuario_id,categoria,imagem}: ProdutoData): Promise<Produto> {
        const result = await prisma.produto.create({
            data:{
                nome,
                preco,
                proprietario,
                qtd_estoque,
                usuario_id,
                categoria,
                imagem
            }
        })
        return result
    }

    async update({produto_id,nome,preco,proprietario,qtd_estoque,categoria,imagem}: Produto): Promise<Produto> {
        const result = await prisma.produto.update({
            where:{
                produto_id,
            },
            data: {
                nome,
                preco,
                proprietario,
                qtd_estoque,
                categoria,
                imagem
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

    async findOne(produto_id:string): Promise<Produto | null> {
         const result = await prisma.produto.findFirst({
            where:{produto_id}
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

    async listAllProducts(pagina:number): Promise<Produto[] | null> {
        const result = await prisma.produto.findMany({
            take: pagina * 10
        });
        return result || null
    }

    async updateProductImage(produto_id: string, imagem: string): Promise<Produto> {
        const result = await prisma.produto.update({
            where: {produto_id:produto_id},
            data:{imagem: imagem}
        })
        return result
    }

    async listProductsByOwner(proprietario: string): Promise<Produto[] | null> {
        const result = await prisma.produto.findMany({
            where:{
                proprietario
            }
        })

        return result || null
    }
    
}

export {ProdutoRepositoryPrisma}