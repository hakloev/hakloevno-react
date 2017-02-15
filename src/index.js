import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

require('../styles/base.scss');

import App from './App';
import HMRContainer from './containers/HMRContainer';
import makeRoutes from './routes';
import configureStore from './configureStore';

const appMount = document.getElementById('app');

const preloadedState = window.__INITIAL_STATE__;

delete window.__INITIAL_STATE__ // Remove the inital state from window after initializing

const store = configureStore(preloadedState);

try {
  ReactDOM.render(
		<HMRContainer>
			<App store={store}/>
		</HMRContainer>,
		appMount
	);

  if (module.hot) {
    module.hot.accept(() => {

      ReactDOM.render(
        <HMRContainer>
          <App store={store} />
        </HMRContainer>,
        appMount
      );
    });
  }
} catch (err) {
  console.error('Render Error:', err);
}
