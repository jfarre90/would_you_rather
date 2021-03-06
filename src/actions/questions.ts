import { Dispatch } from 'redux';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { IQuestion } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SEND_ANSWER = 'SEND_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';

interface IReceiveQuestionsAction {
    type: typeof RECEIVE_QUESTIONS;
    questions: { [questionId: string]: IQuestion };
}

interface ISaveAnswerAction {
    type: typeof SEND_ANSWER;
    questionId: string;
    answerId: string;
    userId: string;
}

interface IRemoveAnswerAction {
    type: typeof REMOVE_ANSWER;
    questionId: string;
    answerId: string;
    userId: string;
}

interface IAddQuestionAction {
    type: typeof ADD_QUESTION;
    optionOneText: string;
    optionTwoText: string;
    author: string;
}

export type QuestionActionTypes =
    | IReceiveQuestionsAction
    | ISaveAnswerAction
    | IRemoveAnswerAction
    | IAddQuestionAction;

export function receiveQuestions(questions: { [questionId: string]: IQuestion }): QuestionActionTypes {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}

function addAnswer(questionId: string, answerId: string, userId: string): QuestionActionTypes {
    return {
        type: SEND_ANSWER,
        questionId: questionId,
        answerId,
        userId
    };
}

function removeAnswer(questionId: string, answerId: string, userId: string): QuestionActionTypes {
    return {
        type: REMOVE_ANSWER,
        questionId,
        answerId,
        userId
    };
}

export function saveAnswer(questionId: string, answerId: string, userId: string): (dispatch: Dispatch) => Promise<any> {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(addAnswer(questionId, answerId, userId));

        try {
            saveQuestionAnswer({ authedUser: userId, qid: questionId, answer: answerId });
        } catch (err) {
            dispatch(removeAnswer(questionId, answerId, userId));
            alert('There was an error submitting your answer. Try again!');
        }
    };
}

function addQuestion(optionOneText: string, optionTwoText: string, author: string): QuestionActionTypes {
    return {
        type: ADD_QUESTION,
        optionOneText,
        optionTwoText,
        author
    };
}

export function handleAddQuestion(
    optionOneText: string,
    optionTwoText: string,
    author: string
): (dispatch: Dispatch) => Promise<any> {
    return async (dispatch: Dispatch): Promise<any> => {
        dispatch(addQuestion(optionOneText, optionTwoText, author));

        try {
            saveQuestion({ optionOneText, optionTwoText, author });
        } catch (err) {
            //TODO - potential improvement to remove the question if failed
            alert('There was an error submitting your question. Try again!');
        }
    };
}
