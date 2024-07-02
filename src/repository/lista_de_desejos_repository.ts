import { prisma } from "../database/prisma-client";
import { Lista_de_desejos, Lista_de_desejos_Repository } from "../interfaces/lista_de_desejos.interface";
import { ProdutoData } from "../interfaces/produto.interface";

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

    async adicionaProdutos(lista_de_desejos_id:string,produto: ProdutoData): Promise<Lista_de_desejos> {
        const result = await prisma.lista_de_desejos.update({
            where:{
                lista_de_desejos_id: lista_de_desejos_id
            },
            data:{
                produtos:{
                    create:produto
                },
                total_de_produtos: {
                    increment:1
                }
            },include:
            {produtos:false}
            
        })
        return result;
    }

    async removeProduto(lista_de_desejos_id: string, produto_id: string): Promise<Lista_de_desejos> {
        const result = await prisma.lista_de_desejos.update({
            where:{lista_de_desejos_id},
            data:{
                produtos:{
                    delete:{
                       produto_id
                    }
                },
                total_de_produtos: {
                    decrement:1
                }
            }
        })
        return result || null;
    }

   async getListIdByUserId(usuario_id: string): Promise<string | null> {
        const result = await prisma.lista_de_desejos.findFirst({
            where:{
                usuario_id
            }
        })
    return result?.lista_de_desejos_id || null    
    }
}

export {Lista_de_desejos_Prisma}