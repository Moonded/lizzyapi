/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `UserV2` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `permission` on the `APIKeys` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "APIKeys" DROP COLUMN "permission",
ADD COLUMN     "permission" BIT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserV2_username_key" ON "UserV2"("username");
