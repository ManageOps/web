-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RequestForPaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pronouns" TEXT,
    "email" TEXT NOT NULL,
    "talk_type" TEXT,
    "talk_topic" TEXT,
    "consent" BOOLEAN NOT NULL
);
INSERT INTO "new_RequestForPaper" ("consent", "email", "id", "name", "pronouns", "talk_topic", "talk_type") SELECT "consent", "email", "id", "name", "pronouns", "talk_topic", "talk_type" FROM "RequestForPaper";
DROP TABLE "RequestForPaper";
ALTER TABLE "new_RequestForPaper" RENAME TO "RequestForPaper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
