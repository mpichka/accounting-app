use serde::{Serialize, Deserialize};


#[derive(Deserialize)]
pub struct CursorPaginationReq {
    cursor: i32,
    size: i32
}

#[derive(Serialize)]
pub struct CursorPaginationRes {
    prev_cursor: Option<i32>,
    next_cursor: Option<i32>,
    size: i32,
    total: i32,
}
