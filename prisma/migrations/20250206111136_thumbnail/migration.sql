/*
  Warnings:

  - Made the column `thumbnailId` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_thumbnailId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "thumbnailId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
