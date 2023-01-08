use crate::db::prelude::*;
use crate::dtos::prelude::*;
use crate::helper::prelude::*;
use std::convert::Infallible;
use warp::Filter;

async fn handle(dbs: SharedDatabase) -> Result<impl warp::Reply, Infallible> {
    let id = create_uuid_with_timestamp();
    new_shared_database_connection(&dbs, &id);

    let response = CreateIdResponseDto { id };
    Ok(warp::reply::json(&response))
}

pub fn api(
    dbs: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::post()
        .and(warp::path("new"))
        .and(with_databases(dbs.clone()))
        .and_then(handle)
}
