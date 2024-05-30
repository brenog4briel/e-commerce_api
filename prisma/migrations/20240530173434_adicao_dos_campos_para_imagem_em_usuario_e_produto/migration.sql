/*
  Warnings:

  - Added the required column `imagem` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produto` ADD COLUMN `imagem` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `imagem` VARCHAR(191) NOT NULL;
