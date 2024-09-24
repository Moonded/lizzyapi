/*
  Warnings:

  - You are about to drop the `Github` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Github";

-- DropTable
DROP TABLE "Pass";

-- CreateTable
CREATE TABLE "UserV2" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "maxkeys" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserV2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "serviceid" TEXT,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APIKeys" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "permission" BIT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "APIKeys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_id_fkey" FOREIGN KEY ("id") REFERENCES "UserV2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APIKeys" ADD CONSTRAINT "APIKeys_id_fkey" FOREIGN KEY ("id") REFERENCES "UserV2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
