import { Pedido_de_compra } from "@prisma/client";
import { Pedido_de_compra_RepositoryPrisma } from "../repository/pedido_de_compra_repository";
import { Pedido_de_compra_Data } from "../interfaces/pedido_de_compra.interface";
import { ProdutoData } from "../interfaces/produto.interface";

class Pedido_de_compra_UseCase {
    
    private pedido_de_compra_repository : Pedido_de_compra_RepositoryPrisma

    constructor() {
        this.pedido_de_compra_repository = new Pedido_de_compra_RepositoryPrisma()
    }

     async create(pedido_de_compra: Pedido_de_compra_Data): Promise<Pedido_de_compra> {
        const data = await this.pedido_de_compra_repository.create(pedido_de_compra);
        return data;
    }

     async adicionaProduto(pedido_de_compra_id:string,produtos: ProdutoData[]): Promise<Pedido_de_compra> {
        const data = await this.pedido_de_compra_repository.adicionaProdutos(pedido_de_compra_id,produtos);
        return data;
    }
}

export {Pedido_de_compra_UseCase}