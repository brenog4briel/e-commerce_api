import { Produto } from "../interfaces/produto.interface";
import { Historico_de_compras_Prisma } from "../repository/historico_de_compras";
import { Historico_de_compras } from "../interfaces/historico_de_compras";
class Historico_de_compras_Usecase {
    
    private historico_de_compras_repository : Historico_de_compras_Prisma

    constructor() {
        this.historico_de_compras_repository = new Historico_de_compras_Prisma()
    }

     async create(usuario_id:string): Promise<Historico_de_compras> {
        const data = await this.historico_de_compras_repository.create(usuario_id);
        return data;
    }

     async adicionaProduto(historico_de_compras_id:string,produto: Produto): Promise<Historico_de_compras> {
        const data = await this.historico_de_compras_repository.adicionaProdutos(historico_de_compras_id,produto);
        return data;
    }

    async getListByUserId(usuario_id: string): Promise<Historico_de_compras | null> {
        const data = await this.historico_de_compras_repository.getListByUserId(usuario_id)
        return data;
    }
}

export {Historico_de_compras_Usecase}
