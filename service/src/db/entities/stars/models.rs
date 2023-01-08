use crate::helper::prelude::*;
use crate::schema::*;

#[derive(Queryable, Insertable, PartialEq, Clone)]
#[table_name = "stars"]
pub struct StarsValue {
    pub id: i32,
    pub value: i64,
    pub record_timestamp: i64,
}

impl Default for StarsValue {
    fn default() -> Self {
        StarsValue {
            id: 0,
            value: 0,
            record_timestamp: time_now(),
        }
    }
}

#[derive(Insertable, PartialEq, Debug, Clone)]
#[table_name = "stars"]
pub struct NewStarsValue {
    pub value: i64,
    pub record_timestamp: i64,
}

impl NewStarsValue {
    pub fn new(value: i64) -> NewStarsValue{
        NewStarsValue {
            value,
            record_timestamp: time_now(),
        }
    }
}
