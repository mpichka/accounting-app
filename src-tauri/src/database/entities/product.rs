use rusqlite::{Error, Row};
use serde::{Deserialize, Serialize};

use crate::database::enums::{BeadsQuality, GerdanType};

use super::{
    accessory::Accessory, amortization::Amortization, bead::Bead, package::Package, thread::Thread,
};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Product {
    pub id: Option<i64>,
    pub created_at: Option<i64>,
    pub updated_at: Option<i64>,
    pub beads_quality: Option<BeadsQuality>,
    pub marge: Option<f64>,
    pub surcharge: Option<f64>,
    pub name: Option<String>,
    pub schema_price: Option<f64>,
    pub schema_author: Option<String>,
    pub length: Option<f64>,
    pub width: Option<f64>,
    pub weight: Option<f64>,
    pub estimate: Option<f64>,
    pub gerdan_type: Option<GerdanType>,
    pub beads_total_weight: Option<f64>,
    pub threads_total_price: Option<f64>,
    pub total_price: Option<f64>,
    pub image: Option<String>,
    pub preview: Option<String>,
    pub amortizations: Option<Vec<Amortization>>,
    pub beads: Option<Vec<Bead>>,
    pub accessories: Option<Vec<Accessory>>,
    pub threads: Option<Vec<Thread>>,
    pub category: Option<String>,
}

impl Product {
    pub fn from_row(row: &Row<'_>) -> Result<Product, Error> {
        Ok(Product {
            id: row.get(0)?,
            created_at: row.get(1)?,
            updated_at: row.get(2)?,
            name: row.get(3)?,
            schema_price: row.get(4)?,
            schema_author: row.get(5)?,
            length: row.get(6)?,
            width: row.get(7)?,
            weight: row.get(8)?,
            beads_quality: row.get(9)?,
            gerdan_type: row.get(10)?,
            marge: row.get(11)?,
            surcharge: row.get(12)?,
            estimate: row.get(13)?,
            beads_total_weight: row.get(14)?,
            threads_total_price: row.get(15)?,
            total_price: row.get(16)?,
            image: row.get(17)?,
            preview: row.get(18)?,
            amortizations: None,
            beads: None,
            accessories: None,
            // packages: None,
            threads: None,
            category: None,
        })
    }
}

pub struct PackageToProduct {
    pub package_id: i64,
    pub product_id: i64,
}

pub struct ThreadToProduct {
    pub thread_id: i64,
    pub product_id: i64,
}

pub struct BeadToProduct {
    pub bead_id: i64,
    pub product_id: i64,
}

pub struct AmortizationToProduct {
    pub amortization_id: i64,
    pub product_id: i64,
}

#[derive(Debug)]
pub struct AccessoryToProduct {
    pub accessory_id: i64,
    pub product_id: i64,
}
