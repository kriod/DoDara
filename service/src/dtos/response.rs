use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ValueResponse<T> {
    pub data: T,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct RestApiResponseDto {
    pub version: String,
    pub available: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CreateIdResponseDto {
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SolutionDto {
    pub id: String,
    pub value: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
#[serde(rename_all = "camelCase")]
pub enum QuestionValueTypes {
    Variable,
    Symbol,
    Result,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct QuestionDto {
    #[serde(rename(serialize = "valueType", deserialize = "valueType"))]
    pub value_type: QuestionValueTypes,
    pub value: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub enum ExerciseTypes {
    Mathematic,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ExerciseMetaDto {
    pub label: String,
    #[serde(rename(serialize = "exerciseType", deserialize = "exerciseType"))]
    pub exercise_type: ExerciseTypes,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NewExerciseDto {
    pub id: String,
    pub meta: ExerciseMetaDto,
    pub question: Vec<QuestionDto>,
    pub solutions: Vec<SolutionDto>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ExerciseResultDetialsDto {
    pub full: Vec<QuestionDto>,
    pub short: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ExerciseResultDto {
    #[serde(rename(serialize = "isCorrect", deserialize = "isCorrect"))]
    pub is_correct: bool,
    #[serde(rename(serialize = "currentStars", deserialize = "currentStars"))]
    pub current_stars: String,
    #[serde(rename(serialize = "earnedStars", deserialize = "earnedStars"))]
    pub earned_stars: String,
    #[serde(rename(serialize = "totalStarts", deserialize = "totalStarts"))]
    pub total_stars: String,
    pub result: ExerciseResultDetialsDto,
}

pub type HistoryResultResponseDto = Vec<ExerciseResultDto>;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PayoutResponseDto {
    pub current_stars: String,
    pub message: String,
}
