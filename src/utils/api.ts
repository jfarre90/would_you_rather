import { ISavedAnswer, ISavedQuestion, _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from './_DATA';

export async function getInitialData(): Promise<any> {
    return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
        users,
        questions
    }));
}

export async function saveQuestion(question: ISavedQuestion): Promise<any> {
    return _saveQuestion(question);
}

export async function saveQuestionAnswer(answer: ISavedAnswer): Promise<any> {
    return _saveQuestionAnswer(answer);
}
