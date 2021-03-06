import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, Store } from 'redux';
import { ReduxAction } from './actions/shared';
import App from './components/App';
import './index.css';
import middleware from './middleware';
import reducer, { IStoreState } from './reducers';

const store: Store<IStoreState, ReduxAction> = createStore(reducer, middleware);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
