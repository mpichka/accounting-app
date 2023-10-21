use crate::{
    database::{
        entities::product::Product,
        queries::{additional_expenses, products},
    },
    dtos::response::{Response},
    libs::ProductSummary,
};

#[tauri::command]
pub fn save_product(data: Product) -> Result<Response<Product>, String> {
    let additional_expenses = additional_expenses::get_additional_expenses_struct();
    let product_summary = ProductSummary::calculate(&data, additional_expenses);

    let product_id = match products::save_product(&data, &product_summary) {
        Ok(data) => data,
        Err(err) => return Err(format!("{:?}", err)),
    };

    let product_details = match products::get_product_details_by_id(product_id) {
        Ok(data) => data,
        Err(err) => return Err(format!("{:?}", err)),
    };

    Ok(Response {
        data: product_details,
    })
}
