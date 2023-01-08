mod get;
mod payout;

use crate::db::prelude::*;
use warp::Filter;

pub fn api(
    db: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path("stars").and(get::api(&db).or(payout::api(&db)))
}
