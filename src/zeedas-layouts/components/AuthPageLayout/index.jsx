import React from "react";
import AuthLeftSection from "../AuthLeftSection";
import "./style.scss";

const AuthPageLayout = (props) => (
  <main className="auth">
    <div className="container ml-0">
      <div className="row">
        <div className="col-md-5 auth-left-side d-flex flex-column justify-content-between">
          <AuthLeftSection />
        </div>
        <div className="col auth-right-side">
          <div className="mx-md-5">
            { props.children }
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default AuthPageLayout;
