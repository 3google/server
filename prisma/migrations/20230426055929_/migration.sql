/*
  Warnings:

  - You are about to alter the column `emotion` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(4))`.
  - You are about to alter the column `emotion` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(4))`.
  - You are about to alter the column `emotion` on the `Music` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `emotion` ENUM('HAPPY', 'SADNESS', 'FEAR', 'ANGER', 'LOVE') NOT NULL;

-- AlterTable
ALTER TABLE `Movie` MODIFY `emotion` ENUM('HAPPY', 'SADNESS', 'FEAR', 'ANGER', 'LOVE') NOT NULL;

-- AlterTable
ALTER TABLE `Music` MODIFY `emotion` ENUM('HAPPY', 'SADNESS', 'FEAR', 'ANGER', 'LOVE') NOT NULL;
