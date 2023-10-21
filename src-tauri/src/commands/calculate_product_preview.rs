use crate::{
    database::{queries::additional_expenses::get_additional_expenses_struct, entities::product::Product},
    libs::ProductSummary,
};

#[tauri::command]
pub fn calculate_product_preview(data: Product) -> ProductSummary {
    let additional_expenses = get_additional_expenses_struct();
    ProductSummary::calculate(&data, additional_expenses)
}
