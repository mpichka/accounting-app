use crate::database::{queries, entities::additional_expenses::AdditionalExpensesInString};

#[tauri::command]
pub fn fetch_additional_expenses() -> AdditionalExpensesInString {
    let rows_vec = queries::additional_expenses::get_additional_expenses();

    let mut dto = AdditionalExpensesInString {
        minimum_wage: String::new(),
        qualification: String::new(),
        electricity_price: String::new(),
        cost_of_public_service: String::new(),
        workshop_rental_price: String::new(),
    };

    for row in rows_vec {
        match row.key.as_str() {
            "minimum_wage" => dto.minimum_wage = row.value,
            "qualification" => dto.qualification = row.value,
            "electricity_price" => dto.electricity_price = row.value,
            "cost_of_public_service" => dto.cost_of_public_service = row.value,
            "workshop_rental_price" => dto.workshop_rental_price = row.value,
            _ => (),
        }
    }

    dto
}
