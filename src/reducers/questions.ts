import { ADD_QUESTION, RECEIVE_QUESTIONS, REMOVE_ANSWER, ADD_ANSWER } from '../actions/questions';
import { ReduxAction } from '../actions/shared';
import { IQuestion } from '../utils/_DATA';

export default function questions(
    state: { [questionId: string]: IQuestion } = {},
    action: ReduxAction
): { [questionId: string]: IQuestion } {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };
        case ADD_ANSWER:
            return {
                ...state,
                [action.questionId]: {
                    ...state[action.questionId],
                    [action.answerId]: {
                        ...state[action.questionId][action.answerId],
                        votes: state[action.questionId][action.answerId].votes.concat([action.userId])
                    }
                }
            };
        case REMOVE_ANSWER:
            return {
                ...state,
                [action.questionId]: {
                    ...state[action.questionId],
                    [action.answerId]: {
                        ...state[action.questionId][action.answerId],
                        votes: state[action.questionId][action.answerId].votes.filter(
                            (el: string) => el !== action.userId
                        )
                    }
                }
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.savedQuestion.id]: {
                    ...action.savedQuestion
                }
            };
        default:
            return state;
    }
}
