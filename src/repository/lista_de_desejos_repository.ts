import { prisma } from "../database/prisma-client";
import { Lista_de_desejos, Lista_de_desejos_Data, Lista_de_desejos_Repository } from "../interfaces/lista_de_desejos.interface";
import { Pedido_de_compra, Pedido_de_compra_Data } from "../interfaces/pedido_de_compra.interface";
import { ProdutoData } from "../interfaces/produto.interface";

class Lista_de_desejos_Prisma implements Lista_de_desejos_Repository {
    async create(lista_de_desejos: Lista_de_desejos_Data): Promise<Lista_de_desejos> {
        const result = await prisma.lista_de_desejos.create({
            data:{
                usuario_id: lista_de_desejos.usuario_id,
                preco_acumulado: 0,
                produtos: {}
            }


        });
        return result;
    }

    async adicionaProdutos(lista_de_desejos_id:string,produtos: ProdutoData[]): Promise<Lista_de_desejos> {
        const result = await prisma.lista_de_desejos.update({
            where:{
                lista_de_desejos_id: lista_de_desejos_id
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

export {Lista_de_desejos_Prisma}