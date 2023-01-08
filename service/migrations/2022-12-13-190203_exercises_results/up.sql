CREATE TABLE exercise_results(
    id INTEGER NOT NULL PRIMARY KEY,
    uuid TEXT NOT NULL, 
    exercise_id INTEGER NOT NULL,
    is_correct INTEGER NOT NULL,
    current_stars TEXT NOT NULL,
    earned_stars TEXT NOT NULL,
    total_stars TEXT NOT NULL,
    record_timestamp BigInt NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
)