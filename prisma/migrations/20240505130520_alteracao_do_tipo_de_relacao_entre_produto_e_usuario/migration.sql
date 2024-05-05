/*
  Warnings:

  - You are about to drop the `Usuario_tem_produto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `usuario_id` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuario_tem_produto";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "produto_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "qtd_estoque" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Produto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("atualizadoEm", "criadoEm", "nome", "preco", "produto_id", "proprietario", "qtd_estoque") SELECT "atualizadoEm", "criadoEm", "nome", "preco", "produto_id", "proprietario", "qtd_estoque" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE UNIQUE INDEX "Produto_usuario_id_key" ON "Produto"("usuario_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
