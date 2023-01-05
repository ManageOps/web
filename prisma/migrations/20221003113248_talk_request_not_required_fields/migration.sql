-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TalkRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pronouns" TEXT,
    "email" TEXT NOT NULL,
    "talkType" TEXT,
    "talkTopic" TEXT,
    "consent" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_TalkRequest" ("consent", "createdAt", "email", "id", "name", "pronouns", "talkTopic", "talkType", "updatedAt") SELECT "consent", "createdAt", "email", "id", "name", "pronouns", "talkTopic", "talkType", "updatedAt" FROM "TalkRequest";
DROP TABLE "TalkRequest";
ALTER TABLE "new_TalkRequest" RENAME TO "TalkRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
