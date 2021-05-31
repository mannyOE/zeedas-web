import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "../state/redux/store";

export const NonAuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const { auth } = store.getState();
      if (auth.userData) {
        // not logged in so redirect to login page with the return url *
        // logged in so redirect to home page with the return url
        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        );
      }

      // check if the company account is defined. If not redirect to
      // company name page
      const companyAccount = props.match.params.company_name;
      if (companyAccount === "undefined") {
        return (
          <Redirect
            to={{
              pathname: "/authentication/company-name",
              state: { from: props.location },
            }}
          />
        );
      }

      // not logged in so return component
      return <Component {...props} />;
    }}
  />
);

export default NonAuthenticatedRoute;
