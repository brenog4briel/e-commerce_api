import { prisma } from "../database/prisma-client";
import { Pedido_de_compra, Pedido_de_compra_Repository } from "../interfaces/pedido_de_compra.interface";
import { ProdutoData } from "../interfaces/produto.interface";
import { Usuario } from "../interfaces/usuario.interface";

class Pedido_de_compra_RepositoryPrisma implements Pedido_de_compra_Repository {
    async create(usuario:Usuario): Promise<Pedido_de_compra> {
        const result = await prisma.pedido_de_compra.create({
            data:{
                usuario_id: usuario.usuario_id,
                total_a_pagar: 0,
                endereco: usuario.endereco,
                CEP: usuario.CEP,
                desconto: 0,
                produtos: {}
            }


        });
        return result;
    }

    async adicionaProdutos(pedido_de_compra_id:string,produto: ProdutoData): Promise<Pedido_de_compra> {
        const result = await prisma.pedido_de_compra.update({
            where:{
                pedido_de_compra_id: pedido_de_compra_id
            },
            data:{
                produtos:{
                    create:produto
                },
            },include:
            {produtos:false}
            
        })
        return result;
    }

    async removeProdutos(pedido_de_compra_id: string, produto_id: string): Promise<Pedido_de_compra> {
        const result = await prisma.pedido_de_compra.update({
            where:{
                pedido_de_compra_id
            },
            data:{
                produtos:{
                    delete:{
                        produto_id
                    }
                }
            }
        })
        return result;
    }

}

export {Pedido_de_compra_RepositoryPrisma}