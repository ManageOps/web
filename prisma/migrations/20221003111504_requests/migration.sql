-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pronouns" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "talkType" TEXT NOT NULL,
    "talkTopic" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
