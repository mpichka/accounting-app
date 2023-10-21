pub const UPDATE_THREAD: &str = "
    UPDATE \"threads\" 
    SET
        \"name\" = ?,
        \"length\" = ?,
        \"length_type\" = ?
    WHERE \"id\" = ?
    RETURNING *
;";

pub const INSERT_THREAD: &str = "
    INSERT INTO \"threads\" (
        \"name\",
        \"length\",
        \"length_type\"
    )
    VALUES(?, ?, ?)
    RETURNING *
;";
