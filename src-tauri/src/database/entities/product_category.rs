use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ProductCategory {
  pub id: Option<i64>,
  pub created_at: Option<i64>,
  pub name: String,
}
