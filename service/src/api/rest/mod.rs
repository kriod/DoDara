mod exercise;
mod id;
mod legal;
mod root;
mod stars;

use crate::db::prelude::*;
use warp::Filter;

pub fn api(
    db: SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    root::api()
        .or(legal::api())
        .or(id::api(&db))
        .or(stars::api(&db))
        .or(exercise::api(&db))
}
