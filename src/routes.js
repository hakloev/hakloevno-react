import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainLayout from './layout/MainLayout';
import Home from './containers/Home';
import Article from './containers/Article';

import NotFound from './components/NotFound.js';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={Home} />
    <Route path="/articles/:slug" component={Article} />
    <Route status={404} path="*" component={NotFound} />
  </Route>
);
