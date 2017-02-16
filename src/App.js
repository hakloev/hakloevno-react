import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import makeRoutes from './routes';

export default class App extends React.Component {

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {makeRoutes}
        </Router>
      </Provider>
    );
  }
}
