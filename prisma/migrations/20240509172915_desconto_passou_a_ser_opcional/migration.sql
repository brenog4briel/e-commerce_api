-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido_de_compra" (
    "pedido_de_compra_id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero" TEXT NOT NULL,
    "total_a_pagar" REAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "desconto" REAL,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "Pedido_de_compra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedido_de_compra" ("CEP", "data", "desconto", "endereco", "numero", "pedido_de_compra_id", "total_a_pagar", "usuario_id") SELECT "CEP", "data", "desconto", "endereco", "numero", "pedido_de_compra_id", "total_a_pagar", "usuario_id" FROM "Pedido_de_compra";
DROP TABLE "Pedido_de_compra";
ALTER TABLE "new_Pedido_de_compra" RENAME TO "Pedido_de_compra";
CREATE UNIQUE INDEX "Pedido_de_compra_usuario_id_key" ON "Pedido_de_compra"("usuario_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
