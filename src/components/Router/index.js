import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
    <Router>
      { children }
      <Switch>
          {
            routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))
          }
      </Switch>
    </Router>
  )
}