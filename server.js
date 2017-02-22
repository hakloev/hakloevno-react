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

import appConfig from './config';

import configureStore from './src/configureStore';
import routes from './src/routes';
import NotFound from './src/components/NotFound';

global.__CLIENT__ = false;

const ENVIRONMENT = process.env.NODE_ENV || 'development';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.set('env', ENVIRONMENT);
app.set('port', appConfig.ports.server);

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

  app.use(proxy(appConfig.proxy.apiProxy)); // proxy all api request to

} else {
  app.use('/dist', express.static('dist'));
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
        fetchInitialData()
          .then(() => {
            let initialState = serialize(store.getState(), { isJSON: true });

            markup = renderToString(
              <Provider store={store}>
                {<RouterContext {...renderProps} />}
              </Provider>
            )

            return response.render('index', { markup, initialState, });
          })
          .catch(err => console.error(`[match][fetchInitialData] Error: ${err}`));

        function fetchInitialData() {
          let { query, params } = renderProps;
          let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
          let promise = comp.fetchData ?
            comp.fetchData({ query, params, store }) :
            Promise.resolve();

          return promise;
        }

      } else {
        markup = renderToString(<NotFound />);
        response.status(404).render('index', { markup }); // TODO: <NotFound /> component here
      }
    });
});

app.listen(appConfig.ports.server, err => {
  if (err) {
    console.error(`[app][listen] Error: ${err}`);
    return;
  }

  console.log(`The server is running on port ${appConfig.ports.server} [${ENVIRONMENT}]`);
})
