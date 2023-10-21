pub const UPDATE_AMORTIZATION: &str = "
    UPDATE \"amortizations\" 
    SET
        \"name\" = ?,
        \"price\" = ?,
        \"period_in_months\" = ?
    WHERE \"id\" = ?
    RETURNING *
;";

pub const INSERT_AMORTIZATION: &str = "
    INSERT INTO \"amortizations\" (
        \"name\",
        \"price\",
        \"period_in_months\"
    )
    VALUES(?, ?, ?)
    RETURNING *
;";
