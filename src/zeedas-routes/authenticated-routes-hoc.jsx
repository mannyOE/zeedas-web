import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "../state/redux/store";
import { AppUtils } from "../utils/app-utils";

export const AuthenticatedRoute = ({
  component: Component,
  authorisedRoles,
  countries,
  ...rest
}) => (
  <Route
    exact
    {...rest}
    render={(props) => {
      const { auth } = store.getState();
      const companyAccount = props.match.params.company_name;
      if (!auth.userData) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: companyAccount
                ? `/${companyAccount}/authentication/login`
                : "/authentication/login",
              state: { from: props.location },
            }}
          />
        );
      }

      const pathArray = props.location.pathname.split("/");
      const protectedPath = pathArray[1];
      const authorisedPageRoles = authorisedRoles || AppUtils.getAuthorisedPageRoles(protectedPath);
      if (
        authorisedPageRoles
        && authorisedPageRoles.indexOf(AppUtils.getCurrentUserRole()) === -1
        /* TODO: swap above line with below line - MEL */
        // && AppUtils.getCurrentUserRolesList()
        //   .every((role) => authorisedPageRoles.indexOf(role) === -1)
      ) {
        // role not authorised so redirect to appropriate home page
        return (
          <Redirect
            to={{
              pathname: AppUtils.getDefaultHomeRoute(
                AppUtils.getCurrentUserRole(),
              ),
            }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

export default AuthenticatedRoute;
