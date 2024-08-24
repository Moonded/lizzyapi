-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "nexusmods" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'default',
    "description" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestions" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trivia" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trivia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotes" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "responder" TEXT NOT NULL,

    CONSTRAINT "Quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pass" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "jwt" TEXT NOT NULL,

    CONSTRAINT "Pass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userid_key" ON "User"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Pass_username_key" ON "Pass"("username");

