use warp::{Filter, Rejection, Reply};

use crate::api::rest;
use crate::db::prelude::*;
use crate::helper::prelude::*;

use crate::content;

pub fn init() -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    init_logger();

    let db = new_shared_databases();

    warp::path("api")
        .and(rest::api(db.clone()).with(enable_cors()))
        .or(content::init())
}
