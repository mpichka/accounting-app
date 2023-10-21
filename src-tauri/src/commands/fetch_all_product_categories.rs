use crate::database::queries;

#[tauri::command]
pub fn fetch_all_product_categories() -> Vec<String> {
    queries::product_category::get_all_categories()
        .into_iter()
        .map(|el| el.name)
        .collect::<Vec<String>>()
}
