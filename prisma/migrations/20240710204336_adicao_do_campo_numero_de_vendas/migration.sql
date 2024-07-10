/*
  Warnings:

  - Added the required column `numero_vendas` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Produto` ADD COLUMN `historico_de_compras_id` VARCHAR(191) NULL,
    ADD COLUMN `numero_vendas` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Historico_de_compras` (
    `historico_de_compras_id` VARCHAR(191) NOT NULL,
    `total_de_aquisicoes` INTEGER NOT NULL,
    `preco_total_gasto` DOUBLE NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Historico_de_compras_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`historico_de_compras_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Historico_de_compras` ADD CONSTRAINT `Historico_de_compras_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_historico_de_compras_id_fkey` FOREIGN KEY (`historico_de_compras_id`) REFERENCES `Historico_de_compras`(`historico_de_compras_id`) ON DELETE SET NULL ON UPDATE CASCADE;
