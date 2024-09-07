-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "permission" BIGINT NOT NULL,
    "route" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);
