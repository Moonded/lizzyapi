-- CreateTable
CREATE TABLE "DiscordAuth" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_at" INTEGER NOT NULL,

    CONSTRAINT "DiscordAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordAuth_userid_key" ON "DiscordAuth"("userid");
