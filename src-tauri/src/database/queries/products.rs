use rusqlite::{params, Error, Transaction};

use crate::{
    database::{
        connection,
        entities::{
            accessory::Accessory,
            amortization::Amortization,
            bead::Bead,
            package::Package,
            product::{
                AccessoryToProduct, AmortizationToProduct, BeadToProduct, PackageToProduct,
                Product, ThreadToProduct,
            },
            thread::Thread,
        },
        stmts,
    },
    libs::ProductSummary,
};

pub fn get_products_list() -> Result<Vec<Product>, rusqlite::Error> {
    let db = connection::connect();
    let limit = 100;
    let offset = 0;

    let mut stmt = db.prepare(stmts::product::GET_PRODUCTS_LIST)?;
    let rows = stmt
        .query_map(params![limit, offset], |row| Ok(Product::from_row(row)?))?
        .filter_map(|row| row.ok())
        .collect::<Vec<Product>>();

    Ok(rows)
}

pub fn get_product_details_by_id(product_id: i64) -> Result<Product, rusqlite::Error> {
    let db = connection::connect();

    let mut product: Option<Product> = None;
    let mut amortizations: Vec<Amortization> = Vec::new();
    let mut beads: Vec<Bead> = Vec::new();
    let mut accessories: Vec<Accessory> = Vec::new();
    let mut packages: Vec<Package> = Vec::new();
    let mut threads: Vec<Thread> = Vec::new();

    let mut stmt = db.prepare(stmts::product::GET_PRODUCT_DETAILS)?;
    let rows = stmt.query_map(params![product_id], |row| {
        let product = Product {
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
            threads: None,
            category: None,
        };

        let amortization = Amortization {
            id: row.get(19)?,
            created_at: row.get(20)?,
            updated_at: row.get(21)?,
            name: row.get(22)?,
            price: row.get(23)?,
            period_in_months: row.get(24)?,
        };

        let bead = Bead {
            id: row.get(25)?,
            created_at: row.get(26)?,
            updated_at: row.get(27)?,
            name: row.get(28)?,
            price: row.get(29)?,
        };

        let accessory = Accessory {
            id: row.get(30)?,
            created_at: row.get(31)?,
            updated_at: row.get(32)?,
            name: row.get(33)?,
            price: row.get(34)?,
            price_type: row.get(35)?,
            amount: row.get(36)?,
        };

        let thread = Thread {
            id: row.get(37)?,
            created_at: row.get(38)?,
            updated_at: row.get(39)?,
            name: row.get(40)?,
            length: row.get(41)?,
            length_type: row.get(42)?,
        };

        // let package = Package {
        //     id: row.get(35)?,
        //     created_at: row.get(36)?,
        //     updated_at: row.get(37)?,
        //     name: row.get(38)?,
        //     price: row.get(39)?,
        // };

        Ok((product, amortization, bead, accessory, thread))
    });

    for row in rows.unwrap() {
        let (row_product, row_amortization, row_bead, row_accessory, row_thread) =
            row?;

        if product.is_none() {
            product = Some(row_product);
        }

        if row_amortization.id.is_some() && !amortizations.contains(&row_amortization) {
            amortizations.push(row_amortization);
        }
        if row_bead.id.is_some() && !beads.contains(&row_bead) {
            beads.push(row_bead);
        }
        if row_accessory.id.is_some() && !accessories.contains(&row_accessory) {
            accessories.push(row_accessory);
        }
        if row_thread.id.is_some() && !threads.contains(&row_thread) {
            threads.push(row_thread);
        }
        // if row_package.id.is_some() && !packages.contains(&row_package) {
        //     packages.push(row_package);
        // }
    }

    if let Some(product) = product {
        let product = Product {
            amortizations: if !amortizations.is_empty() {
                Some(amortizations)
            } else {
                None
            },
            beads: if !beads.is_empty() { Some(beads) } else { None },
            accessories: if !accessories.is_empty() {
                Some(accessories)
            } else {
                None
            },
            threads: if !threads.is_empty() {
                Some(threads)
            } else {
                None
            },
            // packages: if !packages.is_empty() {
            //     Some(packages)
            // } else {
            //     None
            // },
            ..product
        };

        Ok(product)
    } else {
        Err(rusqlite::Error::QueryReturnedNoRows)
    }
}

