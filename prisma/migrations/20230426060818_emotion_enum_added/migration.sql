/*
  Warnings:

  - The values [HAPPY] on the enum `Book_emotion` will be removed. If these variants are still used in the database, this will fail.
  - The values [HAPPY] on the enum `Book_emotion` will be removed. If these variants are still used in the database, this will fail.
  - The values [HAPPY] on the enum `Book_emotion` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `emotion` ENUM('HAPPINESS', 'SADNESS', 'ANGER', 'FEAR', 'LOVE', 'SURPRISE') NOT NULL;

-- AlterTable
ALTER TABLE `Movie` MODIFY `emotion` ENUM('HAPPINESS', 'SADNESS', 'ANGER', 'FEAR', 'LOVE', 'SURPRISE') NOT NULL;

-- AlterTable
ALTER TABLE `Music` MODIFY `emotion` ENUM('HAPPINESS', 'SADNESS', 'ANGER', 'FEAR', 'LOVE', 'SURPRISE') NOT NULL;
