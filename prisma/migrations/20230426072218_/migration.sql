/*
  Warnings:

  - You are about to alter the column `emotion` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `emotion` ENUM('HAPPINESS', 'SADNESS', 'ANGER', 'FEAR', 'LOVE', 'SURPRISE') NOT NULL;
