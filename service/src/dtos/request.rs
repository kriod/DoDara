use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ExerciseResultRequest {
    #[serde(rename(serialize = "exerciseId", deserialize = "exerciseId"))]
    pub exercise_id: String,
    #[serde(rename(serialize = "solutionId", deserialize = "solutionId"))]
    pub solution_id: String,
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct  IdRequest {
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct HistoryRequest {
    pub timestamp: i64,
    pub id: String,
}


#[derive(Deserialize, Serialize)]
pub struct PayoutQueryParam{
    pub id: String,
}