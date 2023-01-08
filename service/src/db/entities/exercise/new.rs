use crate::schema::exercises;
use diesel::prelude::*;

use super::prelude::*;

pub fn add_new_exercise(
    connection: &SqliteConnection,
    uuid: String,
    question: String,
    question_raw: String,
    solution_uuid: String,
    solution_value: String,
) {
    let _result = diesel::insert_into(exercises::table)
        .values(&NewExercise::new(
            uuid,
            question,
            question_raw,
            solution_uuid,
            solution_value,
        ))
        .execute(connection);
}

pub fn get_exercise_by_uuid(connection: &SqliteConnection, uuid: &String) -> Exercise {
    let result = exercises::table
        .filter(exercises::dsl::uuid.eq(uuid))
        .get_result(connection);

    result.unwrap_or_default()
}

pub fn get_exercise_by_id(connection: &SqliteConnection, id: &i32) -> Exercise {
    let result = exercises::table
        .filter(exercises::dsl::id.eq(id))
        .get_result(connection);

    result.unwrap_or_default()
}
