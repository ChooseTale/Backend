/*
  Warnings:

  - Made the column `lastPlayedAt` on table `PlayGame` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PlayGame" ALTER COLUMN "lastPlayedAt" SET NOT NULL;
