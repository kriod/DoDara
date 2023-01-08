use log::log_enabled;

pub fn init_logger() {
    pretty_env_logger::init();
    log_enabled!(log::Level::Info);
}
