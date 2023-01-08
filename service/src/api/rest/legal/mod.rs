use std::convert::Infallible;
use warp::Filter;

pub async fn handle() -> Result<impl warp::Reply, Infallible> {
    Ok(warp::reply::reply())
}

pub fn api() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::post().and(warp::path("legal")).and_then(handle)
}
