use std::convert::Infallible;
use warp::Filter;

use crate::db::prelude::*;
use crate::dtos::prelude::*;

pub async fn handle(dbs: SharedDatabase, data: IdRequest) -> Result<impl warp::Reply, Infallible> {
    establish_connection(&dbs, &data.id);

    let response = match dbs.lock() {
        Err(_) => "-".to_string(),
        Ok(d) => match d.connections.get(&data.id) {
            None => "-".to_string(),
            Some(db) => get_last_stars_value(db).value.to_string(),
        },
    };

    Ok(warp::reply::json(&response))
}

pub fn api(
    dbs: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::post()
        .and(with_databases(dbs.clone()))
        .and(warp::body::json())
        .and_then(handle)
}
