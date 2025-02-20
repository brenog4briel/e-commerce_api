import { Pedido_de_compra } from "@prisma/client";
import { Pedido_de_compra_RepositoryPrisma } from "../repository/pedido_de_compra_repository";
import { Produto } from "../interfaces/produto.interface";
import { Usuario } from "../interfaces/usuario.interface";

class Pedido_de_compra_UseCase {
    
    private pedido_de_compra_repository : Pedido_de_compra_RepositoryPrisma

    constructor() {
        this.pedido_de_compra_repository = new Pedido_de_compra_RepositoryPrisma()
    }

     async create(usuario: Usuario): Promise<Pedido_de_compra> {
        const data = await this.pedido_de_compra_repository.create(usuario);
        return data;
    }

     async adicionaProduto(pedido_de_compra_id:string,produto: Produto): Promise<Pedido_de_compra | null> {
        const data = await this.pedido_de_compra_repository.adicionaProdutos(pedido_de_compra_id,produto);
        return data;
    }

    async removeProduto(pedido_de_compra_id:string,produto: Produto): Promise<void> {
        const data = await this.pedido_de_compra_repository.removeProdutos(pedido_de_compra_id,produto);
        return data;
    }

    async deletePedido(pedido_de_compra_id:string): Promise<void> {
        const data = await this.pedido_de_compra_repository.deletePedido(pedido_de_compra_id);
        return data;
    }

    async getPedidoByUserId(usuario_id: string): Promise<Pedido_de_compra | null> {
        const data = await this.pedido_de_compra_repository.getPedidoByUserId(usuario_id)
        return data;
    }
}

export {Pedido_de_compra_UseCase}