use serde::Serialize;

#[derive(Serialize)]
pub struct PaginationResponse {
    pub page: i32,
    pub limit: i32,
    pub total: i32,
}

#[derive(Serialize)]
pub struct PaginatedResponse<T> {
    pub data: Vec<T>,
    pub pagination: Option<PaginationResponse>,
}

#[derive(Serialize)]
pub struct Response<T> {
    pub data: T,
}
