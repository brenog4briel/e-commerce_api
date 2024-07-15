import { prisma } from "../database/prisma-client";
import { Historico_de_compras, Historico_de_compras_Repository } from "../interfaces/historico_de_compras";
import { ProdutoData } from "../interfaces/produto.interface";

class Historico_de_compras_Prisma implements Historico_de_compras_Repository {
    async create(usuario_id:string): Promise<Historico_de_compras> {
        const result = await prisma.historico_de_compras.create({
            data:{
                usuario_id: usuario_id,
                total_de_aquisicoes: 0, 
                preco_total_gasto: 0,
                produtos: {},
                
            }
        });
        return result;
    }

    async adicionaProdutos(historico_de_compras_id:string,produto: ProdutoData): Promise<Historico_de_compras> {
        const result = await prisma.historico_de_compras.update({
            where:{
                historico_de_compras_id: historico_de_compras_id
            },
            data:{
                produtos:{
                    createMany:{
                        data:[produto]
                    }
                },
                total_de_aquisicoes:{
                    increment:1
                },
                preco_total_gasto:{
                    increment: produto.preco
                }
            }
        })
        return result;
    }

    async getListByUserId(usuario_id: string): Promise<Historico_de_compras | null> {
        const result = await prisma.historico_de_compras.findFirst({
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

export {Historico_de_compras_Prisma}