use rusqlite::{
    types::{FromSql, FromSqlError, FromSqlResult, ToSqlOutput, Value, ValueRef},
    ToSql,
};
use serde::{Deserialize, Serialize};
use std::fmt;

#[derive(Deserialize, Serialize, PartialEq, Debug)]
#[serde(rename_all = "snake_case")]
pub enum GerdanType {
    NoType = 1,
    TypeOne,
    TypeTwo,
    TypeThree,
    TypeFour,
    TypeFive,
}

impl fmt::Display for GerdanType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}

impl GerdanType {
    pub fn get_value(&self) -> f64 {
        match self {
            GerdanType::NoType => 0.0,
            GerdanType::TypeOne => 0.0,
            GerdanType::TypeTwo => 5.0,
            GerdanType::TypeThree => 10.0,
            GerdanType::TypeFour => 20.0,
            GerdanType::TypeFive => 5.0,
        }
    }
}

impl ToSql for GerdanType {
    fn to_sql(&self) -> rusqlite::Result<ToSqlOutput<'_>> {
        match self {
            GerdanType::NoType => Ok(ToSqlOutput::Owned(Value::Integer(10))),
            GerdanType::TypeOne => Ok(ToSqlOutput::Owned(Value::Integer(1))),
            GerdanType::TypeTwo => Ok(ToSqlOutput::Owned(Value::Integer(2))),
            GerdanType::TypeThree => Ok(ToSqlOutput::Owned(Value::Integer(3))),
            GerdanType::TypeFour => Ok(ToSqlOutput::Owned(Value::Integer(4))),
            GerdanType::TypeFive => Ok(ToSqlOutput::Owned(Value::Integer(5))),
        }
    }
}

impl FromSql for GerdanType {
    fn column_result(value: ValueRef<'_>) -> FromSqlResult<Self> {
        match value.as_i64()? {
            10 => Ok(GerdanType::NoType),
            1 => Ok(GerdanType::TypeOne),
            2 => Ok(GerdanType::TypeTwo),
            3 => Ok(GerdanType::TypeThree),
            4 => Ok(GerdanType::TypeFour),
            5 => Ok(GerdanType::TypeFive),
            _ => Err(FromSqlError::InvalidType),
        }
    }
}
