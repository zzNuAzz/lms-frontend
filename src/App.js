import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DateMomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Page from './Pages/Page';

function App() {
  return (
    <Router>
      {/* <MuiPickersUtilsProvider utils={DateMomentUtils}> */}
      <Page />
      {/* </MuiPickersUtilsProvider> */}
    </Router>
  );
}

export default App;
