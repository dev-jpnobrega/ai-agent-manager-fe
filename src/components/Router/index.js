import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import routes from '../../routers';

export default function RouterComponent({ children }) {

  function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={props => (
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }

  return (
    <HashRouter>
      { children }
      <Switch>
          {
            routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))
          }
      </Switch>
    </HashRouter>
  )
}