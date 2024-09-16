/*
  Warnings:

  - You are about to drop the column `userId` on the `UserChoice` table. All the data in the column will be lost.
  - Added the required column `playGameId` to the `UserChoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserChoice" DROP CONSTRAINT "UserChoice_userId_fkey";

-- AlterTable
ALTER TABLE "UserChoice" DROP COLUMN "userId",
ADD COLUMN     "playGameId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PlayGame" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isEnded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PlayGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserChoice" ADD CONSTRAINT "UserChoice_playGameId_fkey" FOREIGN KEY ("playGameId") REFERENCES "PlayGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayGame" ADD CONSTRAINT "PlayGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayGame" ADD CONSTRAINT "PlayGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
