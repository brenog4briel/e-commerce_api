import { prisma } from "../database/prisma-client";
import { Pedido_de_compra, Pedido_de_compra_Repository } from "../interfaces/pedido_de_compra.interface";
import { Produto, ProdutoData } from "../interfaces/produto.interface";
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

    async adicionaProdutos(pedido_de_compra_id:string,produto: Produto): Promise<Pedido_de_compra> {
        const result = await prisma.pedido_de_compra.update({
            where:{
                pedido_de_compra_id: pedido_de_compra_id
            },
            data:{
                produtos:{
                    connect:[{produto_id:produto.produto_id}]       
                },
                total_a_pagar:{
                    increment:produto.preco
                }
            }
        })

        const atualizaEstoqueVendas = await prisma.produto.update({
            where:{
                produto_id: produto.produto_id
            },
            data:{
                numero_vendas:{
                    increment:1
                },
                qtd_estoque:{
                    decrement:1
                }
            }
        })

        return result
    }

    async removeProdutos(pedido_de_compra_id: string, produto: Produto): Promise<void> {
        
        const result = await prisma.pedido_de_compra.update({
            where:{
                pedido_de_compra_id
            },
            data:{
                produtos:{
                    disconnect:[{produto_id:produto.produto_id}]       
                },
                total_a_pagar:{
                    decrement:produto.preco
                },
            }
        })
    }

    async getPedidoByUserId(usuario_id: string): Promise<Pedido_de_compra | null> {
        const result = await prisma.pedido_de_compra.findFirst({
            where:{
                usuario_id
            },
            include:{
                produtos:true
            }
        })
        return result || null
    }

    async deletePedido(pedido_de_compra_id:string): Promise<void> {
        const result = await prisma.pedido_de_compra.delete({
            where:{
                pedido_de_compra_id
            }
        })
    }

}

export {Pedido_de_compra_RepositoryPrisma}