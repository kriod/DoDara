use super::dotenv::dotenv_value;
pub fn get_port() -> u16 {
    dotenv_value("SERVER_PORT", 9000)
}
