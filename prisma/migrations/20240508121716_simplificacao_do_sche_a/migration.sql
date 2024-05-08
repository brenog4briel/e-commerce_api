/*
  Warnings:

  - You are about to drop the `_Lista_de_desejosToProduto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Pedido_de_compraToProduto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lista_de_desejos_id` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pedido_de_compra_id` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_Lista_de_desejosToProduto_B_index";

-- DropIndex
DROP INDEX "_Lista_de_desejosToProduto_AB_unique";

-- DropIndex
DROP INDEX "_Pedido_de_compraToProduto_B_index";

-- DropIndex
DROP INDEX "_Pedido_de_compraToProduto_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_Lista_de_desejosToProduto";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_Pedido_de_compraToProduto";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "Produto_pedido_de_compra_id_fkey" FOREIGN KEY ("pedido_de_compra_id") REFERENCES "Pedido_de_compra" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Produto_lista_de_desejos_id_fkey" FOREIGN KEY ("lista_de_desejos_id") REFERENCES "Lista_de_desejos" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("atualizadoEm", "criadoEm", "nome", "preco", "produto_id", "proprietario", "qtd_estoque", "usuario_id") SELECT "atualizadoEm", "criadoEm", "nome", "preco", "produto_id", "proprietario", "qtd_estoque", "usuario_id" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
