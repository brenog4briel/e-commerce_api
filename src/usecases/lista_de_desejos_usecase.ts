import { ProdutoData } from "../interfaces/produto.interface";
import { Lista_de_desejos_Prisma } from "../repository/lista_de_desejos_repository";
import { Lista_de_desejos, Lista_de_desejos_Data } from "../interfaces/lista_de_desejos.interface";

class Lista_de_desejos_Usecase {
    
    private lista_de_desejos_repository : Lista_de_desejos_Prisma

    constructor() {
        this.lista_de_desejos_repository = new Lista_de_desejos_Prisma()
    }

     async create(lista_de_desejos: Lista_de_desejos_Data): Promise<Lista_de_desejos> {
        const data = await this.lista_de_desejos_repository.create(lista_de_desejos);
        return data;
    }

     async adicionaProduto(lista_de_desejos_id:string,produtos: ProdutoData[]): Promise<Lista_de_desejos> {
        const data = await this.lista_de_desejos_repository.adicionaProdutos(lista_de_desejos_id,produtos);
        return data;
    }
}

export {Lista_de_desejos_Usecase}