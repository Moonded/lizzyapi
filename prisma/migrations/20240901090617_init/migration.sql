/*
  Warnings:

  - Added the required column `name` to the `APIKeys` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `permission` on the `APIKeys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "APIKeys" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "permission",
ADD COLUMN     "permission" BIT NOT NULL;
