/*
  Warnings:

  - You are about to drop the column `created_at` on the `APIKeys` table. All the data in the column will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Suggestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Web` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebDiscord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebGithub` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebNexus` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[key]` on the table `APIKeys` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_webId_fkey";

-- DropForeignKey
ALTER TABLE "WebDiscord" DROP CONSTRAINT "WebDiscord_webId_fkey";

-- DropForeignKey
ALTER TABLE "WebGithub" DROP CONSTRAINT "WebGithub_webId_fkey";

-- DropForeignKey
ALTER TABLE "WebNexus" DROP CONSTRAINT "WebNexus_webId_fkey";

-- AlterTable
ALTER TABLE "APIKeys" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "Quotes" ALTER COLUMN "responder" SET DEFAULT 'everyone';

-- DropTable
DROP TABLE "Roles";

-- DropTable
DROP TABLE "Suggestions";

-- DropTable
DROP TABLE "Web";

-- DropTable
DROP TABLE "WebDiscord";

-- DropTable
DROP TABLE "WebGithub";

-- DropTable
DROP TABLE "WebNexus";

-- CreateTable
CREATE TABLE "LinkedRoles" (
    "id" SERIAL NOT NULL,
    "userv2id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "bool" BOOLEAN,
    "num" INTEGER,
    "date" TIMESTAMP(3),

    CONSTRAINT "LinkedRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebInterface" (
    "id" SERIAL NOT NULL,
    "userv2id" INTEGER NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'default',
    "style" TEXT NOT NULL DEFAULT 'default',
    "country" TEXT,
    "nexusmods" TEXT,
    "nexusmodsVerified" BOOLEAN NOT NULL DEFAULT false,
    "github" TEXT,
    "githubVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WebInterface_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "APIKeys_key_key" ON "APIKeys"("key");

-- AddForeignKey
ALTER TABLE "LinkedRoles" ADD CONSTRAINT "LinkedRoles_userv2id_fkey" FOREIGN KEY ("userv2id") REFERENCES "UserV2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebInterface" ADD CONSTRAINT "WebInterface_userv2id_fkey" FOREIGN KEY ("userv2id") REFERENCES "UserV2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
