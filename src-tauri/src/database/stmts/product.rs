pub const UPDATE_PRODUCT_BY_ID: &str = "
    UPDATE \"products\" 
    SET
        \"beads_quality\" = ?,
        \"marge\" = ?,
        \"surcharge\" = ?,
        \"name\" = ?,
        \"schema_price\" = ?,
        \"schema_author\" = ?,
        \"length\" = ?,
        \"width\" = ?,
        \"weight\" = ?,
        \"estimate\" = ?,
        \"gerdan_type\" = ?,
        \"beads_total_weight\" = ?,
        \"threads_total_price\" = ?,
        \"total_price\" = ?,
        \"image\" = ?,
        \"preview\" = ?
    WHERE \"id\" = ?
    RETURNING *
;";

pub const INSERT_PRODUCT: &str = "
    INSERT INTO \"products\" (
        \"beads_quality\",
        \"marge\",
        \"surcharge\",
        \"name\",
        \"schema_price\",
        \"schema_author\",
        \"length\",
        \"width\",
        \"weight\",
        \"estimate\",
        \"gerdan_type\",
        \"beads_total_weight\",
        \"threads_total_price\",
        \"total_price\",
        \"image\",
        \"preview\"
    )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING *
;";


pub const DROP_AMORTIZATION_TO_PRODUCT_RELATIONSHIPS: &str = "
    DELETE FROM \"amortizations_to_products\" 
    WHERE \"product_id\" = ?
;";

pub const SET_AMORTIZATION_TO_PRODUCT_RELATIONSHIPS: &str = "
    INSERT INTO \"amortizations_to_products\" (
        \"amortization_id\",
        \"product_id\"
    )
    VALUES(?, ?)
;";

pub const DROP_BEAD_TO_PRODUCT_RELATIONSHIPS: &str = "
    DELETE FROM \"beads_to_products\" 
    WHERE \"product_id\" = ?
;";

pub const SET_BEAD_TO_PRODUCT_RELATIONSHIPS: &str = "
    INSERT INTO \"beads_to_products\" (
        \"bead_id\",
        \"product_id\"
    )
    VALUES(?, ?)
;";

pub const DROP_ACCESSORY_TO_PRODUCT_RELATIONSHIPS: &str = "
    DELETE FROM \"accessories_to_products\" 
    WHERE \"product_id\" = ?
;";

pub const SET_ACCESSORY_TO_PRODUCT_RELATIONSHIPS: &str = "
    INSERT INTO \"accessories_to_products\" (
        \"accessory_id\",
        \"product_id\"
    )
    VALUES(?, ?)
;";

pub const DROP_PACKAGE_TO_PRODUCT_RELATIONSHIPS: &str = "
    DELETE FROM \"packages_to_products\" 
    WHERE \"product_id\" = ?
;";

pub const SET_PACKAGE_TO_PRODUCT_RELATIONSHIPS: &str = "
    INSERT INTO \"packages_to_products\" (
        \"package_id\",
        \"product_id\"
    )
    VALUES(?, ?)
;";

pub const DROP_THREAD_TO_PRODUCT_RELATIONSHIPS: &str = "
    DELETE FROM \"threads_to_products\" 
    WHERE \"product_id\" = ?
;";

pub const SET_THREAD_TO_PRODUCT_RELATIONSHIPS: &str = "
    INSERT INTO \"threads_to_products\" (
        \"thread_id\",
        \"product_id\"
    )
    VALUES(?, ?)
;";

