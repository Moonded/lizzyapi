/*
  Warnings:

  - Changed the type of `permission` on the `APIKeys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "APIKeys" DROP COLUMN "permission",
ADD COLUMN     "permission" BIGINT NOT NULL;
