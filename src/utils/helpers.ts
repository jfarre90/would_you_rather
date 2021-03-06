import { IQuestionOption, ISavedQuestion } from './_DATA';

export interface IFormattedQuestion {
    id: string;
    timestamp: number;
    author: string;
    optionOne: IQuestionOption;
    optionTwo: IQuestionOption;
}

export function generateUID(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatQuestion(rawQuestion: ISavedQuestion): IFormattedQuestion {
    return {
        id: generateUID(),
        timestamp: Date.now(),
        author: rawQuestion.author,
        optionOne: {
            votes: [],
            text: rawQuestion.optionOneText
        },
        optionTwo: {
            votes: [],
            text: rawQuestion.optionTwoText
        }
    };
}
