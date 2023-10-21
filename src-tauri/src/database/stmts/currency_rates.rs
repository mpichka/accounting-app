pub const SELECT_CURRENCY_RATES: &str = "
    SELECT 
        \"id\",
        \"updated_at\",
        \"currency\",
        \"rate\",
        \"is_base\"
    FROM \"currency_rates\"
;";

pub const INSERT_CURRENCY_RATES: &str = "
    INSERT INTO \"currency_rates\"(
        \"currency\", 
        \"rate\",
        \"is_base\"
    )
    VALUES(?, ?, ?)
;";
