-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_book_id_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "book_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE SET NULL ON UPDATE CASCADE;