pub const GET_PRODUCT_DETAILS: &str = "
    SELECT 
        \"product\".\"id\" AS \"product->id\",
        \"product\".\"created_at\" AS \"product->created_at\",
        \"product\".\"updated_at\" AS \"product->updated_at\",
        \"product\".\"name\" AS \"product->name\",
        \"product\".\"schema_price\" AS \"product->schema_price\",
        \"product\".\"schema_author\" AS \"product->schema_author\",
        \"product\".\"length\" AS \"product->length\",
        \"product\".\"width\" AS \"product->width\",
        \"product\".\"weight\" AS \"product->weight\",
        \"product\".\"beads_quality\" AS \"product->beads_quality\",
        \"product\".\"gerdan_type\" AS \"product->gerdan_type\",
        \"product\".\"marge\" AS \"product->marge\",
        \"product\".\"surcharge\" AS \"product->surcharge\",
        \"product\".\"estimate\" AS \"product->estimate\",
        \"product\".\"beads_total_weight\" AS \"product->beads_total_weight\",
        \"product\".\"threads_total_price\" AS \"product->threads_total_price\",
        \"product\".\"total_price\" AS \"product->total_price\",
        \"product\".\"image\" AS \"product->image\",
        \"product\".\"preview\" AS \"product->preview\",
        \"amortization\".\"id\" AS \"amortization->id\",
        \"amortization\".\"created_at\" AS \"amortization->created_at\",
        \"amortization\".\"updated_at\" AS \"amortization->updated_at\",
        \"amortization\".\"name\" AS \"amortization->name\",
        \"amortization\".\"price\" AS \"amortization->price\",
        \"amortization\".\"period_in_months\" AS \"amortization->period_in_months\",
        \"bead\".\"id\" AS \"bead->id\",
        \"bead\".\"created_at\" AS \"bead->created_at\",
        \"bead\".\"updated_at\" AS \"bead->updated_at\",
        \"bead\".\"name\" AS \"bead->name\",
        \"bead\".\"price\" AS \"bead->price\",
        \"accessory\".\"id\" AS \"accessory->id\",
        \"accessory\".\"created_at\" AS \"accessory->created_at\",
        \"accessory\".\"updated_at\" AS \"accessory->updated_at\",
        \"accessory\".\"name\" AS \"accessory->name\",
        \"accessory\".\"price\" AS \"accessory->price\",
        \"accessory\".\"price_type\" AS \"accessory->price_type\",
        \"accessory\".\"amount\" AS \"accessory->amount\",
        \"thread\".\"id\" AS \"thread->id\",
        \"thread\".\"created_at\" AS \"thread->created_at\",
        \"thread\".\"updated_at\" AS \"thread->updated_at\",
        \"thread\".\"name\" AS \"thread->name\",
        \"thread\".\"length\" AS \"thread->length\",
        \"thread\".\"length_type\" AS \"thread->length_type\"
    FROM \"products\" AS \"product\"
    LEFT OUTER JOIN \"amortizations_to_products\" ON 
        \"amortizations_to_products\".\"product_id\" = \"product\".\"id\"
    LEFT OUTER JOIN \"amortizations\" AS \"amortization\" ON 
        \"amortization\".\"id\" = \"amortizations_to_products\".\"amortization_id\"
    LEFT OUTER JOIN \"beads_to_products\" ON 
        \"beads_to_products\".\"product_id\" = \"product\".\"id\"
    LEFT OUTER JOIN \"beads\" AS \"bead\" ON 
        \"bead\".\"id\" = \"beads_to_products\".\"bead_id\"
    LEFT OUTER JOIN \"accessories_to_products\" ON 
        \"accessories_to_products\".\"product_id\" = \"product\".\"id\"
    LEFT OUTER JOIN \"accessories\" AS \"accessory\" ON 
        \"accessory\".\"id\" = \"accessories_to_products\".\"accessory_id\"
    LEFT OUTER JOIN \"threads_to_products\" ON 
        \"threads_to_products\".\"product_id\" = \"product\".\"id\"
    LEFT OUTER JOIN \"threads\" AS \"thread\" ON 
        \"thread\".\"id\" = \"threads_to_products\".\"thread_id\"
    WHERE \"product\".\"id\" = ?
;";

pub const GET_PRODUCTS_LIST: &str = "
    SELECT 
        \"product\".\"id\" AS \"product->id\",
        \"product\".\"created_at\" AS \"product->created_at\",
        \"product\".\"updated_at\" AS \"product->updated_at\",
        \"product\".\"name\" AS \"product->name\",
        \"product\".\"schema_price\" AS \"product->schema_price\",
        \"product\".\"schema_author\" AS \"product->schema_author\",
        \"product\".\"length\" AS \"product->length\",
        \"product\".\"width\" AS \"product->width\",
        \"product\".\"weight\" AS \"product->weight\",
        \"product\".\"beads_quality\" AS \"product->beads_quality\",
        \"product\".\"gerdan_type\" AS \"product->gerdan_type\",
        \"product\".\"marge\" AS \"product->marge\",
        \"product\".\"surcharge\" AS \"product->surcharge\",
        \"product\".\"estimate\" AS \"product->estimate\",
        \"product\".\"beads_total_weight\" AS \"product->beads_total_weight\",
        \"product\".\"threads_total_price\" AS \"product->threads_total_price\",
        \"product\".\"total_price\" AS \"product->total_price\",
        \"product\".\"image\" AS \"product->image\",
        \"product\".\"preview\" AS \"product->preview\"
    FROM \"products\" AS \"product\"
    LIMIT ? OFFSET ?
;";
