use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};

pub fn parse<T>(data: String) -> T
where
    T: for<'de> Deserialize<'de> + Default,
{
    let next = data.as_str();
    from_str(next).unwrap_or_default()
}

pub fn stringify<T>(data: &T) -> String 
where
    T: Serialize + Default,
{
    to_string(data).unwrap_or_default()
}
