
import React from 'react';
import './assets/css/main.css';

import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Provider } from './context';
import Router from './components/Router';


const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#757ce8',
      main: '#FFFFFF',
      dark: '#002884',
      contrastText: '#000000',
    },
    secondary: {
      light: '#f50057',
      main: '#000000',
      dark: '#ba000d',
      contrastText: '#FFFFFF',
    },
  },
});

function App(props) {
  return (
    <MuiThemeProvider theme={theme}> 
      <Provider>           
        <CssBaseline />   
        <Router />
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
