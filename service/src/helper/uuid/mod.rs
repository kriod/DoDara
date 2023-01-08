use uuid::Uuid;

use super::prelude::time_now;

pub fn create_uuid() -> String {
    let next = Uuid::new_v4();
    next.to_string()
}

pub fn create_uuid_with_timestamp() -> String {
    let next = Uuid::new_v4();
    format!("{}-{}", next.to_string(), time_now())
}
