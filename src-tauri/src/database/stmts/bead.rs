pub const UPDATE_BEAD: &str = "
    UPDATE \"beads\" 
    SET
        \"name\" = ?,
        \"price\" = ?
    WHERE \"id\" = ?
    RETURNING *
;";

pub const INSERT_BEAD: &str = "
    INSERT INTO \"beads\" (
        \"name\",
        \"price\"
    )
    VALUES(?, ?)
    RETURNING *
;";
