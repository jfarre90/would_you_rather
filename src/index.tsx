import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './index.css';

// const store = createStore(reducer, middleware);

ReactDOM.render(
    // <Provider store={store}>
    <Router>
        <App />
    </Router>,
    // </Provider>,
    document.getElementById('root'),
);
