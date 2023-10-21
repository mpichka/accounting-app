pub const UPDATE_ACCESSORY: &str = "
    UPDATE \"accessories\" 
    SET
        \"name\" = ?,
        \"price\" = ?,
        \"price_type\" = ?,
        \"amount\" = ?
    WHERE \"id\" = ?
    RETURNING *
;";

pub const INSERT_ACCESSORY: &str = "
    INSERT INTO \"accessories\" (
        \"name\",
        \"price\",
        \"price_type\",
        \"amount\"
    )
    VALUES(?, ?, ?, ?)
    RETURNING *
;";
