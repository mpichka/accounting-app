pub fn text_to_number(text: &Option<String>) -> Option<f64> {
    if let Some(text) = text {
        let text = text.replace(",", ".");
        match text.parse::<f64>() {
            Ok(number) => Some(number),
            Err(_) => None,
        }
    } else {
        None
    }
}

pub fn normalize_text_number(text: &Option<String>) -> String {
    if let Some(text) = text {
        text.replace(",", ".")
    } else {
        String::from("")
    }
}
