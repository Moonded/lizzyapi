/*
  Warnings:

  - A unique constraint covering the columns `[discord]` on the table `Pass` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pass_discord_key" ON "Pass"("discord");
