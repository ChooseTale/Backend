/*
  Warnings:

  - Added the required column `isEnding` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "isEnding" BOOLEAN NOT NULL;
