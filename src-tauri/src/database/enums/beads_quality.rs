use rusqlite::{
    types::{FromSql, FromSqlError, FromSqlResult, ToSqlOutput, Value, ValueRef},
    ToSql,
};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, PartialEq, Debug)]
#[serde(rename_all = "snake_case")]
pub enum BeadsQuality {
    High = 1,
    Medium,
    Low,
}

impl BeadsQuality {
    pub fn get_value(&self) -> f64 {
        match self {
            BeadsQuality::High => 0.0,
            BeadsQuality::Medium => 5.0,
            BeadsQuality::Low => 10.0,
        }
    }
}

impl ToSql for BeadsQuality {
    fn to_sql(&self) -> rusqlite::Result<ToSqlOutput<'_>> {
        match self {
            BeadsQuality::High => Ok(ToSqlOutput::Owned(Value::Integer(1))),
            BeadsQuality::Medium => Ok(ToSqlOutput::Owned(Value::Integer(2))),
            BeadsQuality::Low => Ok(ToSqlOutput::Owned(Value::Integer(3))),
        }
    }
}

impl FromSql for BeadsQuality {
    fn column_result(value: ValueRef<'_>) -> FromSqlResult<Self> {
        match value.as_i64()? {
            1 => Ok(BeadsQuality::High),
            2 => Ok(BeadsQuality::Medium),
            3 => Ok(BeadsQuality::Low),
            _ => Err(FromSqlError::InvalidType),
        }
    }
}
