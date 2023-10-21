pub const UPDATE_PACKAGE: &str = "
    UPDATE \"packages\" 
    SET
        \"name\" = ?,
        \"price\" = ?
    WHERE \"id\" = ?
    RETURNING *
;";

pub const INSERT_PACKAGE: &str = "
    INSERT INTO \"packages\" (
        \"name\",
        \"price\"
    )
    VALUES(?, ?)
    RETURNING *
;";
