/*
  Warnings:

  - The primary key for the `Pedido_de_compra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Lista_de_desejos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `pedido_de_compra_id` was added to the `Pedido_de_compra` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `lista_de_desejos_id` was added to the `Lista_de_desejos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido_de_compra" (
    "pedido_de_compra_id" TEXT NOT NULL PRIMARY KEY,
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
CREATE TABLE "new_Produto" (
    "produto_id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "qtd_estoque" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "pedido_de_compra_id" TEXT NOT NULL,
    "lista_de_desejos_id" TEXT NOT NULL,
    CONSTRAINT "Produto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Produto_pedido_de_compra_id_fkey" FOREIGN KEY ("pedido_de_compra_id") REFERENCES "Pedido_de_compra" ("pedido_de_compra_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Produto_lista_de_desejos_id_fkey" FOREIGN KEY ("lista_de_desejos_id") REFERENCES "Lista_de_desejos" ("lista_de_desejos_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("atualizadoEm", "criadoEm", "lista_de_desejos_id", "nome", "pedido_de_compra_id", "preco", "produto_id", "proprietario", "qtd_estoque", "usuario_id") SELECT "atualizadoEm", "criadoEm", "lista_de_desejos_id", "nome", "pedido_de_compra_id", "preco", "produto_id", "proprietario", "qtd_estoque", "usuario_id" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE UNIQUE INDEX "Produto_pedido_de_compra_id_key" ON "Produto"("pedido_de_compra_id");
CREATE UNIQUE INDEX "Produto_lista_de_desejos_id_key" ON "Produto"("lista_de_desejos_id");
CREATE TABLE "new_Lista_de_desejos" (
    "lista_de_desejos_id" TEXT NOT NULL PRIMARY KEY,
    "preco_acumulado" REAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "Lista_de_desejos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lista_de_desejos" ("preco_acumulado", "usuario_id") SELECT "preco_acumulado", "usuario_id" FROM "Lista_de_desejos";
DROP TABLE "Lista_de_desejos";
ALTER TABLE "new_Lista_de_desejos" RENAME TO "Lista_de_desejos";
CREATE UNIQUE INDEX "Lista_de_desejos_usuario_id_key" ON "Lista_de_desejos"("usuario_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
