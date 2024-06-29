/*
  Warnings:

  - Made the column `pedido_de_compra_id` on table `Produto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lista_de_desejos_id` on table `Produto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Produto` DROP FOREIGN KEY `Produto_lista_de_desejos_id_fkey`;

-- DropForeignKey
ALTER TABLE `Produto` DROP FOREIGN KEY `Produto_pedido_de_compra_id_fkey`;

-- AlterTable
ALTER TABLE `Produto` MODIFY `pedido_de_compra_id` VARCHAR(191) NOT NULL,
    MODIFY `lista_de_desejos_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_pedido_de_compra_id_fkey` FOREIGN KEY (`pedido_de_compra_id`) REFERENCES `Pedido_de_compra`(`pedido_de_compra_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_lista_de_desejos_id_fkey` FOREIGN KEY (`lista_de_desejos_id`) REFERENCES `Lista_de_desejos`(`lista_de_desejos_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
