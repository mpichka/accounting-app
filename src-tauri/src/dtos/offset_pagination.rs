use serde::{Serialize, Deserialize};


#[derive(Deserialize)]
pub struct OffsetPaginationReq {
    limit: i32,
    offset: i32,
}

#[derive(Serialize)]
pub struct OffsetPaginationRes {
    limit: i32,
    offset: i32,
    total: i32,
}
