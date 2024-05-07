/*
  Warnings:

  - You are about to drop the `Lista_de_desejos_tem_produto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pedido_de_compra_tem_produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lista_de_desejos_tem_produto";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pedido_de_compra_tem_produto";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_Lista_de_desejosToProduto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Lista_de_desejosToProduto_A_fkey" FOREIGN KEY ("A") REFERENCES "Lista_de_desejos" ("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Lista_de_desejosToProduto_B_fkey" FOREIGN KEY ("B") REFERENCES "Produto" ("produto_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Pedido_de_compraToProduto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Pedido_de_compraToProduto_A_fkey" FOREIGN KEY ("A") REFERENCES "Pedido_de_compra" ("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Pedido_de_compraToProduto_B_fkey" FOREIGN KEY ("B") REFERENCES "Produto" ("produto_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lista_de_desejos" (
    "preco_acumulado" REAL NOT NULL,
    "usuario_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Lista_de_desejos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lista_de_desejos" ("preco_acumulado", "usuario_id") SELECT "preco_acumulado", "usuario_id" FROM "Lista_de_desejos";
DROP TABLE "Lista_de_desejos";
ALTER TABLE "new_Lista_de_desejos" RENAME TO "Lista_de_desejos";
CREATE UNIQUE INDEX "Lista_de_desejos_usuario_id_key" ON "Lista_de_desejos"("usuario_id");
CREATE TABLE "new_Pedido_de_compra" (
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero" TEXT NOT NULL,
    "total_a_pagar" REAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "desconto" REAL NOT NULL,
    "usuario_id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Pedido_de_compra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedido_de_compra" ("CEP", "data", "desconto", "endereco", "numero", "total_a_pagar", "usuario_id") SELECT "CEP", "data", "desconto", "endereco", "numero", "total_a_pagar", "usuario_id" FROM "Pedido_de_compra";
DROP TABLE "Pedido_de_compra";
ALTER TABLE "new_Pedido_de_compra" RENAME TO "Pedido_de_compra";
CREATE UNIQUE INDEX "Pedido_de_compra_usuario_id_key" ON "Pedido_de_compra"("usuario_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_Lista_de_desejosToProduto_AB_unique" ON "_Lista_de_desejosToProduto"("A", "B");

-- CreateIndex
CREATE INDEX "_Lista_de_desejosToProduto_B_index" ON "_Lista_de_desejosToProduto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Pedido_de_compraToProduto_AB_unique" ON "_Pedido_de_compraToProduto"("A", "B");

-- CreateIndex
CREATE INDEX "_Pedido_de_compraToProduto_B_index" ON "_Pedido_de_compraToProduto"("B");
