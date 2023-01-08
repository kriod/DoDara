use crate::schema::stars;
use diesel::prelude::*;

use super::prelude::{NewStarsValue, StarsValue};

pub fn add_stars_value(connection: &SqliteConnection, next: i64) {
    let _result = diesel::insert_into(stars::table)
        .values(NewStarsValue::new(next)).execute(connection);
}

pub fn get_last_stars_value(connection: &SqliteConnection) -> StarsValue {
    let result = stars::table.load::<StarsValue>(connection);
    match result {
        Ok(r) => r.last().cloned().unwrap_or_default(),
        Err(_) => StarsValue::default(),
    }
}

pub fn reset_stars_value(connection: &SqliteConnection) {
    add_stars_value(connection, 0); 
}