-- DropForeignKey
ALTER TABLE `Produto` DROP FOREIGN KEY `Produto_lista_de_desejos_id_fkey`;

-- DropForeignKey
ALTER TABLE `Produto` DROP FOREIGN KEY `Produto_pedido_de_compra_id_fkey`;

-- AlterTable
ALTER TABLE `Produto` MODIFY `pedido_de_compra_id` VARCHAR(191) NULL,
    MODIFY `lista_de_desejos_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_pedido_de_compra_id_fkey` FOREIGN KEY (`pedido_de_compra_id`) REFERENCES `Pedido_de_compra`(`pedido_de_compra_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_lista_de_desejos_id_fkey` FOREIGN KEY (`lista_de_desejos_id`) REFERENCES `Lista_de_desejos`(`lista_de_desejos_id`) ON DELETE SET NULL ON UPDATE CASCADE;
