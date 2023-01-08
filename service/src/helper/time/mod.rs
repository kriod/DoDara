use chrono::prelude::*;

pub fn time_now() -> i64 {
    let date = Utc::now();
    date.timestamp_millis()
}

pub fn from_day_start(timestamp: i64) -> i64 {
    let date = DateTime::<Utc>::from_utc(NaiveDateTime::from_timestamp(timestamp, 0), Utc);
    let next = Utc
        .with_ymd_and_hms(date.year(), date.month(), date.day(), 0, 0, 0)
        .single();

    match next {
        Some(n) => n.timestamp_millis(),
        None => timestamp,
    }
}

pub fn to_day_end(timestamp: i64) -> i64 {
    let date = DateTime::<Utc>::from_utc(NaiveDateTime::from_timestamp(timestamp, 0), Utc);
    let next = Utc
        .with_ymd_and_hms(date.year(), date.month(), date.day(), 23, 59, 59)
        .single();

    match next {
        Some(n) => n.timestamp_millis(),
        None => timestamp,
    }
}
