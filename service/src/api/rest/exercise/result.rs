use std::convert::Infallible;
use warp::Filter;

use crate::db::prelude::*;
use crate::dtos::prelude::*;
use crate::helper::prelude::*;

pub async fn handle(
    dbs: SharedDatabase,
    data: ExerciseResultRequest,
) -> Result<impl warp::Reply, Infallible> {
    let response: Option<ExerciseResultDto> = match dbs.lock() {
        Err(_) => None,
        Ok(d) => match d.connections.get(&data.id) {
            None => None,
            Some(db) => {
                let next = get_exercise_by_uuid(db, &data.exercise_id);
                let is_correct = Boolean(data.solution_id == next.solution_id);

                let current_stars = get_last_stars_value(db).value;
                let (total_stars, earned_stars) = get_next_stars(is_correct.value(), current_stars);

                add_stars_value(db, total_stars);
                add_new_exercise_result(
                    db,
                    next.id,
                    is_correct.to_int(),
                    current_stars,
                    earned_stars,
                );

                Some(ExerciseResultDto {
                    is_correct: is_correct.value(),
                    current_stars: current_stars.to_string(),
                    earned_stars: earned_stars.to_string(),
                    total_stars: total_stars.to_string(),
                    result: ExerciseResultDetialsDto {
                        short: get_short_result_string(is_correct.value(), next.solution_value),
                        full: parse(next.question_raw),
                    },
                })
            }
        },
    };

    Ok(warp::reply::json(&response))
}

pub fn api(
    db: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::post()
        .and(warp::path("result"))
        .and(with_databases(db.clone()))
        .and(warp::body::json())
        .and_then(handle)
}
