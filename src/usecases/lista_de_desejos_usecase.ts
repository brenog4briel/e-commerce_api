import { Produto, ProdutoData } from "../interfaces/produto.interface";
import { Lista_de_desejos_Prisma } from "../repository/lista_de_desejos_repository";
import { Lista_de_desejos } from "../interfaces/lista_de_desejos.interface";

class Lista_de_desejos_Usecase {
    
    private lista_de_desejos_repository : Lista_de_desejos_Prisma

    constructor() {
        this.lista_de_desejos_repository = new Lista_de_desejos_Prisma()
    }

     async create(usuario_id:string): Promise<Lista_de_desejos> {
        const data = await this.lista_de_desejos_repository.create(usuario_id);
        return data;
    }

     async adicionaProduto(lista_de_desejos_id:string,produto: Produto): Promise<Lista_de_desejos> {
        const data = await this.lista_de_desejos_repository.adicionaProdutos(lista_de_desejos_id,produto);
        return data;
    }

    async removeProduto(lista_de_desejos_id:string,produto:Produto) : Promise<void> {
        const data = await this.lista_de_desejos_repository.removeProduto(lista_de_desejos_id,produto);
        return data;
    }

    async removeAllProducts(lista_de_desejos_id:string) : Promise<void> {
        const data = await this.lista_de_desejos_repository.removeAllProducts(lista_de_desejos_id);
        return data;
    }
    
    async getListByUserId(usuario_id: string): Promise<Lista_de_desejos | null> {
        const data = await this.lista_de_desejos_repository.getListByUserId(usuario_id)
        return data;
    }
}

export {Lista_de_desejos_Usecase}