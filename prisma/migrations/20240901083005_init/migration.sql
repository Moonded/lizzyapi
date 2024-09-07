/*
  Warnings:

  - Changed the type of `permission` on the `APIKeys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "APIKeys" DROP COLUMN "permission",
ADD COLUMN     "permission" BIT NOT NULL;

-- CreateTable
CREATE TABLE "Pass" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "discord" TEXT,
    "token" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "jwt" TEXT NOT NULL,

    CONSTRAINT "Pass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Github" (
    "id" TEXT NOT NULL,
    "red4ext" JSONB NOT NULL,
    "archivexl" JSONB NOT NULL,
    "tweakxl" JSONB NOT NULL,
    "codeware" JSONB NOT NULL,
    "cet" JSONB NOT NULL,
    "redscript" JSONB NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastupdatemanuel" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Github_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Web" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Web_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "guildid" TEXT NOT NULL,
    "permissions" TEXT NOT NULL,
    "webId" INTEGER,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebDiscord" (
    "id" SERIAL NOT NULL,
    "did" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "global_name" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "isGuild" BOOLEAN NOT NULL,
    "isDevGuild" BOOLEAN NOT NULL DEFAULT false,
    "webId" INTEGER,

    CONSTRAINT "WebDiscord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebNexus" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "webId" INTEGER,

    CONSTRAINT "WebNexus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebGithub" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "webId" INTEGER,

    CONSTRAINT "WebGithub_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pass_username_key" ON "Pass"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Pass_discord_key" ON "Pass"("discord");

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_webId_fkey" FOREIGN KEY ("webId") REFERENCES "Web"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebDiscord" ADD CONSTRAINT "WebDiscord_webId_fkey" FOREIGN KEY ("webId") REFERENCES "Web"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebNexus" ADD CONSTRAINT "WebNexus_webId_fkey" FOREIGN KEY ("webId") REFERENCES "Web"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebGithub" ADD CONSTRAINT "WebGithub_webId_fkey" FOREIGN KEY ("webId") REFERENCES "Web"("id") ON DELETE SET NULL ON UPDATE CASCADE;
