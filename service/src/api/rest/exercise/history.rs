use crate::db::prelude::*;
use crate::dtos::prelude::*;
use std::convert::Infallible;
use warp::Filter;

use crate::helper::prelude::*;

pub async fn handle(
    dbs: SharedDatabase,
    data: HistoryRequest,
) -> Result<impl warp::Reply, Infallible> {
    let response: HistoryResultResponseDto = match dbs.lock() {
        Err(_) => Vec::new(),
        Ok(d) => match d.connections.get(&data.id) {
            None => Vec::new(),
            Some(db) => {
                let next = get_exercise_result(db, data.timestamp);
                next.iter()
                    .map(|n| {
                        let exercise = get_exercise_by_id(db, &n.exercise_id);

                        return ExerciseResultDto {
                            current_stars: n.current_stars.to_string(),
                            earned_stars: n.earned_stars.to_string(),
                            total_stars: n.total_stars.to_string(),
                            is_correct: Boolean::to_bool(n.is_correct),
                            result: ExerciseResultDetialsDto {
                                short: get_history_short_result_string(
                                    Boolean::to_bool(n.is_correct),
                                    exercise.solution_value,
                                ),
                                full: parse(exercise.question_raw),
                            },
                        };
                    })
                    .collect()
            }
        },
    };

    Ok(warp::reply::json(&response))
}

pub fn api(
    db: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::post()
        .and(warp::path("history"))
        .and(with_databases(db.clone()))
        .and(warp::body::json())
        .and_then(handle)
}
