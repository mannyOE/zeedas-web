import React from "react";
import { Redirect, Switch, withRouter } from "react-router-dom";
import authRoutes from "../zeedas-routes/auth-routes";
import AuthPageLayout from "./components/AuthPageLayout";
import NonAuthenticatedRoute from "../zeedas-routes/non-authenticated-routes-hoc";
import { authActions } from "../state/redux/auth/actions";
import { history } from "../state/history";

const Authentication = (authProps) => (
  <AuthPageLayout>
    <Switch>
      {authRoutes.map((prop, key) => {
        if (prop.redirect) {
          return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
        }

        if (prop.verifySubdomain) {
          const verifySubdomain = async () => {
            // const { location } = authProps;
            const { location } = window;

            const hostnameArray = location.hostname.split(".");

            const subdomain = hostnameArray.length > 2
              ? hostnameArray[0]
              : "";

            if (subdomain) {
              const companyData = await authActions.verifyCompany(
                { company: subdomain },
                { autoRoute: false },
              );

              if (companyData && companyData.account) {
                return history.push(`${companyData.account}/authentication/login`);
              }
            }
          };

          verifySubdomain();
        }

        return (
          <NonAuthenticatedRoute
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      })}
    </Switch>
  </AuthPageLayout>
);

export default withRouter(Authentication);
