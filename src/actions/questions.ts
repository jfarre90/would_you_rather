import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { Dispatch } from 'redux';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { IFormattedQuestion } from '../utils/helpers';
import { IQuestion } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';

interface IReceiveQuestionsAction {
    type: typeof RECEIVE_QUESTIONS;
    questions: { [questionId: string]: IQuestion };
}

interface ISaveAnswerAction {
    type: typeof ADD_ANSWER;
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
    savedQuestion: IFormattedQuestion;
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
        type: ADD_ANSWER,
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

function addQuestion(savedQuestion: IFormattedQuestion): QuestionActionTypes {
    return {
        type: ADD_QUESTION,
        savedQuestion
    };
}

export function handleAddQuestion(
    optionOneText: string,
    optionTwoText: string,
    author: string
): (dispatch: Dispatch) => Promise<any> {
    return async (dispatch: Dispatch): Promise<any> => {
        try {
            dispatch(showLoading());
            const savedQuestion = await saveQuestion({ optionOneText, optionTwoText, author });

            dispatch(addQuestion(savedQuestion));
            dispatch(hideLoading());
        } catch (err) {
            alert('There was an error submitting your question. Try again!');
        }
    };
}
