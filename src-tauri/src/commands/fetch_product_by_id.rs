use crate::{database::{
    queries::products, entities::product::Product,
}, dtos::id_argument::IdArgument};

#[tauri::command]
pub fn fetch_product_by_id(data: IdArgument) -> Result<Product, String> {
    let product_details = match products::get_product_details_by_id(data.id) {
        Ok(data) => data,
        Err(err) => return Err(format!("{:?}", err)),
    };

    Ok(product_details)
}
