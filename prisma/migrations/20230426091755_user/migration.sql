/*
  Warnings:

  - You are about to drop the column `platform` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `platform_id` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `platform`,
    DROP COLUMN `platform_id`,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `KakaoId` (
    `kakao_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `KakaoId_kakao_id_key`(`kakao_id`),
    PRIMARY KEY (`kakao_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NaverId` (
    `naver_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `NaverId_naver_id_key`(`naver_id`),
    PRIMARY KEY (`naver_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `KakaoId` ADD CONSTRAINT `KakaoId_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NaverId` ADD CONSTRAINT `NaverId_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
