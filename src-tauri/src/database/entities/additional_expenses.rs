use serde::{Deserialize, Serialize};

#[derive(Debug)]
pub struct AdditionalExpenses {
    pub id: Option<i64>,
    pub updated_at: Option<i64>,
    pub key: String,
    pub value: String,
}

#[derive(Debug)]
pub struct AdditionalExpensesInNumber {
    pub minimum_wage: f64,
    pub qualification: f64,
    pub electricity_price: f64,
    pub cost_of_public_service: f64,
    pub workshop_rental_price: f64,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AdditionalExpensesInString {
    pub minimum_wage: String,
    pub qualification: String,
    pub electricity_price: String,
    pub cost_of_public_service: String,
    pub workshop_rental_price: String,
}
