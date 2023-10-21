use rusqlite::{
    types::{FromSql, FromSqlError, FromSqlResult, ToSqlOutput, Value, ValueRef},
    ToSql,
};
use serde::{Deserialize, Serialize};
use std::fmt;

#[derive(Deserialize, Serialize, PartialEq, Debug)]
#[serde(rename_all = "snake_case")]
pub enum AccessoryPriceType {
    OneUnit = 1,
    FiftyUnits,
}

impl fmt::Display for AccessoryPriceType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl AccessoryPriceType {
    pub fn get_value(&self) -> f64 {
        match self {
            AccessoryPriceType::OneUnit => 1.0,
            AccessoryPriceType::FiftyUnits => 50.0,
        }
    }
}

impl ToSql for AccessoryPriceType {
    fn to_sql(&self) -> rusqlite::Result<ToSqlOutput<'_>> {
        match self {
            AccessoryPriceType::OneUnit => Ok(ToSqlOutput::Owned(Value::Integer(1))),
            AccessoryPriceType::FiftyUnits => Ok(ToSqlOutput::Owned(Value::Integer(2))),
        }
    }
}

impl FromSql for AccessoryPriceType {
    fn column_result(value: ValueRef<'_>) -> FromSqlResult<Self> {
        match value.as_i64()? {
            1 => Ok(AccessoryPriceType::OneUnit),
            2 => Ok(AccessoryPriceType::FiftyUnits),
            _ => Err(FromSqlError::InvalidType),
        }
    }
}
