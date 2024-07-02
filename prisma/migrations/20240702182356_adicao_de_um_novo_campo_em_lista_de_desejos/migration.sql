/*
  Warnings:

  - Added the required column `total_de_produtos` to the `Lista_de_desejos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Lista_de_desejos` ADD COLUMN `total_de_produtos` INTEGER NOT NULL;
