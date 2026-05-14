import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

/* ------------------------------------------------------------------ */
/*  Database path & initialization                                     */
/* ------------------------------------------------------------------ */

const DB_PATH = path.join(process.cwd(), "data", "tracker.db");

const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS runs (
    id           TEXT PRIMARY KEY,
    brand_domain TEXT NOT NULL,
    brand_name   TEXT NOT NULL,
    competitors  TEXT NOT NULL DEFAULT '[]',
    run_date     DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS mention_results (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id            TEXT    NOT NULL,
    keyword           TEXT    NOT NULL,
    platform          TEXT    NOT NULL,
    mentioned         INTEGER NOT NULL DEFAULT 0,
    mention_position  INTEGER,
    ai_response_text  TEXT,
    FOREIGN KEY (run_id) REFERENCES runs(id)
  );
`);

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface RunData {
  id: string;
  brand_domain: string;
  brand_name: string;
  competitors: string[];
}

export interface ResultData {
  run_id: string;
  keyword: string;
  platform: string;
  mentioned: boolean;
  mention_position: number | null;
  ai_response_text: string;
}

export interface ResultRow extends ResultData {
  id: number;
}

/* ------------------------------------------------------------------ */
/*  Prepared Statements                                                */
/* ------------------------------------------------------------------ */

const stmtCreateRun = db.prepare(
  "INSERT INTO runs (id, brand_domain, brand_name, competitors) VALUES (?, ?, ?, ?)"
);

const stmtInsertResult = db.prepare(
  `INSERT INTO mention_results
     (run_id, keyword, platform, mentioned, mention_position, ai_response_text)
   VALUES (?, ?, ?, ?, ?, ?)`
);

const stmtGetResults = db.prepare(
  "SELECT * FROM mention_results WHERE run_id = ?"
);

const stmtGetRun = db.prepare(
  "SELECT * FROM runs WHERE id = ?"
);

/* ------------------------------------------------------------------ */
/*  Exported Functions                                                 */
/* ------------------------------------------------------------------ */

export function createRun(data: RunData): void {
  stmtCreateRun.run(
    data.id,
    data.brand_domain,
    data.brand_name,
    JSON.stringify(data.competitors)
  );
}

export function insertResult(data: ResultData): void {
  stmtInsertResult.run(
    data.run_id,
    data.keyword,
    data.platform,
    data.mentioned ? 1 : 0,
    data.mention_position,
    data.ai_response_text
  );
}

export function getRunResults(runId: string): ResultRow[] {
  const rows = stmtGetResults.all(runId) as Array<{
    id: number;
    run_id: string;
    keyword: string;
    platform: string;
    mentioned: number;
    mention_position: number | null;
    ai_response_text: string;
  }>;
  return rows.map((r) => ({
    id: r.id,
    run_id: r.run_id,
    keyword: r.keyword,
    platform: r.platform,
    mentioned: r.mentioned === 1,
    mention_position: r.mention_position,
    ai_response_text: r.ai_response_text,
  }));
}

export function getRun(runId: string): (RunData & { run_date: string }) | undefined {
  const row = stmtGetRun.get(runId) as {
    id: string;
    brand_domain: string;
    brand_name: string;
    competitors: string;
    run_date: string;
  } | undefined;

  if (!row) return undefined;

  return {
    id: row.id,
    brand_domain: row.brand_domain,
    brand_name: row.brand_name,
    competitors: JSON.parse(row.competitors) as string[],
    run_date: row.run_date,
  };
}

export default db;