pub fn save_product(data: &Product, summary: &ProductSummary) -> Result<i64, rusqlite::Error> {
    let mut db = connection::connect();
    let tx = db.transaction().unwrap();

    let product_id = upsert_product(&tx, &data, &summary)?.id.unwrap();

    // upsert_amortizations(&tx, product_id, data.amortizations.as_ref())?;
    // upsert_beads(&tx, product_id, data.beads.as_ref())?;
    // upsert_accessories(&tx, product_id, data.accessories.as_ref())?;
    // upsert_threads(&tx, product_id, data.threads.as_ref())?;
    // upsert_packages(&tx, product_id, data.packages.as_ref())?;

    tx.commit().unwrap();
    Ok(product_id)
}

fn upsert_product(
    tx: &Transaction,
    product: &Product,
    summary: &ProductSummary,
) -> Result<Product, rusqlite::Error> {
    if product.id.is_some() {
        tx.query_row(
            stmts::product::UPDATE_PRODUCT_BY_ID,
            params![
                &product.beads_quality,
                product.marge,
                product.surcharge,
                &product.name,
                product.schema_price,
                &product.schema_author,
                product.length,
                product.width,
                product.weight,
                product.estimate,
                &product.gerdan_type,
                product.beads_total_weight,
                product.threads_total_price,
                summary.total_price,
                &product.image,
                &product.preview,
                product.id.unwrap()
            ],
            Product::from_row,
        )
    } else {
        tx.query_row(
            stmts::product::INSERT_PRODUCT,
            params![
                &product.beads_quality,
                product.marge,
                product.surcharge,
                &product.name,
                product.schema_price,
                &product.schema_author,
                product.length,
                product.width,
                product.weight,
                product.estimate,
                &product.gerdan_type,
                product.beads_total_weight,
                product.threads_total_price,
                summary.total_price,
                &product.image,
                &product.preview,
            ],
            Product::from_row,
        )
    }
}

fn upsert_amortizations(
    tx: &Transaction,
    product_id: i64,
    amortizations: Option<&Vec<Amortization>>,
) -> Result<(), Error> {
    if amortizations.is_none() {
        tx.execute(
            stmts::product::DROP_AMORTIZATION_TO_PRODUCT_RELATIONSHIPS,
            params![product_id],
        )?;
        return Ok(());
    }

    let mut relations: Vec<AmortizationToProduct> = Vec::new();
    for amortization in amortizations.unwrap() {
        let result = if amortization.id.is_some() {
            tx.query_row(
                stmts::amortization::UPDATE_AMORTIZATION,
                params![
                    amortization.name,
                    amortization.price,
                    amortization.period_in_months,
                    amortization.id.unwrap()
                ],
                Amortization::from_row,
            )?
        } else {
            tx.query_row(
                stmts::amortization::INSERT_AMORTIZATION,
                params![
                    amortization.name,
                    amortization.price,
                    amortization.period_in_months,
                ],
                Amortization::from_row,
            )?
        };

        relations.push(AmortizationToProduct {
            amortization_id: result.id.unwrap(),
            product_id,
        });
    }

    tx.execute(
        stmts::product::DROP_AMORTIZATION_TO_PRODUCT_RELATIONSHIPS,
        params![product_id],
    )?;

    for rel in relations.into_iter() {
        tx.execute(
            stmts::product::SET_AMORTIZATION_TO_PRODUCT_RELATIONSHIPS,
            params![rel.amortization_id, rel.product_id],
        )?;
    }

    Ok(())
}

fn upsert_beads(tx: &Transaction, product_id: i64, beads: Option<&Vec<Bead>>) -> Result<(), Error> {
    if beads.is_none() {
        tx.execute(
            stmts::product::DROP_BEAD_TO_PRODUCT_RELATIONSHIPS,
            params![product_id],
        )?;
        return Ok(());
    }

    let mut relations: Vec<BeadToProduct> = Vec::new();
    for bead in beads.unwrap() {
        let result = if bead.id.is_some() {
            tx.query_row(
                stmts::bead::UPDATE_BEAD,
                params![bead.name, bead.price, bead.id.unwrap()],
                Bead::from_row,
            )?
        } else {
            tx.query_row(
                stmts::bead::INSERT_BEAD,
                params![bead.name, bead.price],
                Bead::from_row,
            )?
        };

        relations.push(BeadToProduct {
            bead_id: result.id.unwrap(),
            product_id,
        });
    }

    tx.execute(
        stmts::product::DROP_BEAD_TO_PRODUCT_RELATIONSHIPS,
        params![product_id],
    )?;

    for rel in relations.into_iter() {
        tx.execute(
            stmts::product::SET_BEAD_TO_PRODUCT_RELATIONSHIPS,
            params![rel.bead_id, rel.product_id],
        )?;
    }

    Ok(())
}

