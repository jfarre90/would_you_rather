import { FC } from 'react';
import NavBar from './NavBar';

const NoMatch: FC = () => (
    <div>
        <NavBar />
        <h1>Error 404</h1>
        <h3>The page you were trying to reach was not found</h3>
    </div>
);

export default NoMatch;
