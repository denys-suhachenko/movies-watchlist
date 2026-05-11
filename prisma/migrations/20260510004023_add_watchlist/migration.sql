/*
  Warnings:

  - You are about to drop the column `movie` on the `Watchlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Watchlist_movie_key";

-- AlterTable
ALTER TABLE "Watchlist" DROP COLUMN "movie";

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_movieId_key" ON "Watchlist"("userId", "movieId");
