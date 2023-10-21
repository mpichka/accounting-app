use rusqlite::{Error, Row};
use serde::{Deserialize, Serialize};

use crate::database::enums::ThreadLengthType;

#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Thread {
    pub id: Option<i64>,
    pub created_at: Option<i64>,
    pub updated_at: Option<i64>,
    pub name: Option<String>,
    pub length: Option<f64>,
    pub length_type: Option<ThreadLengthType>,
}

impl Thread {
    pub fn from_row(row: &Row<'_>) -> Result<Thread, Error> {
        Ok(Thread {
            id: row.get(0)?,
            created_at: row.get(1)?,
            updated_at: row.get(2)?,
            name: row.get(3)?,
            length: row.get(4)?,
            length_type: row.get(5)?,
        })
    }
}
