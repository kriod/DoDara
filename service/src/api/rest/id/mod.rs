mod exists;
mod new;

use crate::db::prelude::*;
use warp::Filter;

pub fn api(
    db: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path("id").and(new::api(&db).or(exists::api(&db)))
}
