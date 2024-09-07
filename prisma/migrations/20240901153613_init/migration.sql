/*
  Warnings:

  - A unique constraint covering the columns `[permission]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Permissions_permission_key" ON "Permissions"("permission");
