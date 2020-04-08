import React from 'react';
import Container from '@material-ui/core/Container';
import './App.scss';
import pollyfills from './Configs/polyfills';
import Home from './Containers/Home';
import moment from 'moment';

pollyfills();
const App = () => {
  return (
    <Container>
      <Home />
    </Container>
  )
}

export default App;

window.moment = moment;
