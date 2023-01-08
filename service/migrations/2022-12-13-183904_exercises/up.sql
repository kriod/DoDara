CREATE TABLE exercises(
  id INTEGER NOT NULL PRIMARY KEY,
  uuid TEXT NOT NULL,
  question TEXT NOT NULL,
  question_raw TEXT NOT NULL,
  solution_id TEXT NOT NULL,
  solution_value TEXT NOT NULL,
  record_timestamp BigInt NOT NULL
)