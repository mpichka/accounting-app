use crate::{
    database::queries::currency_rates,
    services::exchangerates::{convert_to_rates, get_currency_rates, PrivateBankCurrencyRate},
};

#[tauri::command]
pub fn sync_currency_rates() -> Result<Option<Vec<PrivateBankCurrencyRate>>, String> {
    let currency_rates = currency_rates::get_currency_rates();

    let is_outdated = currency_rates::is_currency_outdated(&currency_rates);
    if is_outdated {
        let bank_rates = match get_currency_rates() {
            Ok(data) => data,
            Err(err) => return Err(format!("{:?}", err)),
        };

        let currency_rates = convert_to_rates(&bank_rates);
        currency_rates::save_currency_rates(&currency_rates);
        return Ok(Some(bank_rates));
    }

    Ok(None)
}
