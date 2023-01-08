mod history;
mod new;
mod result;

use crate::db::prelude::*;
use warp::Filter;

pub fn api(
    db: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path("exercise").and(new::api(&db).or(result::api(&db)).or(history::api(&db)))
}
