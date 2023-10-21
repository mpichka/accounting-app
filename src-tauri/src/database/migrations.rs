use super::{connection::connect, stmts};
use rusqlite::{params, Connection};

pub fn initialize() {
    let db = connect();

    additional_expenses(&db);
    currency_rates(&db);
    products(&db);
    amortizations(&db);
    amortizations_to_products(&db);
    beads(&db);
    beads_to_products(&db);
    accessories(&db);
    accessories_to_products(&db);
    // packages(&db);
    // packages_to_products(&db);
    threads(&db);
    threads_to_products(&db);
    product_categories(&db);
    product_categories_to_products(&db);
}

fn additional_expenses(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS additional_expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            updated_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            key TEXT UNIQUE NOT NULL,
            value TEXT NOT NULL
        );
    ";

    let trigger_sql = "
        CREATE TRIGGER IF NOT EXISTS additional_expenses_updated_at 
        AFTER UPDATE ON additional_expenses
        BEGIN
            UPDATE additional_expenses 
            SET updated_at = (CAST (STRFTIME('%s', 'now') AS INTEGER)) 
            WHERE id = NEW.id;
        END;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: additional_expenses table wasn't create");
    db.execute(trigger_sql, ())
        .expect("[SQL ERROR]: additional_expenses_updated_at trigger table wasn't create");

    db.execute(
        stmts::additional_expenses::INSERT_ADDITIONAL_EXPENSES,
        params!["qualification", ""],
    )
    .ok();
    db.execute(
        stmts::additional_expenses::INSERT_ADDITIONAL_EXPENSES,
        params!["minimum_wage", ""],
    )
    .ok();
    db.execute(
        stmts::additional_expenses::INSERT_ADDITIONAL_EXPENSES,
        params!["electricity_price", ""],
    )
    .ok();
    db.execute(
        stmts::additional_expenses::INSERT_ADDITIONAL_EXPENSES,
        params!["cost_of_public_service", ""],
    )
    .ok();
    db.execute(
        stmts::additional_expenses::INSERT_ADDITIONAL_EXPENSES,
        params!["costs_of_logistics", ""],
    )
    .ok();
    db.execute(
        stmts::additional_expenses::INSERT_ADDITIONAL_EXPENSES,
        params!["workshop_rental_price", ""],
    )
    .ok();
}

fn currency_rates(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS currency_rates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            updated_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            currency TEXT UNIQUE NOT NULL,
            rate REAL NOT NULL,
            is_base INTEGER DEFAULT 0
        );
    ";

    let trigger_sql = "
        CREATE TRIGGER IF NOT EXISTS currency_rates_updated_at 
        AFTER UPDATE ON currency_rates
        BEGIN
            UPDATE currency_rates 
            SET updated_at = (CAST (STRFTIME('%s', 'now') AS INTEGER)) 
            WHERE id = NEW.id;
        END;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: currency_rates table wasn't create");
    db.execute(trigger_sql, ())
        .expect("[SQL ERROR]: currency_rates_updated_at trigger table wasn't create");
}

fn products(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            updated_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            name TEXT NOT NULL,
            schema_price REAL,
            schema_author TEXT,
            length REAL,
            width REAL NULL,
            weight REAL NULL,
            beads_quality INTEGER,
            gerdan_type INTEGER,
            marge REAL,
            surcharge REAL,
            estimate REAL,
            beads_total_weight REAL,
            threads_total_price REAL,
            total_price REAL,
            image TEXT,
            preview TEXT
        );
    ";

    let trigger_sql = "
        CREATE TRIGGER IF NOT EXISTS products_updated_at 
        AFTER UPDATE ON products
        BEGIN
            UPDATE products 
            SET updated_at = (CAST (STRFTIME('%s', 'now') AS INTEGER)) 
            WHERE id = NEW.id;
        END;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: products table wasn't create");
    db.execute(trigger_sql, ())
        .expect("[SQL ERROR]: products_updated_at trigger table wasn't create");
}

fn amortizations(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS amortizations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            updated_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            name TEXT NOT NULL,
            price REAL,
            period_in_months REAL
        );
    ";

    let trigger_sql = "
        CREATE TRIGGER IF NOT EXISTS amortizations_updated_at 
        AFTER UPDATE ON amortizations
        BEGIN
            UPDATE amortizations 
            SET updated_at = (CAST (STRFTIME('%s', 'now') AS INTEGER))
            WHERE id = NEW.id;
        END;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: amortizations table wasn't create");
    db.execute(trigger_sql, ())
        .expect("[SQL ERROR]: amortizations_updated_at wasn't create");
}

fn amortizations_to_products(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS amortizations_to_products (
            amortization_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            PRIMARY KEY (amortization_id, product_id),
            CONSTRAINT amortizations_to_products_amortization_id 
            FOREIGN KEY (amortization_id) REFERENCES amortizations (id) ON DELETE CASCADE,
            CONSTRAINT amortizations_to_products_product_id
            FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
        ) WITHOUT ROWID;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: amortizations_to_products to table wasn't create");
}

