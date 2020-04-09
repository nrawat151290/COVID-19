import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import App from './App';
import Districts from './Containers/Districts/districts';

const routes = () => {
  return (
    <Router basename="/">
      <Route exact path="/" component={App} />
      <Route exact path="/:state/districts" component={Districts} />
    </Router>
  )
}

export default routes;