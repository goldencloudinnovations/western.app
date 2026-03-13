import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const dataDir = path.join(process.cwd(), "data");
const dbFilePath = path.join(dataDir, "newsletter.sqlite");

let db: Database.Database | null = null;

function getDb() {
  if (db) {
    return db;
  }

  fs.mkdirSync(dataDir, { recursive: true });
  db = new Database(dbFilePath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return db;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function saveSubscriber(email: string) {
  const statement = getDb().prepare(`
    INSERT INTO newsletter_subscribers (email)
    VALUES (?)
    ON CONFLICT(email) DO NOTHING;
  `);

  const result = statement.run(normalizeEmail(email));
  return { inserted: result.changes > 0 };
}

export function getNewsletterDbPath() {
  return dbFilePath;
}
