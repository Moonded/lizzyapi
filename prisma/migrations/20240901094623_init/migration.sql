/*
  Warnings:

  - Added the required column `userv2id` to the `APIKeys` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `permission` on the `APIKeys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userv2id` to the `Connection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "APIKeys" DROP CONSTRAINT "APIKeys_id_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_id_fkey";

-- AlterTable
ALTER TABLE "APIKeys" ADD COLUMN     "userv2id" INTEGER NOT NULL,
DROP COLUMN "permission",
ADD COLUMN     "permission" BIT NOT NULL;

-- AlterTable
ALTER TABLE "Connection" ADD COLUMN     "userv2id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userv2id_fkey" FOREIGN KEY ("userv2id") REFERENCES "UserV2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "APIKeys" ADD CONSTRAINT "APIKeys_userv2id_fkey" FOREIGN KEY ("userv2id") REFERENCES "UserV2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
