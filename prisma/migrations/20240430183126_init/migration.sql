-- CreateTable
CREATE TABLE "usuarios" (
    "usuario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "CEP" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "lista de desejo" (
    "lista_de_desejos_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "lista de desejo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "produtos" (
    "produto_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "qtd_estoque" INTEGER NOT NULL,
    "lista_de_desejo_usuario_id" INTEGER NOT NULL,
    "pedido_de_compra_id" INTEGER NOT NULL,
    CONSTRAINT "produtos_lista_de_desejo_usuario_id_fkey" FOREIGN KEY ("lista_de_desejo_usuario_id") REFERENCES "lista de desejo" ("lista_de_desejos_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produtos_pedido_de_compra_id_fkey" FOREIGN KEY ("pedido_de_compra_id") REFERENCES "pedido de compra" ("pedido_de_compra_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedido de compra" (
    "pedido_de_compra_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "numero" TEXT NOT NULL,
    CONSTRAINT "pedido de compra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "lista de desejo_usuario_id_key" ON "lista de desejo"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_produto_id_key" ON "produtos"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "pedido de compra_usuario_id_key" ON "pedido de compra"("usuario_id");
