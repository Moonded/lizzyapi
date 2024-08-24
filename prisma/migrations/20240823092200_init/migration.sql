/*
  Warnings:

  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL,
ALTER COLUMN "nexusmods" DROP DEFAULT,
ALTER COLUMN "github" DROP DEFAULT,
ALTER COLUMN "description" DROP DEFAULT,
ALTER COLUMN "style" DROP DEFAULT;
