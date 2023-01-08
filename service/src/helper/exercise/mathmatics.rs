use eval::eval;
use rand::seq::SliceRandom;
use rand::Rng;

use crate::dtos::prelude::*;
use crate::helper::prelude::*;

fn evalute_calculation(next: &String) -> i64 {
    let result = eval(next);
    if result.is_err() {
        return 0;
    }

    result.unwrap().as_i64().unwrap_or(0)
}

fn get_symbol() -> String {
    let mut rng = rand::thread_rng();
    match rng.gen_range(1..3) {
        1 => "+".to_string(),
        2 => "-".to_string(),
        3 => "*".to_string(),
        _ => "+".to_string(),
    }
}

fn create_question() -> Vec<QuestionDto> {
    let mut rng = rand::thread_rng();

    let mut next: Vec<QuestionDto> = Vec::new();
    let iterations = rng.gen_range(1..3);
    for i in 0..=iterations {
        next.push(QuestionDto {
            value_type: QuestionValueTypes::Variable,
            value: rng.gen_range(0..100).to_string(),
        });

        if i == iterations {
            break;
        }

        next.push(QuestionDto {
            value_type: QuestionValueTypes::Symbol,
            value: get_symbol(),
        });
    }

    next.push(QuestionDto {
        value_type: QuestionValueTypes::Symbol,
        value: "=".to_string(),
    });

    next.push(QuestionDto {
        value_type: QuestionValueTypes::Result,
        value: "?".to_string(),
    });

    next
}

fn create_solutions(current: &Vec<QuestionDto>) -> (String, Vec<SolutionDto>) {
    let formula = current
        .into_iter()
        .fold(String::new(), |result: String, c| {
            if c.value == "=" || c.value_type == QuestionValueTypes::Result {
                return result;
            }

            format!("{}{}", result, c.value)
        });

    let correct_value = evalute_calculation(&formula);
    let mut rng = rand::thread_rng();

    let mut results = vec![
        SolutionDto {
            id: create_uuid(),
            value: (correct_value + rng.gen_range(1..20)).to_string(),
        },
        SolutionDto {
            id: create_uuid(),
            value: correct_value.to_string(),
        },
        SolutionDto {
            id: create_uuid(),
            value: (correct_value + rng.gen_range(1..20)).to_string(),
        },
    ];

    results.shuffle(&mut rng);

    (formula, results)
}

pub fn get_short_result_string(value: bool, solution: String) -> String {
    match value {
        true => "".to_string(),
        false => format!("The correct answer is {}", solution),
    }
}

pub fn get_history_short_result_string(value: bool, solution: String) -> String {
    match value {
        true => format!("{} was correct", solution),
        false => format!("The correct answer was {}", solution),
    }
}

pub fn get_next_stars(is_correct: bool, current_stars: i64) -> (i64, i64) {
    let stars_to_earn = dotenv_value("STARS_TO_EARN_PER_ANSWER", 10);

    if is_correct == false {
        return (current_stars, 0);
    }

    (current_stars + stars_to_earn, stars_to_earn)
}

pub fn new_mathematics_exercise() -> (String, NewExerciseDto) {
    let question = create_question();
    let (formula, solutions) = create_solutions(&question);

    let next = NewExerciseDto {
        id: create_uuid(),
        meta: ExerciseMetaDto {
            label: "Mathematics".to_string(),
            exercise_type: ExerciseTypes::Mathematic,
        },
        question,
        solutions,
    };

    (formula, next)
}

pub fn find_mathematic_solution_id(
    formula: &String,
    exercise: &NewExerciseDto,
) -> (String, String) {
    let next = evalute_calculation(formula).to_string();

    let result = exercise.solutions.iter().find(|e| e.value == next);

    match result {
        Some(r) => (r.id.clone(), r.value.clone()),
        None => ("".to_string(), "".to_string()),
    }
}
