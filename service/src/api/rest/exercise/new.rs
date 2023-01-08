use crate::db::prelude::*;
use crate::dtos::prelude::*;
use crate::helper::prelude::*;
use std::convert::Infallible;
use warp::Filter;

pub async fn handle(dbs: SharedDatabase, data: IdRequest) -> Result<impl warp::Reply, Infallible> {
    establish_connection(&dbs, &data.id);

    let response = match dbs.lock() {
        Err(_) => None,
        Ok(d) => match d.connections.get(&data.id) {
            None => None,
            Some(db) => {
                let (question, exercise) = new_mathematics_exercise();
                let (uuid, solution_value) = find_mathematic_solution_id(&question, &exercise);

                let question_raw = stringify(&exercise.question);

                add_new_exercise(db, exercise.id.clone(), question, question_raw,uuid, solution_value);

                Some(exercise)
            }
        },
    };

    Ok(warp::reply::json(&response))
}

pub fn api(
    db: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::post()
        .and(warp::path("new"))
        .and(with_databases(db.clone()))
        .and(warp::body::json())
        .and_then(handle)
}
