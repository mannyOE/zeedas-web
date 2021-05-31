import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "../state/redux/store";
import { authActions } from "../state/redux/auth/actions";

export const SubdomainRouter = ({ from }) => (
  <Route
    path="/"
    render={async (props) => {
      const { hostname } = props.location;
      const hostnameArray = hostname.split(".");
      const subdomain = hostnameArray.length > 2
        ? hostnameArray[0]
        : "";

      const companyData = await authActions.verifyCompany(
        { company: subdomain },
        { autoRoute: false },
      );

      if (!companyData || !companyData.company) {
        // not logged in so redirect to login page with the return url *
        // logged in so redirect to home page with the return url
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
      return (
        <Redirect
          to={{
            pathname: from,
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

export default SubdomainRouter;
