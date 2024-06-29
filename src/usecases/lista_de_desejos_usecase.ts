import { ProdutoData } from "../interfaces/produto.interface";
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

     async adicionaProduto(lista_de_desejos_id:string,produto: ProdutoData): Promise<Lista_de_desejos> {
        const data = await this.lista_de_desejos_repository.adicionaProdutos(lista_de_desejos_id,produto);
        return data;
    }

    async removeProduto(lista_de_desejos_id:string,produto_id:string) : Promise<Lista_de_desejos> {
        const data = await this.lista_de_desejos_repository.removeProduto(lista_de_desejos_id,produto_id);
        return data;
    }
}

export {Lista_de_desejos_Usecase}