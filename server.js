import path from 'path';
import express from 'express';
import proxy from 'http-proxy-middleware';
import serialize from 'serialize-javascript';
import webpack from 'webpack';
import config from './webpack.config';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import configureStore from './src/configureStore';
import routes from './src/routes';

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const API_PROXY_ADDRESS = 'http://127.0.0.1:8000/api';


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.set('env', ENVIRONMENT);
app.set('port', PORT);

if (ENVIRONMENT !== 'production') {
  const compiler = webpack(config);

  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 100
  }));

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      reasons: false,
    }
  }));

  app.use(proxy(API_PROXY_ADDRESS)); // proxy all api request to
}

app.get('*', (request, response) => {
  let store = configureStore();

  match(
    { routes, location: request.url },
    (error, redirectLocation, renderProps) => {
      if (error)
        return response.status(500).send(error.message);

      if (redirectLocation)
        response.redirect(302, redirectLocation.pathname + redirectLocation.search);

      let markup;
      if (renderProps) {
        fetchInitialData().then(() => {
          let initialState = serialize(store.getState(), { isJSON: true });

          markup = renderToString(
            <Provider store={store}>
              {<RouterContext {...renderProps} />}
            </Provider>
          )

          return response.render('index', { markup, initialState, });
        })
          .catch(e => console.log(e));

        function fetchInitialData() {
          let { query, params } = renderProps;
          let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
          let promise = comp.fetchData ?
            comp.fetchData({ query, params, store }) :
            Promise.resolve();

          return promise;
        }

      } else {
        // markup = renderToString(<NotFound />);
        response.status(404).send('Not Found'); // TODO: <NotFound /> component here
      }
    });
});

app.listen(PORT, err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`The server is running on port ${PORT} [${ENVIRONMENT}]`);
})
