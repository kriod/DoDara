#[macro_use]
extern crate diesel;

mod api;
mod content;
mod db;
mod dtos;
mod helper;
mod schema;

mod router;

use dotenv::dotenv;
use helper::prelude::*;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let routes = router::init();
    warp::serve(routes).run(([0, 0, 0, 0], get_port())).await;
}
