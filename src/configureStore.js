import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore(preloadedState) {

	const middleware = [
		thunk,
	];

  const store = createStore(
      rootReducer,
      preloadedState,
      compose(
        applyMiddleware(...middleware),
        (process.env.NODE_ENV === 'development' && window.devToolsExtension) ? window.devToolsExtension() : f => f,
      )
  );

	if (module.hot) {
	// Enable Webpack hot module replacement for reducers
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer)
    });
  }

  return store;
}
