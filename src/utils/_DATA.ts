import { formatQuestion } from './helpers';

export interface ISavedQuestion {
    optionOneText: string;
    optionTwoText: string;
    author: string;
}

export interface ISavedAnswer {
    authedUser: string;
    qid: string;
    answer: string;
}

export interface IUser {
    [index: string]: any; //Defines that this is indexable
    id: string;
    name: string;
    avatarURL: string;
    answers: { [key: string]: string };
    questions: string[];
}

export interface IQuestionOption {
    votes: string[]; //string of the users ids
    text: string;
}

export interface IQuestion {
    [index: string]: any; //Defines that this is indexable
    id: string;
    author: string;
    timestamp: number;
    optionOne: IQuestionOption;
    optionTwo: IQuestionOption;
}

let users: { [key: string]: IUser } = {
    sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: '',
        answers: {
            '8xf0y6ziyjabvozdd253nd': 'optionOne',
            '6ni6ok3ym7mf1p33lnez': 'optionTwo',
            am8ehyc8byjqgar0jgpub9: 'optionTwo',
            loxhs1bqm25b708cmbf3g: 'optionTwo'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    tylermcginnis: {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        avatarURL: '',
        answers: {
            vthrdm985a262al8qx3do: 'optionOne',
            xj352vofupe1dqz9emx13r: 'optionTwo'
        },
        questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
    },
    johndoe: {
        id: 'johndoe',
        name: 'John Doe',
        avatarURL: '',
        answers: {
            xj352vofupe1dqz9emx13r: 'optionOne',
            vthrdm985a262al8qx3do: 'optionTwo',
            '6ni6ok3ym7mf1p33lnez': 'optionTwo'
        },
        questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
    }
};

let questions: { [key: string]: IQuestion } = {
    '8xf0y6ziyjabvozdd253nd': {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
            votes: ['sarahedo'],
            text: 'have horrible short term memory'
        },
        optionTwo: {
            votes: [],
            text: 'have horrible long term memory'
        }
    },
    '6ni6ok3ym7mf1p33lnez': {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'johndoe',
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: 'become a superhero'
        },
        optionTwo: {
            votes: ['johndoe', 'sarahedo'],
            text: 'become a supervillain'
        }
    },
    am8ehyc8byjqgar0jgpub9: {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'sarahedo',
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: 'be telekinetic'
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be telepathic'
        }
    },
    loxhs1bqm25b708cmbf3g: {
        id: 'loxhs1bqm25b708cmbf3g',
        author: 'tylermcginnis',
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: 'be a front-end developer'
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be a back-end developer'
        }
    },
    vthrdm985a262al8qx3do: {
        id: 'vthrdm985a262al8qx3do',
        author: 'tylermcginnis',
        timestamp: 1489579767190,
        optionOne: {
            votes: ['tylermcginnis'],
            text: 'find $50 yourself'
        },
        optionTwo: {
            votes: ['johndoe'],
            text: 'have your best friend find $500'
        }
    },
    xj352vofupe1dqz9emx13r: {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'johndoe',
        timestamp: 1493579767190,
        optionOne: {
            votes: ['johndoe'],
            text: 'write JavaScript'
        },
        optionTwo: {
            votes: ['tylermcginnis'],
            text: 'write Swift'
        }
    }
};

export async function _getUsers(): Promise<any> {
    return new Promise((res) => {
        setTimeout(() => res({ ...users }), 1000);
    });
}

export async function _getQuestions(): Promise<any> {
    return new Promise((res) => {
        setTimeout(() => res({ ...questions }), 1000);
    });
}

export async function _saveQuestion(question: ISavedQuestion): Promise<any> {
    return new Promise((res) => {
        const authedUser = question.author;
        const formattedQuestion = formatQuestion(question);

        setTimeout(() => {
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion
            };

            users = {
                ...users,
                [authedUser]: {
                    ...users[authedUser],
                    questions: users[authedUser].questions.concat([formattedQuestion.id])
                }
            };

            res(formattedQuestion);
        }, 1000);
    });
}

export async function _saveQuestionAnswer(savedAnswer: ISavedAnswer): Promise<void> {
    const { authedUser, qid, answer } = savedAnswer;

    return new Promise((res) => {
        setTimeout(() => {
            users = {
                ...users,
                [savedAnswer.authedUser]: {
                    ...users[savedAnswer.authedUser],
                    answers: {
                        ...users[savedAnswer.authedUser].answers,
                        [qid]: savedAnswer.answer
                    }
                }
            };

            questions = {
                ...questions,
                [qid]: {
                    ...questions[qid],
                    [answer]: {
                        ...questions[qid][answer],
                        votes: questions[qid][answer].votes.concat([authedUser])
                    }
                }
            };

            res();
        }, 500);
    });
}
