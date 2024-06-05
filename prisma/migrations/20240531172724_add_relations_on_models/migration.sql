/*
  Warnings:

  - Added the required column `user_id` to the `borrowings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "borrowings" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_BookToBorrowing" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToBorrowing_AB_unique" ON "_BookToBorrowing"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToBorrowing_B_index" ON "_BookToBorrowing"("B");

-- AddForeignKey
ALTER TABLE "borrowings" ADD CONSTRAINT "borrowings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBorrowing" ADD CONSTRAINT "_BookToBorrowing_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBorrowing" ADD CONSTRAINT "_BookToBorrowing_B_fkey" FOREIGN KEY ("B") REFERENCES "borrowings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
