/*
  Warnings:

  - You are about to drop the `_BookToBorrowing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `book_id` to the `borrowings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookToBorrowing" DROP CONSTRAINT "_BookToBorrowing_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBorrowing" DROP CONSTRAINT "_BookToBorrowing_B_fkey";

-- AlterTable
ALTER TABLE "borrowings" ADD COLUMN     "book_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BookToBorrowing";

-- AddForeignKey
ALTER TABLE "borrowings" ADD CONSTRAINT "borrowings_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
