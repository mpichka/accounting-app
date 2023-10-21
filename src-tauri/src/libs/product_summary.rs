use serde::{Deserialize, Serialize};

use crate::database::{
    entities::{additional_expenses::AdditionalExpensesInNumber, product::Product},
    enums::{AccessoryPriceType, BeadsQuality, GerdanType},
};

const ZERO: f64 = 0.0;
const ONE_HUNDRED: f64 = 100.0;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ProductSummary {
    pub beads_total_count: f64,
    pub beads_total_price: f64,
    pub accessories_total_count: f64,
    pub accessories_total_price: f64,
    pub packages_total_count: f64,
    pub packages_total_price: f64,
    pub threads_total_count: f64,
    pub threads_total_price: f64,
    pub self_cost: f64,
    pub fixed_cost: f64,
    pub variable_cost: f64,
    pub total_price: f64,
}

impl ProductSummary {
    pub fn init() -> Self {
        ProductSummary {
            beads_total_count: 0.0,
            beads_total_price: 0.0,
            accessories_total_count: 0.0,
            accessories_total_price: 0.0,
            packages_total_count: 0.0,
            packages_total_price: 0.0,
            threads_total_count: 0.0,
            threads_total_price: 0.0,
            self_cost: 0.0,
            fixed_cost: 0.0,
            variable_cost: 0.0,
            total_price: 0.0,
        }
    }

    pub fn calculate(data: &Product, additional_expenses: AdditionalExpensesInNumber) -> Self {
        let mut product_summary = ProductSummary::init();

        product_summary.calculate_beads(&data);
        product_summary.calculate_accessories(&data);
        product_summary.calculate_threads(&data);
        // product_summary.calculate_packages(&data);
        product_summary.calculate_self_cost(&data);
        product_summary.calculate_fixed_cost(&data, &additional_expenses);
        product_summary.calculate_variable_cost(data, &additional_expenses);
        product_summary.calculate_total_cost(data);
        return product_summary;
    }

    fn calculate_beads(&mut self, data: &Product) -> () {
        if data.beads.is_none() {
            self.beads_total_count = ZERO;
            self.beads_total_price = ZERO;
            return;
        }

        const BEADS_PACKAGING_COUNT: f64 = 50.0;

        let beads = data.beads.as_ref().unwrap();
        self.beads_total_count = beads.len() as f64;
        let beads_total_price = beads
            .iter()
            .fold(ZERO, |acc, e| acc + e.price.unwrap_or(ZERO));
        self.beads_total_price =
            (beads_total_price / self.beads_total_count as f64 / BEADS_PACKAGING_COUNT)
                * data.beads_total_weight.unwrap_or(ZERO);

        if self.beads_total_price.is_nan() || self.beads_total_price.is_infinite() {
            self.beads_total_price = ZERO;
        }
    }

    fn calculate_accessories(&mut self, data: &Product) -> () {
        if data.accessories.is_none() {
            self.accessories_total_count = ZERO;
            self.accessories_total_price = ZERO;
            return;
        }

        let accessories = data.accessories.as_ref().unwrap();
        for accessory in accessories.iter() {
            let accessory_price = accessory.price.unwrap_or(ZERO);
            let accessory_amount = accessory.amount.unwrap_or(ZERO);
            self.accessories_total_count += accessory.amount.unwrap_or(ZERO) as f64;
            self.accessories_total_price += accessory_price
                / accessory
                    .price_type
                    .as_ref()
                    .unwrap_or(&AccessoryPriceType::OneUnit)
                    .get_value()
                * accessory_amount;
        }

        if self.accessories_total_price.is_nan() || self.accessories_total_price.is_infinite() {
            self.accessories_total_price = ZERO;
        }
    }

    fn calculate_threads(&mut self, data: &Product) -> () {
        if data.threads.is_none() {
            self.threads_total_count = ZERO;
            self.threads_total_price = ZERO;
            return;
        }

        self.threads_total_count = data.threads.as_ref().unwrap().len() as f64;
        self.threads_total_price = data.threads_total_price.unwrap_or(ZERO);
    }

    // fn calculate_packages(&mut self, data: &Product) -> () {
    //     if data.packages.is_none() {
    //         self.packages_total_count = ZERO;
    //         self.packages_total_price = ZERO;
    //         return;
    //     }

