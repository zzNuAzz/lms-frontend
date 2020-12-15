import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Page from './Pages/Page';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2a73cc',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        {/* <MuiPickersUtilsProvider utils={DateMomentUtils}> */}
        <Page />
        {/* </MuiPickersUtilsProvider> */}
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
