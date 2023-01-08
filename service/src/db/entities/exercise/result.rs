use crate::helper::prelude::*;
use crate::schema::exercise_results;
use diesel::prelude::*;

use super::prelude::*;

pub fn add_new_exercise_result(
    connection: &SqliteConnection,
    exercise_id: i32,
    is_correct: i32,
    current_stars: i64,
    earned_stars: i64,
) {
    let _result = diesel::insert_into(exercise_results::table)
        .values(&NewExerciseResult::new(
            exercise_id,
            is_correct,
            current_stars,
            earned_stars,
        ))
        .execute(connection);
}

pub fn get_exercise_result(connection: &SqliteConnection, timestamp: i64) -> Vec<ExerciseResult> {
    let from = from_day_start(timestamp);
    let to = to_day_end(timestamp);

    let result = exercise_results::table
        .filter(exercise_results::record_timestamp.between(from, to))
        .load::<ExerciseResult>(connection);

    match result {
        Ok(r) => r.clone(),
        Err(_) => Vec::new(),
    }
}
