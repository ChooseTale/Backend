/*
  Warnings:

  - You are about to drop the column `content` on the `Page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "content",
ADD COLUMN     "contents" JSONB[];
