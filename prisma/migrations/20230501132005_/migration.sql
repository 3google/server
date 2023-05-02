/*
  Warnings:

  - You are about to alter the column `title` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to drop the column `category_id` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `BookmarkCategory` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `BookmarkCategory` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `BookmarkCategory` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `BookmarkCategory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to drop the column `author_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to alter the column `content` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `title` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `title` on the `Music` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to drop the column `author_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `board_type` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to drop the column `book_id` on the `RecommendContent` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `RecommendContent` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `RecommendContent` table. All the data in the column will be lost.
  - You are about to drop the column `music_id` on the `RecommendContent` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `RecommendContent` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `nickname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the `KakaoId` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NaverId` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `BookmarkCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boardType` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `RecommendContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdmin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Bookmark` DROP FOREIGN KEY `Bookmark_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bookmark` DROP FOREIGN KEY `Bookmark_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `BookmarkCategory` DROP FOREIGN KEY `BookmarkCategory_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `KakaoId` DROP FOREIGN KEY `KakaoId_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `NaverId` DROP FOREIGN KEY `NaverId_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `RecommendContent` DROP FOREIGN KEY `RecommendContent_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `RecommendContent` DROP FOREIGN KEY `RecommendContent_movie_id_fkey`;

-- DropForeignKey
ALTER TABLE `RecommendContent` DROP FOREIGN KEY `RecommendContent_music_id_fkey`;

-- DropForeignKey
ALTER TABLE `RecommendContent` DROP FOREIGN KEY `RecommendContent_post_id_fkey`;

-- AlterTable
ALTER TABLE `Book` MODIFY `title` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Bookmark` DROP COLUMN `category_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `post_id`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `postId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `BookmarkCategory` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `author_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `deleted_at`,
    DROP COLUMN `post_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `postId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `content` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Movie` MODIFY `title` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Music` MODIFY `title` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `author_id`,
    DROP COLUMN `board_type`,
    DROP COLUMN `created_at`,
    DROP COLUMN `deleted_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `boardType` ENUM('PUBLIC', 'PRIVATE', 'RECOMMEND') NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `title` VARCHAR(20) NOT NULL,
    MODIFY `content` VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE `RecommendContent` DROP COLUMN `book_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `movie_id`,
    DROP COLUMN `music_id`,
    DROP COLUMN `post_id`,
    ADD COLUMN `bookId` INTEGER NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `movieId` INTEGER NULL,
    ADD COLUMN `musicId` INTEGER NULL,
    ADD COLUMN `postId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `created_at`,
    DROP COLUMN `deleted_at`,
    DROP COLUMN `is_admin`,
    DROP COLUMN `profile_image`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL,
    ADD COLUMN `platform` ENUM('KAKAO', 'NAVER') NOT NULL,
    ADD COLUMN `profileImage` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `nickname` VARCHAR(10) NOT NULL,
    MODIFY `email` VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE `KakaoId`;

-- DropTable
DROP TABLE `NaverId`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `BookmarkCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookmarkCategory` ADD CONSTRAINT `BookmarkCategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendContent` ADD CONSTRAINT `RecommendContent_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendContent` ADD CONSTRAINT `RecommendContent_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendContent` ADD CONSTRAINT `RecommendContent_musicId_fkey` FOREIGN KEY (`musicId`) REFERENCES `Music`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecommendContent` ADD CONSTRAINT `RecommendContent_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
