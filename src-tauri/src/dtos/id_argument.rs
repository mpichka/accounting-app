use serde::Deserialize;

#[derive(Deserialize)]
pub struct IdArgument {
    pub id: i64,
}
