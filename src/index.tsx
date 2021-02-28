import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, Store } from 'redux';
import App from './components/App';
import './index.css';
import middleware from './middleware';
import reducer from './reducers';

const store: Store = createStore(reducer, middleware);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
