import { Switch, FormControlLabel } from '@material-ui/core';
import { ChangeEvent, FC, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../reducers';
import { IUser } from '../utils/_DATA';
import Question from './Question';
import './QuestionsList.css';

const QuestionsList: FC = () => {
    const [answeredFilter, setAnsweredFilter] = useState(false);

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnsweredFilter(event.target.checked);
    };

    const questionIds: string[] = useSelector((state: IStoreState) => {
        const { questions, users, authedUser } = state;

        const currUser: IUser = users[authedUser];

        if (!currUser) {
            return [];
        }

        const answeredQuestionsIds: string[] = Object.keys(currUser.answers).sort(
            (a, b) => questions[b].timestamp - questions[a].timestamp
        );

        const unansweredQuestionsIds: string[] = Object.keys(questions)
            .filter((questionId: string) => !Object.keys(currUser.answers).includes(questionId))
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

        return answeredFilter ? answeredQuestionsIds : unansweredQuestionsIds;
    });

    return (
        <Fragment>
            <h1>Questions</h1>
            <FormControlLabel
                control={<Switch checked={answeredFilter} onChange={handleFilterChange} name="filterResults" />}
                label={`Showing ${answeredFilter ? 'answered' : 'unanswered'} questions`}
            />
            <ul>
                {questionIds.map((questionId: string) => (
                    <li key={questionId}>
                        <Question id={questionId} />
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export default QuestionsList;
