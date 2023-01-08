// @generated automatically by Diesel CLI.

diesel::table! {
    exercise_results (id) {
        id -> Integer,
        uuid -> Text,
        exercise_id -> Integer,
        is_correct -> Integer,
        current_stars -> Text,
        earned_stars -> Text,
        total_stars -> Text,
        record_timestamp -> BigInt,
    }
}

diesel::table! {
    exercises (id) {
        id -> Integer,
        uuid -> Text,
        question -> Text,
        question_raw -> Text,
        solution_id -> Text,
        solution_value -> Text,
        record_timestamp -> BigInt,
    }
}

diesel::table! {
    stars (id) {
        id -> Integer,
        value -> BigInt,
        record_timestamp -> BigInt,
    }
}

diesel::joinable!(exercise_results -> exercises (exercise_id));

diesel::allow_tables_to_appear_in_same_query!(
    exercise_results,
    exercises,
    stars,
);
