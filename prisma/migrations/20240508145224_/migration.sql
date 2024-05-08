/*
  Warnings:

  - A unique constraint covering the columns `[lista_de_desejos_id]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Produto_lista_de_desejos_id_key" ON "Produto"("lista_de_desejos_id");