fn beads(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS beads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            updated_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            name TEXT NOT NULL,
            price REAL
        );
    ";

    let trigger_sql = "
        CREATE TRIGGER IF NOT EXISTS beads_updated_at 
        AFTER UPDATE ON beads
        BEGIN
            UPDATE beads 
            SET updated_at = (CAST (STRFTIME('%s', 'now') AS INTEGER))
            WHERE id = NEW.id;
        END;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: beads table wasn't create");
    db.execute(trigger_sql, ())
        .expect("[SQL ERROR]: beads_updated_at wasn't create");
}

fn beads_to_products(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS beads_to_products (
            bead_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            PRIMARY KEY (bead_id, product_id),
            CONSTRAINT beads_to_products_bead_id
            FOREIGN KEY (bead_id) REFERENCES beads (id) ON DELETE CASCADE,
            CONSTRAINT beads_to_products_product_id
            FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
        ) WITHOUT ROWID;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: beads_to_products to table wasn't create");
}

fn accessories(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS accessories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            updated_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            name TEXT NOT NULL,
            price REAL,
            price_type INTEGER,
            amount REAL
        );
    ";

    let trigger_sql = "
        CREATE TRIGGER IF NOT EXISTS accessories_updated_at 
        AFTER UPDATE ON accessories
        BEGIN
            UPDATE accessories 
            SET updated_at = (CAST (STRFTIME('%s', 'now') AS INTEGER))
            WHERE id = NEW.id;
        END;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: accessories table wasn't create");
    db.execute(trigger_sql, ())
        .expect("[SQL ERROR]: accessories_updated_at wasn't create");
}

fn accessories_to_products(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS accessories_to_products (
            accessory_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            PRIMARY KEY (accessory_id, product_id),
            CONSTRAINT accessories_to_products_accessory_id
            FOREIGN KEY (accessory_id) REFERENCES accessories (id) ON DELETE CASCADE,
            CONSTRAINT accessories_to_products_product_id
            FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
        ) WITHOUT ROWID;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: accessories_to_products to table wasn't create");
}

// fn packages(db: &Connection) {
//     let sql = "
//         CREATE TABLE IF NOT EXISTS packages (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             created_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
//             updated_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
//             name TEXT NOT NULL,
//             price REAL
//         );
//     ";

//     let trigger_sql = "
//         CREATE TRIGGER IF NOT EXISTS packages_updated_at
//         AFTER UPDATE ON packages
//         BEGIN
//             UPDATE packages
//             SET updated_at = (CAST (STRFTIME('%s', 'now') AS INTEGER))
//             WHERE id = NEW.id;
//         END;
//     ";

//     db.execute(sql, ())
//         .expect("[SQL ERROR]: packages table wasn't create");
//     db.execute(trigger_sql, ())
//         .expect("[SQL ERROR]: packages_updated_at wasn't create");
// }

// fn packages_to_products(db: &Connection) {
//     let sql = "
//         CREATE TABLE IF NOT EXISTS packages_to_products (
//             package_id INTEGER NOT NULL,
//             product_id INTEGER NOT NULL,
//             PRIMARY KEY (package_id, product_id),
//             CONSTRAINT packages_to_products_package_id
//             FOREIGN KEY (package_id) REFERENCES packages (id) ON DELETE CASCADE,
//             CONSTRAINT packages_to_products_product_id
//             FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
//         ) WITHOUT ROWID;
//     ";

//     db.execute(sql, ())
//         .expect("[SQL ERROR]: packages_to_products to table wasn't create");
// }

fn threads(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS threads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            updated_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            name TEXT NOT NULL,
            length REAL,
            length_type INTEGER
        );
    ";

    let trigger_sql = "
        CREATE TRIGGER IF NOT EXISTS threads_updated_at 
        AFTER UPDATE ON threads
        BEGIN
            UPDATE threads 
            SET updated_at = (CAST (STRFTIME('%s', 'now') AS INTEGER))
            WHERE id = NEW.id;
        END;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: threads table wasn't create");
    db.execute(trigger_sql, ())
        .expect("[SQL ERROR]: threads_updated_at wasn't create");
}

fn threads_to_products(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS threads_to_products (
            thread_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            PRIMARY KEY (thread_id, product_id),
            CONSTRAINT threads_to_products_thread_id
            FOREIGN KEY (thread_id) REFERENCES threads (id) ON DELETE CASCADE,
            CONSTRAINT threads_to_products_product_id
            FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
        ) WITHOUT ROWID;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: threads_to_products to table wasn't create");
}

fn product_categories(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS product_categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at INTEGER DEFAULT (CAST (STRFTIME('%s', 'now') AS INTEGER)),
            name TEXT UNIQUE NOT NULL
        );
    ";

    let initial_value_sql = "INSERT INTO product_categories (name) VALUES ('Гердан');";

    db.execute(sql, ())
        .expect("[SQL ERROR]: product_categories table wasn't create");
    db.execute(initial_value_sql, ()).ok();
}

fn product_categories_to_products(db: &Connection) {
    let sql = "
        CREATE TABLE IF NOT EXISTS product_categories_to_products (
            category_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            PRIMARY KEY (category_id, product_id),
            CONSTRAINT product_categories_to_products_category_id
            FOREIGN KEY (category_id) REFERENCES product_categories (id) ON DELETE CASCADE,
            CONSTRAINT product_categories_to_products_product_id
            FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
        ) WITHOUT ROWID;
    ";

    db.execute(sql, ())
        .expect("[SQL ERROR]: product_categories_to_products to table wasn't create");
}
