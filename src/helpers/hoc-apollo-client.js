import React from 'react';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbnMiOnsiYWNjZXNzIjpbeyJkZXNjcmlwdGlvbiI6InByb2R1Y3RzLmZ1bGwubW9kdWxlIiwibXBhdGgiOiIiLCJyb3V0ZUFjY2VzcyI6WzFdfV0sImFwcGxpY2F0aW9uIjoiZ3NwLXByb2R1Y3RzIiwiY29sb3IiOiIjOGI2OTUyIiwiaWNvbiI6Imxpc3RfYWx0In0sImNvbXBhbnlJZCI6MSwiY29tcGFueUxvZ28iOiJodHRwczovL2kucG9zdGltZy5jYy9OMGRteUpiSi9uYXR1cmEucG5nIiwiY29ycmVsYXRpb25JZCI6bnVsbCwiY291bnRyeUNvZGUiOiJQRSIsImNvdW50cnlJY29uIjoiaHR0cHM6Ly9pLnBvc3RpbWcuY2MvWjU5MXMydjMvcGVydS1mbGFnLXJvdW5kLWljb24tMjU2LnBuZyIsImNvdW50cnlJZCI6NjA0LCJjb3VudHJ5TnVtYmVyIjo2MDQsImZvcm1hdHMiOnsiY3VycmVuY3lDb2RlIjoiUEVOIiwiY3VycmVuY3lGb3JtYXQiOiJTLyIsImRhdGVGb3JtYXQiOiJERC9NTS9ZWVlZIiwiZGVjaW1hbFBsYWNlcyI6MiwidGltZXpvbmUiOiJBbWVyaWNhL0xpbWEifSwibGFuZ3VhZ2UiOiJlcy1QRSIsInVzZXIiOnsiZW1haWwiOiJhbWFuZGFyZWlzLmFjY2VudHVyZUBuYXR1cmEubmV0IiwiaWQiOiJhZGZzX05BVFVSQUJSXFwxOTUwMTU1MjUiLCJuYW1lIjoiQW1hbmRhIENhdmFsY2FudGUgUmVpcyAtIEFjY2VudHVyZSIsInByZWZlcnJlZFVzZXJuYW1lIjoiMTk1MDE1NTI1In0sImlhdCI6MTU3MzQ4MTkwNiwiZXhwIjoxNTczNTY4MzA2fQ.q0ucBy469XtXPDnUAcfnCjYoVP-oNMK4GMhW7iZSEsE';

function createApolloClient({ uri, webSocketLink }) {  
  const authLink = setContext((_, context) => {
    const headersContext = (!context.headers) ? {} : context.headers;

    return {
      headers: {
        ...headersContext,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  });

  const httpLink = new HttpLink({
    uri,
  });

  const wsLink = new WebSocketLink({
    uri: webSocketLink,
    options: {
      reconnect: true,
      connectionParams: {
        token: `Bearer ${token}`,
      },
      connectionCallback: (result) => {
        console.warn('result connection', result)
      },
    } 
  });

  const link = split(({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache({
      freezeResults: true
    }),
    assumeImmutableResults: true,
  });
}

function withApollo(WrapperComponent, config) {
  return (
    <MuiThemeProvider theme={config.theme}>    
      <ApolloProvider client={createApolloClient(config)}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}>
          <CssBaseline />
          <WrapperComponent />
        </SnackbarProvider>
      </ApolloProvider>
    </MuiThemeProvider>
  )
}

export default withApollo;