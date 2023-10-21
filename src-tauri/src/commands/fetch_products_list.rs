use crate::{database::{ queries::products, entities::product::Product}, dtos::response::PaginatedResponse};

#[tauri::command]
pub fn fetch_products_list() -> Result<PaginatedResponse<Product>, String> {
    let product_details = match products::get_products_list() {
        Ok(data) => data,
        Err(err) => return Err(format!("{:?}", err)),
    };

    Ok(PaginatedResponse { data: product_details, pagination: None })
}
