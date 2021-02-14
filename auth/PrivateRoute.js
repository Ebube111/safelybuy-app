import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from ".";

const PrivateRoute = (props) => (
  <Route>
    {Auth.isAuthenticated() ? props.children : <Redirect to="/login" />}
  </Route>
);

export default PrivateRoute;
