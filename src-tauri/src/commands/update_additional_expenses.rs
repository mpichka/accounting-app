use crate::{
    database::{
        entities::additional_expenses::{AdditionalExpenses, AdditionalExpensesInString},
        queries,
    },
    utils::parsers::normalize_text_number,
};

#[tauri::command]
pub fn update_additional_expenses(data: AdditionalExpensesInString) -> AdditionalExpensesInString {
    let mut rows: Vec<AdditionalExpenses> = Vec::new();

    rows.push(AdditionalExpenses {
        id: None,
        updated_at: None,
        key: "minimum_wage".to_string(),
        value: normalize_text_number(&Some(data.minimum_wage)),
    });
    rows.push(AdditionalExpenses {
        id: None,
        updated_at: None,
        key: "qualification".to_string(),
        value: normalize_text_number(&Some(data.qualification)),
    });
    rows.push(AdditionalExpenses {
        id: None,
        updated_at: None,
        key: "electricity_price".to_string(),
        value: normalize_text_number(&Some(data.electricity_price)),
    });
    rows.push(AdditionalExpenses {
        id: None,
        updated_at: None,
        key: "cost_of_public_service".to_string(),
        value: normalize_text_number(&Some(data.cost_of_public_service)),
    });
    rows.push(AdditionalExpenses {
        id: None,
        updated_at: None,
        key: "workshop_rental_price".to_string(),
        value: normalize_text_number(&Some(data.workshop_rental_price)),
    });

    queries::additional_expenses::save_additional_expenses(rows);

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
