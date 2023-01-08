use std::str::FromStr;

pub fn dotenv_value<T>(variable: &str, default_value: T) -> T
where
    T: FromStr,
{
    match std::env::var(variable) {
        Ok(v) => v.parse::<T>().unwrap_or(default_value),
        Err(_) => default_value,
    }
}
