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
