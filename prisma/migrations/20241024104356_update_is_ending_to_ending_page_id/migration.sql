/*
  Warnings:

  - You are about to drop the column `isEnded` on the `PlayGame` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayGame" DROP COLUMN "isEnded",
ADD COLUMN     "endingPageId" INTEGER;

-- AddForeignKey
ALTER TABLE "PlayGame" ADD CONSTRAINT "PlayGame_endingPageId_fkey" FOREIGN KEY ("endingPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
