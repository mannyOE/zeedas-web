import React, { useEffect } from "react";
import firebase from "firebase";
import {
  Router, Route, Switch, Redirect,
} from "react-router-dom";
import { Provider, useDispatch, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { history } from "./state/history";
import { store, persist } from "./state/redux/store";
import JulietsComponentsDemo from "./zeedas-components/Juliets-components-demo";
import TundeComponentsDemo from "./zeedas-components/Tunde-Components-Demo";
// eslint-disable-next-line import/no-cycle
import indexRoutes from "./zeedas-routes/index-routes";
import publicRoutes from "./zeedas-routes/public-routes";
import { AuthenticatedRoute } from "./zeedas-routes/authenticated-routes-hoc";
import BottomNotification from "./zeedas-components/bottom-notification";
import IFrame from "./pages/project/test/i-frame";
import PageLoader from "./zeedas-components/page-loader";

import { initializeFirebase } from "./services/firebase";
import SubdomainRouter from "./zeedas-routes/subdomain-router";
import {AppUtils} from "./utils/app-utils";
import {USER_ROLES} from "./state/redux/users/types";
import {APP_ROLES} from "./utils/constants";
import DesktopAppDownload from "./pages/authentication/desktop-app-download";

const stripePromise = loadStripe("pk_test_TbvSniXym2EjIL2p15uSPBC100GJturkKW");

const FontFaceObserver = require("fontfaceobserver");

const Fonts = () => {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&display=swap";
  link.rel = "stylesheet";

  document.head.appendChild(link);

  const nunito = new FontFaceObserver("Nunito Sans");

  nunito.load().then(() => {
    document.documentElement.classList.add("nunito");
  });
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setNotificationToken = this.props.$setNotificationToken;
  }

  componentDidMount() {
    Fonts();
    // initializeFirebase();
  }

  render() {
    return (
      <>
        <BottomNotification />

        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persist}> */}
          <PersistGate loading={<PageLoader />} persistor={persist}>
            <Elements stripe={stripePromise}>
              <Router basename="/" history={history}>
                <Switch>
                  {/* <SubdomainRouter from={this.props.location.pathname} /> */}
                  {/*<Route
                    path="/*"
                    render={(props) => {
                      if (userIsSD) {
                        return (
                          <Redirect
                            to={{
                              pathname: "/download-desktop-app",
                              search: props.location.search,
                            }}
                          />
                        );
                      }
                      return (
                        <Redirect
                          to={{
                            pathname: props.location.pathname,
                            search: props.location.search,
                          }}
                        />
                      );
                    }}
                  />*/}
                  <Route
                    exact
                    path="/confirm-account"
                    render={(props) => (
                      <Redirect
                        to={{
                          pathname: "/authentication/confirm-account",
                          search: props.location.search,
                        }}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/reset-password"
                    render={(props) => (
                      <Redirect
                        to={{
                          pathname: "/authentication/reset-password",
                          search: props.location.search,
                        }}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/confirm-invite/:token"
                    render={(props) => (
                      <Redirect
                        to={{
                          pathname: `/authentication/confirm-invite/${props.match.params.token}`,
                          search: props.location.search,
                        }}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/ref"
                    render={(props) => (
                      <Redirect
                        to={{
                          pathname: "/authentication/company-signup",
                          search: props.location.search,
                        }}
                      />
                    )}
                  />
                  <Route
                    path="/juliet-components-demo"
                    component={JulietsComponentsDemo}
                  />
                  <Route
                    path="/tunde-components-demo"
                    component={TundeComponentsDemo}
                  />
                  ;
                  {publicRoutes.map((route, key) => (
                    <Route
                      key={key}
                      path={route.path}
                      component={route.component}
                    />
                  ))}
                  <AuthenticatedRoute
                    path="/test/:module"
                    component={IFrame}
                  />

                  {indexRoutes.map((prop, key) => (
                    <AuthenticatedRoute
                      path={prop.path}
                      key={key}
                      component={prop.component}
                    />
                  ))}
                </Switch>
              </Router>
            </Elements>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default App;
