import React from 'react';
import PT from 'prop-types';
import { Switch, Route } from 'react-router-dom';

const MainRoute = ({ routes = [] }) => {
  const loopRoute = routeTrees => {
    return routeTrees.map(({ name, path, exact, component: Comp, children = [] }, index) => {
      return (
        <Route
          key={name}
          path={path}
          exact={exact}
          render={props => {
            if (children.length > 0) {
              return (
                <div>
                  <Comp props={props}></Comp>
                  <Switch>
                    {children.map(child => (
                      <Route
                        key={child.name}
                        path={`${path}/${child.path}`}
                        exact={child.exact}
                        component={child.component}
                      />
                    ))}
                  </Switch>
                </div>
              );
            }
            return <Comp props={props} />
          }}
        />
      )
    });
  };
  return (
    <Switch>
      {loopRoute(routes)}
    </Switch>
  );
};

MainRoute.propTypes = {
  routes: PT.array.isRequired
};

MainRoute.defaultProps = {
  routes: []
};

export default MainRoute;
