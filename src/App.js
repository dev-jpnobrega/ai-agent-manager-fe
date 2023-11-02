
import React from 'react';
import './assets/css/main.css';

import { createTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Provider } from './context/AppContext';
import Router from './components/Router';
import { SnackbarProvider } from './context/SnackbarContext';

const theme = createTheme();

function App(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider>
        <SnackbarProvider>
          <CssBaseline />
          <Router />
        </SnackbarProvider>
      </Provider>
    </MuiThemeProvider>
  )
};

export default App;

/*
export default () => withApolloAndMaterialUi(App, {
    theme,
    uri: 'http://127.0.0.1:4000/graphql',
    webSocketLink: 'ws://127.0.0.1:4000/graphql'
  }
)
*/
