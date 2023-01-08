use serde::Deserialize;

pub fn _get_request<T>(url: String) -> Option<T>
where
    T: for<'de> Deserialize<'de>,
{
    let result = reqwest::blocking::get(url.clone());

    if result.is_err() {
        return None;
    }

    let data = result.unwrap();
    data.json::<T>().ok()
}
