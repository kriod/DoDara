use std::path::Path;

pub fn file_exists(path: &String) -> bool {
    Path::new(path).exists()
}
