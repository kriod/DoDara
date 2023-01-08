pub struct Boolean(pub bool);

impl Boolean {

    pub fn to_bool(value: i32) -> bool {
        match value {
            0 => false,
            1 => true,
            _ => false,
        }
    }

    pub fn to_int(&self) -> i32 {
        match self.0{
            true => 1,
            false => 0,
        }
    }

    pub fn value(&self) -> bool {
        self.0
    }
}
