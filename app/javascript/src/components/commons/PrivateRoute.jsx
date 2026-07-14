import React from "react";

import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  ...props
}) => {
  if (!condition) {
    return (
      <Redirect
        exact
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return <Route exact component={Component} path={path} {...props} />;
};

export default PrivateRoute;
