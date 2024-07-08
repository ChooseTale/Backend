-- DropForeignKey
ALTER TABLE "ChoicePage" DROP CONSTRAINT "ChoicePage_toPageId_fkey";

-- AlterTable
ALTER TABLE "ChoicePage" ALTER COLUMN "toPageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ChoicePage" ADD CONSTRAINT "ChoicePage_toPageId_fkey" FOREIGN KEY ("toPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
