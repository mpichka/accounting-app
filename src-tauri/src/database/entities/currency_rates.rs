use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct CurrencyRate {
    pub id: Option<i64>,
    pub updated_at: Option<i64>,
    pub currency: String,
    pub rate: f64,
    pub is_base: bool,
}
