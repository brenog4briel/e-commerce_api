import { prisma } from "../database/prisma-client";
import { Lista_de_desejos, Lista_de_desejos_Repository } from "../interfaces/lista_de_desejos.interface";
import { Produto, ProdutoData } from "../interfaces/produto.interface";

class Lista_de_desejos_Prisma implements Lista_de_desejos_Repository {
    async create(usuario_id:string): Promise<Lista_de_desejos> {
        const result = await prisma.lista_de_desejos.create({
            data:{
                usuario_id: usuario_id,
                preco_acumulado: 0,
                total_de_produtos:0,
                produtos: {}
            }
        });
        return result;
    }

    async adicionaProdutos(lista_de_desejos_id:string,produto: Produto): Promise<Lista_de_desejos> {
        const result = await prisma.lista_de_desejos.update({
            where:{
                lista_de_desejos_id: lista_de_desejos_id
            },
            data:{
                produtos:{
                    connect:{produto_id:produto.produto_id}
                },
                total_de_produtos: {
                    increment:1
                },
                preco_acumulado:{
                    increment: produto.preco
                }
            }
        })
        return result;
    }

    async removeProduto(lista_de_desejos_id: string, produto: Produto): Promise<Lista_de_desejos> {
        const result = await prisma.lista_de_desejos.update({
            where:{
                lista_de_desejos_id
            },
            data:{
                produtos:{
                    disconnect:{produto_id:produto.produto_id}
                },
                total_de_produtos: {
                    decrement:1
                },
                preco_acumulado: {
                    decrement: produto.preco
                }
            }
        })
        return result || null;
    }

    async getListByUserId(usuario_id: string): Promise<Lista_de_desejos | null> {
        const result = await prisma.lista_de_desejos.findFirst({
            where:{
                usuario_id
            },
            include:{
                produtos:true
            }
        })
        return result || null
    }
}

export {Lista_de_desejos_Prisma}