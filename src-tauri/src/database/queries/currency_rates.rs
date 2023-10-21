use rusqlite::params;
use std::time;

use crate::database::{connection, entities::currency_rates::CurrencyRate, stmts::currency_rates};

pub fn get_currency_rates() -> Vec<CurrencyRate> {
    let db = connection::connect();

    let rows = db
        .prepare(currency_rates::SELECT_CURRENCY_RATES)
        .unwrap()
        .query_map((), |row| {
            Ok(CurrencyRate {
                id: row.get(0)?,
                updated_at: row.get(1)?,
                currency: row.get(2)?,
                rate: row.get(3)?,
                is_base: row.get(4)?,
            })
        })
        .unwrap()
        .map(|r| r.unwrap())
        .collect::<Vec<CurrencyRate>>();

    return rows;
}

pub fn save_currency_rates(data: &Vec<CurrencyRate>) {
    let db = connection::connect();

    for row in data {
        db.execute(
            currency_rates::INSERT_CURRENCY_RATES,
            params![&row.currency, &row.rate, &row.is_base],
        )
        .ok();
    }
}

pub fn is_currency_outdated(data: &Vec<CurrencyRate>) -> bool {
    if data.is_empty() {
        return true;
    }

    const DAY_IN_SECONDS: i64 = 86400;

    let now = time::SystemTime::now()
        .duration_since(time::UNIX_EPOCH)
        .unwrap()
        .as_secs() as i64;

    for rate in data {
        if rate.updated_at.is_none() {
            return true;
        }
        if now - rate.updated_at.unwrap() > DAY_IN_SECONDS {
            return true;
        }
    }

    false
}
