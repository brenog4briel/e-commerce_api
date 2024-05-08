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
    "pedido_de_compra_id" TEXT,
    "lista_de_desejos_id" TEXT,
    CONSTRAINT "Produto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Produto_pedido_de_compra_id_fkey" FOREIGN KEY ("pedido_de_compra_id") REFERENCES "Pedido_de_compra" ("pedido_de_compra_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_lista_de_desejos_id_fkey" FOREIGN KEY ("lista_de_desejos_id") REFERENCES "Lista_de_desejos" ("lista_de_desejos_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("atualizadoEm", "criadoEm", "lista_de_desejos_id", "nome", "pedido_de_compra_id", "preco", "produto_id", "proprietario", "qtd_estoque", "usuario_id") SELECT "atualizadoEm", "criadoEm", "lista_de_desejos_id", "nome", "pedido_de_compra_id", "preco", "produto_id", "proprietario", "qtd_estoque", "usuario_id" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
