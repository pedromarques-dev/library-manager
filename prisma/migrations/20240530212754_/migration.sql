/*
  Warnings:

  - You are about to drop the column `isAvaliable` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "isAvaliable",
ADD COLUMN     "is_avaliable" BOOLEAN NOT NULL DEFAULT true;
