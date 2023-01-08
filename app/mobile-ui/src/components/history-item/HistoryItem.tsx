import clsx from "clsx";
import * as React from "react";

import { QuestionDto } from "../../dtos";
import { Label } from "../label";

import { HistoryItemProps } from "./HistoryItem.types";

export const HistoryItem = (props: HistoryItemProps) => {

    const getQuestionEntityClassName = React.useCallback(({ valueType }: QuestionDto, isCorrect: boolean) => {
        if (valueType === "symbol") {
            return isCorrect ? "text-emerald-400 text-xl font-bold" : "text-red-500 text-xl font-bold";
        }

        return isCorrect ? "text-emerald-400 text-md p-2 bg-emerald-200" : "text-red-500 text-md p-2 bg-red-200";
    }, []);

    const { data } = props;
    const isCorrect = data.isCorrect;
    const { full, short } = data.result;

    return <div className={clsx("p-2 pt-3 rounded-2xl", isCorrect ? "bg-emerald-100" : "bg-red-100")}>
        <div className="flex flex-row justify-center items-center space-x-2">
            {full.filter((q) => q.valueType !== "result" && q.value !== "?" && q.value !== "=").map((q, index) => {
                return (<div
                    key={`question-entity-${index}`}
                    className={clsx(
                        "rounded-lg",
                        getQuestionEntityClassName(q, isCorrect)
                    )}
                >
                    {q.value}
                </div>
                )
            })}
        </div>
        <Label className={clsx("text-center font-bold", isCorrect ? "text-emerald-400" : "text-red-500")}>{short}</Label>
    </div>;
}