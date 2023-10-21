pub const GET_ALL_CATEGORIES: &str = "
    SELECT 
        \"id\",
        \"created_at\",
        \"name\"
    FROM \"product_categories\"
;";

pub const INSERT_CATEGORY: &str = "
    INSERT INTO \"product_categories\"(
        \"name\"
    )
    VALUES(?)
    RETURNING *
;";
