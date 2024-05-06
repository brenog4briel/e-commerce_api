/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Lista_de_desejos_tem_produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pedido_de_compra_tem_produto` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "usuario_id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("CEP", "atualizadoEm", "criadoEm", "email", "endereco", "nome", "senha", "usuario_id") SELECT "CEP", "atualizadoEm", "criadoEm", "email", "endereco", "nome", "senha", "usuario_id" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE TABLE "new_Pedido_de_compra" (
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero" TEXT NOT NULL,
    "total_a_pagar" REAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "desconto" REAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "Pedido_de_compra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedido_de_compra" ("CEP", "data", "desconto", "endereco", "numero", "total_a_pagar", "usuario_id") SELECT "CEP", "data", "desconto", "endereco", "numero", "total_a_pagar", "usuario_id" FROM "Pedido_de_compra";
DROP TABLE "Pedido_de_compra";
ALTER TABLE "new_Pedido_de_compra" RENAME TO "Pedido_de_compra";
CREATE UNIQUE INDEX "Pedido_de_compra_usuario_id_key" ON "Pedido_de_compra"("usuario_id");
CREATE TABLE "new_Lista_de_desejos_tem_produto" (
    "lista_de_desejos_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,

    PRIMARY KEY ("lista_de_desejos_id", "produto_id"),
    CONSTRAINT "Lista_de_desejos_tem_produto_lista_de_desejos_id_fkey" FOREIGN KEY ("lista_de_desejos_id") REFERENCES "Lista_de_desejos" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lista_de_desejos_tem_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lista_de_desejos_tem_produto" ("lista_de_desejos_id", "produto_id") SELECT "lista_de_desejos_id", "produto_id" FROM "Lista_de_desejos_tem_produto";
DROP TABLE "Lista_de_desejos_tem_produto";
ALTER TABLE "new_Lista_de_desejos_tem_produto" RENAME TO "Lista_de_desejos_tem_produto";
CREATE TABLE "new_Lista_de_desejos" (
    "preco_acumulado" REAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "Lista_de_desejos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lista_de_desejos" ("preco_acumulado", "usuario_id") SELECT "preco_acumulado", "usuario_id" FROM "Lista_de_desejos";
DROP TABLE "Lista_de_desejos";
ALTER TABLE "new_Lista_de_desejos" RENAME TO "Lista_de_desejos";
CREATE UNIQUE INDEX "Lista_de_desejos_usuario_id_key" ON "Lista_de_desejos"("usuario_id");
CREATE TABLE "new_Produto" (
    "produto_id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "qtd_estoque" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "Produto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("atualizadoEm", "criadoEm", "nome", "preco", "produto_id", "proprietario", "qtd_estoque", "usuario_id") SELECT "atualizadoEm", "criadoEm", "nome", "preco", "produto_id", "proprietario", "qtd_estoque", "usuario_id" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE TABLE "new_Pedido_de_compra_tem_produto" (
    "pedido_de_compra_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,

    PRIMARY KEY ("pedido_de_compra_id", "produto_id"),
    CONSTRAINT "Pedido_de_compra_tem_produto_pedido_de_compra_id_fkey" FOREIGN KEY ("pedido_de_compra_id") REFERENCES "Pedido_de_compra" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_de_compra_tem_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedido_de_compra_tem_produto" ("pedido_de_compra_id", "produto_id") SELECT "pedido_de_compra_id", "produto_id" FROM "Pedido_de_compra_tem_produto";
DROP TABLE "Pedido_de_compra_tem_produto";
ALTER TABLE "new_Pedido_de_compra_tem_produto" RENAME TO "Pedido_de_compra_tem_produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
