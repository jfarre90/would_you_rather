import { FC } from 'react';
import { useLocation } from 'react-router-dom';

const NoMatch: FC = () => {
    const location = useLocation();

    return (
        <div>
            <h1>Error 404</h1>
            <h3>
                No page found for <code>{location.pathname}</code>
            </h3>
        </div>
    );
};

export default NoMatch;
