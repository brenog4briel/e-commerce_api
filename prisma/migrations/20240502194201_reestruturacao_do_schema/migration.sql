-- CreateTable
CREATE TABLE "Usuario" (
    "usuario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Lista_de_desejos" (
    "preco_acumulado" REAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Lista_de_desejos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lista_de_desejos_tem_produto" (
    "lista_de_desejos_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,

    PRIMARY KEY ("lista_de_desejos_id", "produto_id"),
    CONSTRAINT "Lista_de_desejos_tem_produto_lista_de_desejos_id_fkey" FOREIGN KEY ("lista_de_desejos_id") REFERENCES "Lista_de_desejos" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lista_de_desejos_tem_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido_de_compra" (
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero" TEXT NOT NULL,
    "total_a_pagar" REAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "desconto" REAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Pedido_de_compra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido_de_compra_tem_produto" (
    "pedido_de_compra_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,

    PRIMARY KEY ("pedido_de_compra_id", "produto_id"),
    CONSTRAINT "Pedido_de_compra_tem_produto_pedido_de_compra_id_fkey" FOREIGN KEY ("pedido_de_compra_id") REFERENCES "Pedido_de_compra" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_de_compra_tem_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produto" (
    "produto_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "qtd_estoque" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario_tem_produto" (
    "usuario_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,

    PRIMARY KEY ("usuario_id", "produto_id"),
    CONSTRAINT "Usuario_tem_produto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_tem_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Lista_de_desejos_usuario_id_key" ON "Lista_de_desejos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_de_compra_usuario_id_key" ON "Pedido_de_compra"("usuario_id");