fn upsert_accessories(
    tx: &Transaction,
    product_id: i64,
    accessories: Option<&Vec<Accessory>>,
) -> Result<(), Error> {
    if accessories.is_none() {
        tx.execute(
            stmts::product::DROP_ACCESSORY_TO_PRODUCT_RELATIONSHIPS,
            params![product_id],
        )?;
        return Ok(());
    }

    let mut relations: Vec<AccessoryToProduct> = Vec::new();
    for accessory in accessories.unwrap() {
        let result = if accessory.id.is_some() {
            tx.query_row(
                stmts::accessory::UPDATE_ACCESSORY,
                params![
                    accessory.name,
                    accessory.price,
                    accessory.price_type,
                    accessory.amount,
                    accessory.id.unwrap()
                ],
                Accessory::from_row,
            )?
        } else {
            tx.query_row(
                stmts::accessory::INSERT_ACCESSORY,
                params![
                    accessory.name,
                    accessory.price,
                    accessory.price_type,
                    accessory.amount,
                ],
                Accessory::from_row,
            )?
        };

        relations.push(AccessoryToProduct {
            accessory_id: result.id.unwrap(),
            product_id,
        });
    }

    tx.execute(
        stmts::product::DROP_ACCESSORY_TO_PRODUCT_RELATIONSHIPS,
        params![product_id],
    )?;

    for rel in relations.into_iter() {
        tx.execute(
            stmts::product::SET_ACCESSORY_TO_PRODUCT_RELATIONSHIPS,
            params![rel.accessory_id, rel.product_id],
        )?;
    }

    Ok(())
}

fn upsert_packages(
    tx: &Transaction,
    product_id: i64,
    packages: Option<&Vec<Package>>,
) -> Result<(), Error> {
    if packages.is_none() {
        tx.execute(
            stmts::product::DROP_PACKAGE_TO_PRODUCT_RELATIONSHIPS,
            params![product_id],
        )?;
        return Ok(());
    }

    let mut relations: Vec<PackageToProduct> = Vec::new();
    for package in packages.unwrap() {
        let result = if package.id.is_some() {
            tx.query_row(
                stmts::package::UPDATE_PACKAGE,
                params![package.name, package.price, package.id.unwrap()],
                Package::from_row,
            )?
        } else {
            tx.query_row(
                stmts::package::INSERT_PACKAGE,
                params![package.name, package.price,],
                Package::from_row,
            )?
        };

        relations.push(PackageToProduct {
            package_id: result.id.unwrap(),
            product_id,
        });
    }

    tx.execute(
        stmts::product::DROP_PACKAGE_TO_PRODUCT_RELATIONSHIPS,
        params![product_id],
    )?;

    for rel in relations.into_iter() {
        tx.execute(
            stmts::product::SET_PACKAGE_TO_PRODUCT_RELATIONSHIPS,
            params![rel.package_id, rel.product_id],
        )?;
    }

    Ok(())
}

fn upsert_threads(
    tx: &Transaction,
    product_id: i64,
    threads: Option<&Vec<Thread>>,
) -> Result<(), Error> {
    if threads.is_none() {
        tx.execute(
            stmts::product::DROP_THREAD_TO_PRODUCT_RELATIONSHIPS,
            params![product_id],
        )?;
        return Ok(());
    }

    let mut relations: Vec<ThreadToProduct> = Vec::new();
    for thread in threads.unwrap() {
        let result = if thread.id.is_some() {
            tx.query_row(
                stmts::thread::UPDATE_THREAD,
                params![
                    thread.name,
                    thread.length,
                    thread.length_type,
                    thread.id.unwrap()
                ],
                Thread::from_row,
            )?
        } else {
            tx.query_row(
                stmts::thread::INSERT_THREAD,
                params![thread.name, thread.length, thread.length_type],
                Thread::from_row,
            )?
        };

        relations.push(ThreadToProduct {
            thread_id: result.id.unwrap(),
            product_id,
        });
    }

    tx.execute(
        stmts::product::DROP_THREAD_TO_PRODUCT_RELATIONSHIPS,
        params![product_id],
    )?;

    for rel in relations.into_iter() {
        tx.execute(
            stmts::product::SET_THREAD_TO_PRODUCT_RELATIONSHIPS,
            params![rel.thread_id, rel.product_id],
        )?;
    }

    Ok(())
}
