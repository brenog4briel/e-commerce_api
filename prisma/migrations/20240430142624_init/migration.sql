-- CreateTable
CREATE TABLE "Usuario" (
    "usuario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "CEP" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lista_de_desejo" (
    "lista_de_desejos_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Lista_de_desejo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produto" (
    "produto_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "qtd_estoque" INTEGER NOT NULL,
    "lista_de_desejo_usuario_id" INTEGER NOT NULL,
    "pedido_de_compra_id" INTEGER NOT NULL,
    CONSTRAINT "Produto_lista_de_desejo_usuario_id_fkey" FOREIGN KEY ("lista_de_desejo_usuario_id") REFERENCES "Lista_de_desejo" ("lista_de_desejos_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Produto_pedido_de_compra_id_fkey" FOREIGN KEY ("pedido_de_compra_id") REFERENCES "Pedido_de_compra" ("pedido_de_compra_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido_de_compra" (
    "pedido_de_compra_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "numero" TEXT NOT NULL,
    CONSTRAINT "Pedido_de_compra_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Lista_de_desejo_usuario_id_key" ON "Lista_de_desejo"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_produto_id_key" ON "Produto"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_de_compra_usuario_id_key" ON "Pedido_de_compra"("usuario_id");
