use rusqlite::Connection;

pub fn connect() -> Connection {
    Connection::open("database.sqlite").expect("Cannot open database.sqlite")
}
