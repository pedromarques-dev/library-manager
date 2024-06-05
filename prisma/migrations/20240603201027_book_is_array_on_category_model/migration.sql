/*
  Warnings:

  - You are about to drop the column `book_id` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_book_id_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "book_id";

-- CreateTable
CREATE TABLE "_BookToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToCategory_AB_unique" ON "_BookToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToCategory_B_index" ON "_BookToCategory"("B");

-- AddForeignKey
ALTER TABLE "_BookToCategory" ADD CONSTRAINT "_BookToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCategory" ADD CONSTRAINT "_BookToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