    //     self.packages_total_count = data.packages.as_ref().unwrap().len() as f64;
    //     self.packages_total_price = data
    //         .packages
    //         .as_ref()
    //         .unwrap()
    //         .iter()
    //         .fold(ZERO, |acc, e| acc + e.price.unwrap_or(ZERO));
    // }

    fn calculate_self_cost(&mut self, data: &Product) -> () {
        self.self_cost = self.beads_total_price
            + self.accessories_total_price
            + self.threads_total_price
            + self.packages_total_price
            + data.schema_price.unwrap_or(ZERO);
    }

    fn calculate_fixed_cost(
        &mut self,
        data: &Product,
        additional_expenses: &AdditionalExpensesInNumber,
    ) -> () {
        let mut surcharge_cost = self.self_cost / ONE_HUNDRED * data.surcharge.unwrap_or(ZERO);

        if surcharge_cost.is_nan() || surcharge_cost.is_infinite() {
            surcharge_cost = ZERO;
        }

        let mut amortization_cost = if data.amortizations.is_some() {
            data.amortizations
                .as_ref()
                .unwrap()
                .iter()
                .fold(ZERO, |acc, e| {
                    acc + e.price.unwrap_or(ZERO) / e.period_in_months.unwrap_or(ZERO)
                })
        } else {
            ZERO
        };

        if amortization_cost.is_nan() || amortization_cost.is_infinite() {
            amortization_cost = ZERO;
        }

        self.fixed_cost =
            additional_expenses.workshop_rental_price + surcharge_cost + amortization_cost;

        if self.fixed_cost.is_nan() || self.fixed_cost.is_infinite() {
            self.fixed_cost = ZERO;
        }
    }

    fn calculate_variable_cost(
        &mut self,
        data: &Product,
        additional_expenses: &AdditionalExpensesInNumber,
    ) -> () {
        const DAYS_IN_MONTH: f64 = 30.0;
        const HOURS_IN_DAY: f64 = 24.0;

        let mut complexity_of_gerdan = additional_expenses.minimum_wage
            * data
                .gerdan_type
                .as_ref()
                .unwrap_or(&GerdanType::NoType)
                .get_value()
            / ONE_HUNDRED;

        if complexity_of_gerdan.is_nan() || complexity_of_gerdan.is_infinite() {
            complexity_of_gerdan = ZERO;
        }

        let mut beads_colors = additional_expenses.minimum_wage
            * match self.beads_total_count {
                x if x < 5.0 => 0.0,
                x if x >= 5.0 && x < 10.0 => 0.0,
                x if x >= 10.0 && x < 15.0 => 15.0,
                _ => self.beads_total_count,
            }
            / ONE_HUNDRED;

        if beads_colors.is_nan() || beads_colors.is_infinite() {
            beads_colors = ZERO;
        }

        let mut beads_calibration = additional_expenses.minimum_wage
            * data
                .beads_quality
                .as_ref()
                .unwrap_or(&BeadsQuality::High)
                .get_value()
            / ONE_HUNDRED;

        if beads_calibration.is_nan() || beads_calibration.is_infinite() {
            beads_calibration = ZERO;
        }

        let mut qualification = additional_expenses.minimum_wage
            * match additional_expenses.qualification {
                x if x < 5.0 => 5.0,
                x if x >= 5.0 && x < 10.0 => 10.0,
                x if x >= 10.0 && x < 15.0 => 15.0,
                _ => 25.0,
            }
            / ONE_HUNDRED;

        if qualification.is_nan() || qualification.is_infinite() {
            qualification = ZERO;
        }

        let estimate = data.estimate.unwrap_or(ZERO);

        let mut wage = (additional_expenses.minimum_wage
            + complexity_of_gerdan
            + beads_colors
            + beads_calibration
            + qualification)
            * estimate;

        if wage.is_nan() || wage.is_infinite() {
            wage = ZERO;
        }

        let cost_of_public_service =
            (additional_expenses.cost_of_public_service / DAYS_IN_MONTH / HOURS_IN_DAY) * estimate;
        let electricity_price = additional_expenses.electricity_price * estimate;

        self.variable_cost = wage + cost_of_public_service + electricity_price;
    }

    fn calculate_total_cost(&mut self, data: &Product) -> () {
        let total_cost = self.self_cost + self.fixed_cost + self.variable_cost;
        self.total_price = total_cost / ONE_HUNDRED * data.marge.unwrap_or(ZERO) + total_cost;

        if self.total_price.is_nan() || self.total_price.is_infinite() {
            self.total_price = ZERO;
        }
    }
}
