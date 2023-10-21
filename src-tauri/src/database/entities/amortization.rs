use rusqlite::{Error, Row};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Amortization {
    pub id: Option<i64>,
    pub created_at: Option<i64>,
    pub updated_at: Option<i64>,
    pub name: Option<String>,
    pub price: Option<f64>,
    pub period_in_months: Option<f64>,
}

impl Amortization {
    pub fn from_row(row: &Row<'_>) -> Result<Amortization, Error> {
        Ok(Amortization {
            id: row.get(0)?,
            created_at: row.get(1)?,
            updated_at: row.get(2)?,
            name: row.get(3)?,
            price: row.get(4)?,
            period_in_months: row.get(5)?,
        })
    }
}
