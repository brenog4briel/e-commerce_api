/*
  Warnings:

  - A unique constraint covering the columns `[produto_id]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Produto_produto_id_key` ON `Produto`(`produto_id`);
