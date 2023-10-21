use crate::{utils::parsers::text_to_number, database::entities::currency_rates::CurrencyRate};
use reqwest;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Deserialize, Serialize)]
pub struct PrivateBankCurrencyRate {
    ccy: String,
    base_ccy: String,
    buy: String,
    sale: String,
}

pub fn get_currency_rates() -> Result<Vec<PrivateBankCurrencyRate>, reqwest::Error> {
    // BASE CURRENCY: UAH
    const PRIVATE_RATES_URL: &str =
        "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";

    reqwest::blocking::get(PRIVATE_RATES_URL)?.json::<Vec<PrivateBankCurrencyRate>>()
}

pub fn convert_to_rates(data: &Vec<PrivateBankCurrencyRate>) -> Vec<CurrencyRate> {
    const UAH: &str = "UAH";
    const USD: &str = "USD";
    const EUR: &str = "EUR";

    let mut rates = HashMap::<String, &PrivateBankCurrencyRate>::new();

    data.into_iter().for_each(|item| {
        rates.insert(item.ccy.clone(), &item);
    });

    let usd_rate = rates.get(USD).expect("USD currency is missing");
    let eur_rate = rates.get(EUR).expect("EUR currency is missing");

    vec![
        CurrencyRate {
            id: None,
            updated_at: None,
            currency: USD.to_string(),
            rate: 1.0,
            is_base: true,
        },
        CurrencyRate {
            id: None,
            updated_at: None,
            currency: EUR.to_string(),
            rate: text_to_number(&Some(eur_rate.buy.to_owned())).unwrap()
                / text_to_number(&Some(usd_rate.buy.to_owned())).unwrap(),
            is_base: false,
        },
        CurrencyRate {
            id: None,
            updated_at: None,
            currency: UAH.to_string(),
            rate: text_to_number(&Some(usd_rate.buy.to_owned())).unwrap(),
            is_base: false,
        },
    ]
}
