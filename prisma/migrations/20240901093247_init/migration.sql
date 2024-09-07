/*
  Warnings:

  - The `service` column on the `Connection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[service]` on the table `Connection` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `permission` on the `APIKeys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Service" AS ENUM ('nexusmods', 'github', 'discord');

-- AlterTable
ALTER TABLE "APIKeys" DROP COLUMN "permission",
ADD COLUMN     "permission" BIT NOT NULL;

-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "service",
ADD COLUMN     "service" "Service";

-- CreateIndex
CREATE UNIQUE INDEX "Connection_service_key" ON "Connection"("service");
