use rusqlite::{
    types::{FromSql, FromSqlError, FromSqlResult, ToSqlOutput, Value, ValueRef},
    Error, Row, ToSql,
};
use serde::{Deserialize, Serialize};
use std::fmt;


#[derive(Serialize, Deserialize, Debug, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct Package {
    pub id: Option<i64>,
    pub created_at: Option<i64>,
    pub updated_at: Option<i64>,
    pub name: Option<String>,
    pub price: Option<f64>,
}

impl Package {
    pub fn from_row(row: &Row<'_>) -> Result<Package, Error> {
        Ok(Package {
            id: row.get(0)?,
            created_at: row.get(1)?,
            updated_at: row.get(2)?,
            name: row.get(3)?,
            price: row.get(4)?,
        })
    }
}
