pub const SELECT_ADDITIONAL_EXPENSES: &str = "
    SELECT 
        \"id\",
        \"updated_at\",
        \"key\",
        \"value\"
    FROM \"additional_expenses\"
;";

pub const UPDATE_ADDITIONAL_EXPENSES: &str = "
    UPDATE \"additional_expenses\"
    SET \"value\" = ?
    WHERE \"key\" = ?
;";

pub const INSERT_ADDITIONAL_EXPENSES: &str = "
    INSERT INTO \"additional_expenses\"(
        \"key\", 
        \"value\"
    )
    VALUES(?, ?)
;";
