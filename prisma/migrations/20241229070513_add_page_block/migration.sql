/*
  Warnings:

  - You are about to drop the column `abridgement` on the `Page` table. All the data in the column will be lost.
  - The `content` column on the `Page` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `backgroundImageId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "abridgement",
ADD COLUMN     "backgroundImageId" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "content",
ADD COLUMN     "content" TEXT[];

-- CreateTable
CREATE TABLE "_ImageToPage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToPage_AB_unique" ON "_ImageToPage"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToPage_B_index" ON "_ImageToPage"("B");

-- AddForeignKey
ALTER TABLE "_ImageToPage" ADD CONSTRAINT "_ImageToPage_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToPage" ADD CONSTRAINT "_ImageToPage_B_fkey" FOREIGN KEY ("B") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
