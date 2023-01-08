use crate::helper::prelude::*;
use diesel::prelude::*;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use warp::Filter;

pub struct Database {
    pub connections: HashMap<String, SqliteConnection>,
}

pub type SharedDatabase = Arc<Mutex<Database>>;

pub fn has_connection_established(dbs: &SharedDatabase, name: &String) -> bool {
    match dbs.lock() {
        Err(_) => false,
        Ok(d) => d.connections.contains_key(name),
    }
}

pub fn establish_connection(dbs: &SharedDatabase, name: &String) {
    if has_connection_established(dbs, name) {
        return;
    }

    let db_name = format!("{}.db", name);
    let connection = SqliteConnection::establish(&db_name);
    if connection.is_err() {
        return;
    }

    match dbs.lock() {
        Err(_) => return,
        Ok(mut d) => {
            d.connections.insert(name.clone(), connection.unwrap());
        }
    }
}

pub fn new_shared_database_connection(dbs: &SharedDatabase, name: &String) {
    if create_db_file(name) == false {
        return;
    }

    establish_connection(dbs, name);
}

pub fn with_databases(
    dbs: SharedDatabase,
) -> impl Filter<Extract = (SharedDatabase,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || dbs.clone())
}

pub fn new_shared_databases() -> SharedDatabase {
    Arc::new(Mutex::new(Database {
        connections: HashMap::new(),
    }))
}
