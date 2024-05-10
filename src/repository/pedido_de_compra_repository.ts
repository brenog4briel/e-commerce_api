import { prisma } from "../database/prisma-client";
import { Pedido_de_compra, Pedido_de_compra_Data, Pedido_de_compra_Repository } from "../interfaces/pedido_de_compra.interface";
import { ProdutoData } from "../interfaces/produto.interface";

class Pedido_de_compra_RepositoryPrisma implements Pedido_de_compra_Repository {
    async create(pedido_de_compra: Pedido_de_compra_Data): Promise<Pedido_de_compra> {
        const result = await prisma.pedido_de_compra.create({
            data:{
                usuario_id: pedido_de_compra.usuario_id,
                total_a_pagar: 0,
                endereco: pedido_de_compra.endereco,
                CEP: pedido_de_compra.CEP,
                desconto: 0,
                produtos: {}
            }


        });
        return result;
    }

    async adicionaProdutos(pedido_de_compra_id:string,produtos: ProdutoData[]): Promise<Pedido_de_compra> {
        const result = await prisma.pedido_de_compra.update({
            where:{
                pedido_de_compra_id: pedido_de_compra_id
            },
            data:{
                produtos:{
                    create:produtos
                },
            },include:
            {produtos:false}
            
        })
        return result;
    }

}

export {Pedido_de_compra_RepositoryPrisma}