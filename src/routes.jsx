import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Districts from './Containers/Districts/districts';

const routes = () => {
  return (
    <Router>
      <Route exact path="/" component={App} />
      <Route exact path="/:state/districts" component={Districts} />
    </Router>
  )
}

export default routes;