-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
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
    CONSTRAINT "Pedido_de_compra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lista_de_desejos" (
    "preco_acumulado" REAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Lista_de_desejos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_de_compra_usuario_id_key" ON "Pedido_de_compra"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Lista_de_desejos_usuario_id_key" ON "Lista_de_desejos"("usuario_id");
