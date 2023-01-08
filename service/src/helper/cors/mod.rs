use warp::http::Method;

pub fn enable_cors() -> warp::cors::Builder {
    let config = warp::cors()
        .allow_any_origin()
        .allow_credentials(true)
        .allow_methods(vec![Method::POST, Method::GET, Method::PUT, Method::PATCH])
        .allow_headers(vec!["content-type"]);

    config
}
