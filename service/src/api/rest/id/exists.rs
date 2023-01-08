use crate::db::prelude::*;
use crate::dtos::prelude::*;
use std::convert::Infallible;
use warp::Filter;

async fn handle(dbs: SharedDatabase, body: IdRequest) -> Result<impl warp::Reply, Infallible> {
    establish_connection(&dbs, &body.id);
    Ok(warp::reply())
}

pub fn api(
    dbs: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::post()
        .and(warp::path("exists"))
        .and(with_databases(dbs.clone()))
        .and(warp::body::json())
        .and_then(handle)
}
