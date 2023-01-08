use std::convert::Infallible;
use warp::Filter;

use crate::db::prelude::*;
use crate::dtos::prelude::*;

pub async fn handle(
    dbs: SharedDatabase,
    data: PayoutQueryParam,
) -> Result<impl warp::Reply, Infallible> {
    establish_connection(&dbs, &data.id);

    let current_stars = match dbs.lock() {
        Err(_) => "0".to_string(),
        Ok(d) => match d.connections.get(&data.id) {
            None => "0".to_string(),
            Some(db) => {
                let to_payout = get_last_stars_value(db).value.to_string();
                reset_stars_value(db);
                to_payout
            }
        },
    };

    let response = PayoutResponseDto {
        current_stars: current_stars.clone(),
        message: format!("You have to payout {} - please note that the stars will be now automatically reset to 0", current_stars),
    };

    Ok(warp::reply::json(&response))
}

pub fn api(
    dbs: &SharedDatabase,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::get()
        .and(warp::path("payout"))
        .and(with_databases(dbs.clone()))
        .and(warp::query::<PayoutQueryParam>())
        .and_then(handle)
}
