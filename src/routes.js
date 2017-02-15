import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainLayout from './layout/MainLayout';
import Home from './containers/Home';

// import NotFound from './components/NotFound.jsx';
import Test from './components/Test';


export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={Home} />
    <Route path="/test" component={Test} />
    {/*<Route status={404} path="*" component={NotFound} />*/}
  </Route>
);
