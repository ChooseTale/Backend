-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "isStarting" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isEnding" SET DEFAULT false;
