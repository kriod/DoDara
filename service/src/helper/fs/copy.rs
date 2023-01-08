use std::fs::copy;

use super::prelude::file_exists;

pub fn create_from_template(template: String, next: String) -> bool {
    if file_exists(&next) {
        return false;
    }

    match copy(template, next) {
        Ok(_) => true,
        Err(_) => false,
    }
}

pub fn create_db_file(name: &String) -> bool {
    create_from_template("database.db".to_string(), format!("{}.db", name))
}
