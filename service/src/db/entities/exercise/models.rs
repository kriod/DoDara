use crate::helper::prelude::*;
use crate::schema::*;

#[derive(Debug, Queryable, Insertable, PartialEq, Clone)]
#[table_name = "exercises"]
pub struct Exercise {
    pub id: i32,
    pub uuid: String,
    pub question: String,
    pub question_raw: String,
    pub solution_id: String,
    pub solution_value: String,
    pub record_timestamp: i64,
}

impl Default for Exercise {
    fn default() -> Self {
        Exercise {
            id: 0,
            uuid: create_uuid(),
            question: "".to_string(),
            question_raw: "".to_string(),
            solution_id: "".to_string(),
            solution_value: "".to_string(),
            record_timestamp: time_now(),
        }
    }
}

#[derive(Insertable, PartialEq, Debug, Clone)]
#[table_name = "exercises"]
pub struct NewExercise {
    pub uuid: String,
    pub question: String,
    pub question_raw: String,
    pub solution_id: String,
    pub solution_value: String,
    pub record_timestamp: i64,
}

impl NewExercise {
    pub fn new(
        uuid: String,
        question: String,
        question_raw: String,
        solution_uuid: String,
        solution_value: String,
    ) -> Self {
        NewExercise {
            uuid,
            question,
            question_raw,
            solution_id: solution_uuid,
            solution_value,
            record_timestamp: time_now(),
        }
    }
}

#[derive(Identifiable, Queryable, Debug, Clone, PartialEq, AsChangeset)]
#[table_name = "exercise_results"]
pub struct ExerciseResult {
    pub id: i32,
    pub uuid: String,
    pub exercise_id: i32,
    pub is_correct: i32,
    pub current_stars: String,
    pub earned_stars: String,
    pub total_stars: String,
    pub record_timestamp: i64,
}

#[derive(Queryable, Insertable, PartialEq, Clone)]
#[table_name = "exercise_results"]
pub struct NewExerciseResult {
    pub uuid: String,
    pub exercise_id: i32,
    pub is_correct: i32,
    pub current_stars: String,
    pub earned_stars: String,
    pub total_stars: String,
    pub record_timestamp: i64,
}

impl NewExerciseResult {
    pub fn new(exercise_id: i32, is_correct: i32, current_stars: i64, earned_stars: i64) -> Self {
        NewExerciseResult {
            uuid: create_uuid(),
            exercise_id,
            is_correct,
            current_stars: current_stars.to_string(),
            earned_stars: earned_stars.to_string(),
            total_stars: (earned_stars + current_stars).to_string(),
            record_timestamp: time_now(),
        }
    }
}
