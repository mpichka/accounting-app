use rusqlite::{Error, Row};
use serde::{Deserialize, Serialize};

use crate::database::enums::AccessoryPriceType;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Accessory {
    pub id: Option<i64>,
    pub created_at: Option<i64>,
    pub updated_at: Option<i64>,
    pub name: Option<String>,
    pub price: Option<f64>,
    pub price_type: Option<AccessoryPriceType>,
    pub amount: Option<f64>,
}

impl Accessory {
    pub fn from_row(row: &Row<'_>) -> Result<Accessory, Error> {
        Ok(Accessory {
            id: row.get(0)?,
            created_at: row.get(1)?,
            updated_at: row.get(2)?,
            name: row.get(3)?,
            price: row.get(4)?,
            price_type: row.get(5)?,
            amount: row.get(6)?,
        })
    }
}
