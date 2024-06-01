-- CreateTable
CREATE TABLE `Usuario` (
    `usuario_id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NOT NULL,
    `CEP` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lista_de_desejos` (
    `lista_de_desejos_id` VARCHAR(191) NOT NULL,
    `preco_acumulado` DOUBLE NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Lista_de_desejos_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`lista_de_desejos_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido_de_compra` (
    `pedido_de_compra_id` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total_a_pagar` DOUBLE NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `CEP` VARCHAR(191) NOT NULL,
    `desconto` DOUBLE NULL,
    `usuario_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pedido_de_compra_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`pedido_de_compra_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `produto_id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `proprietario` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NOT NULL,
    `qtd_estoque` INTEGER NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,
    `usuario_id` VARCHAR(191) NOT NULL,
    `pedido_de_compra_id` VARCHAR(191) NULL,
    `lista_de_desejos_id` VARCHAR(191) NULL,

    PRIMARY KEY (`produto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lista_de_desejos` ADD CONSTRAINT `Lista_de_desejos_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido_de_compra` ADD CONSTRAINT `Pedido_de_compra_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_pedido_de_compra_id_fkey` FOREIGN KEY (`pedido_de_compra_id`) REFERENCES `Pedido_de_compra`(`pedido_de_compra_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_lista_de_desejos_id_fkey` FOREIGN KEY (`lista_de_desejos_id`) REFERENCES `Lista_de_desejos`(`lista_de_desejos_id`) ON DELETE SET NULL ON UPDATE CASCADE;
