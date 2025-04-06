-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_thumbnailId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "thumbnailId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
