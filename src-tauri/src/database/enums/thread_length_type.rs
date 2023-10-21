use rusqlite::{
    types::{FromSql, FromSqlError, FromSqlResult, ToSqlOutput, Value, ValueRef},
    ToSql,
};
use serde::{Deserialize, Serialize};
use std::fmt;

#[derive(Deserialize, Serialize, PartialEq, Debug)]
#[serde(rename_all = "snake_case")]
pub enum ThreadLengthType {
    Meter = 1,
    Reel,
}

impl fmt::Display for ThreadLengthType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl ToSql for ThreadLengthType {
    fn to_sql(&self) -> rusqlite::Result<ToSqlOutput<'_>> {
        match self {
            ThreadLengthType::Meter => Ok(ToSqlOutput::Owned(Value::Integer(1))),
            ThreadLengthType::Reel => Ok(ToSqlOutput::Owned(Value::Integer(2))),
        }
    }
}

impl FromSql for ThreadLengthType {
    fn column_result(value: ValueRef<'_>) -> FromSqlResult<Self> {
        match value.as_i64()? {
            1 => Ok(ThreadLengthType::Meter),
            2 => Ok(ThreadLengthType::Reel),
            _ => Err(FromSqlError::InvalidType),
        }
    }
}
