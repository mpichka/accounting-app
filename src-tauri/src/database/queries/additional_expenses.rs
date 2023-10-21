use rusqlite::params;

use crate::{
    database::{
        connection,
        entities::additional_expenses::{AdditionalExpenses, AdditionalExpensesInNumber},
        stmts::additional_expenses,
    },
    utils::parsers::text_to_number,
};

pub fn get_additional_expenses() -> Vec<AdditionalExpenses> {
    let db = connection::connect();

    let rows = db
        .prepare(additional_expenses::SELECT_ADDITIONAL_EXPENSES)
        .unwrap()
        .query_map((), |row| {
            Ok(AdditionalExpenses {
                id: row.get(0)?,
                updated_at: row.get(1)?,
                key: row.get(2)?,
                value: row.get(3)?,
            })
        })
        .unwrap()
        .map(|r| r.unwrap())
        .collect::<Vec<AdditionalExpenses>>();

    return rows;
}

pub fn save_additional_expenses(data: Vec<AdditionalExpenses>) {
    let db = connection::connect();

    for row in data {
        db.execute(
            additional_expenses::UPDATE_ADDITIONAL_EXPENSES,
            params![&row.value, &row.key],
        )
        .unwrap();
    }
}

pub fn get_additional_expenses_struct() -> AdditionalExpensesInNumber {
    const ZERO: f64 = 0.0;
    let rows_vec = get_additional_expenses();

    let mut additional_expenses = AdditionalExpensesInNumber {
        minimum_wage: 0.0,
        qualification: 0.0,
        electricity_price: 0.0,
        cost_of_public_service: 0.0,
        workshop_rental_price: 0.0,
    };

    for row in rows_vec {
        match row.key.as_str() {
            "minimum_wage" => {
                additional_expenses.minimum_wage = text_to_number(&Some(row.value)).unwrap_or(ZERO)
            }
            "qualification" => {
                additional_expenses.qualification = text_to_number(&Some(row.value)).unwrap_or(ZERO)
            }
            "electricity_price" => {
                additional_expenses.electricity_price =
                    text_to_number(&Some(row.value)).unwrap_or(ZERO)
            }
            "cost_of_public_service" => {
                additional_expenses.cost_of_public_service =
                    text_to_number(&Some(row.value)).unwrap_or(ZERO)
            }
            "workshop_rental_price" => {
                additional_expenses.workshop_rental_price =
                    text_to_number(&Some(row.value)).unwrap_or(ZERO)
            }
            _ => (),
        }
    }

    additional_expenses
}
