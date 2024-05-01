-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "qtd_estoque" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pedido_de_compra_tem_produto" (
    "produto_id" INTEGER NOT NULL,
    "pedido_de_compra_id" INTEGER NOT NULL,

    PRIMARY KEY ("produto_id", "pedido_de_compra_id"),
    CONSTRAINT "Pedido_de_compra_tem_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_de_compra_tem_produto_pedido_de_compra_id_fkey" FOREIGN KEY ("pedido_de_compra_id") REFERENCES "Pedido_de_compra" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lista_de_desejos_tem_produto" (
    "produto_id" INTEGER NOT NULL,
    "lista_de_desejos_id" INTEGER NOT NULL,

    PRIMARY KEY ("produto_id", "lista_de_desejos_id"),
    CONSTRAINT "Lista_de_desejos_tem_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lista_de_desejos_tem_produto_lista_de_desejos_id_fkey" FOREIGN KEY ("lista_de_desejos_id") REFERENCES "Lista_de_desejos" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
