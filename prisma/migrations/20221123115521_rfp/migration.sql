-- CreateTable
CREATE TABLE "RequestForPaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pronouns" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "talk_type" TEXT NOT NULL,
    "talk_topic" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL
);
