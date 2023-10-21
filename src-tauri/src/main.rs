// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod commands;
mod database;
mod libs;
mod services;
mod utils;
mod dtos;

use commands::*;

fn main() {
    // sqlite version "3.41.2"
    database::migrations::initialize();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            update_additional_expenses,
            fetch_additional_expenses,
            calculate_product_preview,
            save_product,
            fetch_product_by_id,
            fetch_products_list,
            sync_currency_rates,
            fetch_all_product_categories,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
