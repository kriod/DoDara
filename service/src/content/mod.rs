use warp::{Filter, Reply};

pub fn init() -> impl Filter<Extract = impl Reply, Error = warp::Rejection> + Clone {
    warp::path("www").map(|| warp::reply())
}
