// import { showLoading, hideLoading } from 'react-redux-loading';
import { IQuestion } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export interface IReceivedQuestionsAction {
    type: string;
    questions: { [key: string]: IQuestion };
}
export function receiveQuestions(questions: { [key: string]: IQuestion }): IReceivedQuestionsAction {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}
