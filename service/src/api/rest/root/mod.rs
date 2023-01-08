use crate::dtos::prelude::*;
use std::convert::Infallible;
use warp::Filter;

pub async fn handle() -> Result<impl warp::Reply, Infallible> {
    Ok(warp::reply::json(&RestApiResponseDto {
        version: "1.0".to_string(),
        available: true,
    }))
}

pub fn api() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::get().and(warp::path("rest")).and_then(handle)
}
