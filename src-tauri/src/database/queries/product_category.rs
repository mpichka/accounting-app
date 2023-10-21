use rusqlite::params;

use crate::database::{connection, entities::product_category::ProductCategory, stmts::category};

pub fn get_all_categories() -> Vec<ProductCategory> {
    let db = connection::connect();

    let rows = db
        .prepare(category::GET_ALL_CATEGORIES)
        .unwrap()
        .query_map(params![], |row| {
            Ok(ProductCategory {
                id: row.get(0)?,
                created_at: row.get(1)?,
                name: row.get(2)?,
            })
        })
        .unwrap()
        .map(|r| r.unwrap())
        .collect::<Vec<ProductCategory>>();

    rows
}
