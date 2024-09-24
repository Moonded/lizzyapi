/*
  Warnings:

  - Changed the type of `permission` on the `APIKeys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `service` on table `Connection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "APIKeys" DROP COLUMN "permission",
ADD COLUMN     "permission" BIT NOT NULL;

-- AlterTable
ALTER TABLE "Connection" ALTER COLUMN "service" SET NOT NULL,
ALTER COLUMN "service" SET DEFAULT 'discord';
