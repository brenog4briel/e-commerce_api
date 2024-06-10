/*
  Warnings:

  - You are about to alter the column `imagem` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `imagem` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Produto` MODIFY `imagem` JSON NOT NULL;

-- AlterTable
ALTER TABLE `Usuario` MODIFY `imagem` JSON NOT NULL;
