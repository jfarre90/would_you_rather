import { IReceivedQuestionsAction, RECEIVE_QUESTIONS } from '../actions/questions';

export default function users(state = {}, action: IReceivedQuestionsAction | any): any {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };
        default:
            return state;
    }
}
