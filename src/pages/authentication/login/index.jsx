import React from "react";
import { connect } from "react-redux";
import {
  Row, Col, FormGroup, Form,
} from "reactstrap";

import { Link } from "react-router-dom";
import ButtonIconLeft from "../../../zeedas-components/button-icon-left";
import ZeedasInput from "../../../zeedas-components/input";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import OrSeparator from "../_components/OrSeparator";
import validators from "../../../utils/validators";
import {
  LOCAL_STORE_COMPANY,
  SLACK_AUTH_URL,
  LOCAL_STORE_REDIRECT_URL,
} from "../../../utils/constants";
import { authActions } from "../../../state/redux/auth/actions";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";
import { notify } from "../../../zeedas-components/bottom-notification";
import { NOTIFICATION_FAILURE } from "../../../constants";
import GoogleLoginButton from "../_components/GoogleLoginButton";
import SlackIcon from "../../../zeedas-assets/icons/icon-slack";
import colors from "../../../utils/colors";
import "./style.scss";
import EyeIcon from "zeedas-assets/icons/icon-eye";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      companyData: JSON.parse(window.localStorage.getItem(LOCAL_STORE_COMPANY)),
      showPassword:false
    };

    this.validators = validators;
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("code")) {
      const code = params.get("code");
      const { company } = this.state.companyData;
      const payload = {
        company,
        code,
        url: SLACK_AUTH_URL,
      };
      this.props.dispatch(authActions.loginWithSlack(payload));
      window.localStorage.removeItem(LOCAL_STORE_REDIRECT_URL);
    } else if (!this.state.companyData) {
      this.props.history.push("/authentication/company-name");
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.formValidators([event.target.name], event.target.value);
  };

  formValidators = (fieldName, value) => {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
  }

  validForm = () => {
    let status = true;
    Object.keys(this.validators).forEach((field) => {
      if (field === "email" || field === "password") {
        if (!this.validators[field].valid) {
          status = false;
        }
      }
    });
    return status;
  }

  showErrors = (fieldName) => {
    const validator = this.validators[fieldName];
    const result = "";
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => (
        <span className="error" key={index}>
          *
          {info}
          <br />
        </span>
      ));
      return <div className="error mb-2">{errors}</div>;
    }
    return result;
  }

  attemptLogin = () => {
    const { email, password, companyData } = this.state;

    if (email === "" || password === "") {
      notify("Please fill all fields", NOTIFICATION_FAILURE);
      return;
    }

    const payload = {
      email,
      company: companyData.company,
      password,
    };

    this.props.dispatch(authActions.login(payload));
  };

  onGoogleLoginResponse = (response) => {
    const { companyData } = this.state;

    if (response.error) {
      notify(response.error, NOTIFICATION_FAILURE);
      return;
    }

    const payload = {
      access_token: response.accessToken,
      company: companyData.company,
    };
    this.props.dispatch(authActions.loginWithGoogle(payload));
  };

  attemptSlackLogin = () => {
    window.localStorage.setItem(LOCAL_STORE_REDIRECT_URL, window.location.href);

    window.location.assign(`${SLACK_AUTH_URL}`);
  };

  onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.attemptLogin();
    }
  };
  toggleShowPassword = () => {
    const {showPassword} = this.state;
    this.setState({showPassword: !showPassword});
  }

  render() {
    const { password, email, companyData, showPassword } = this.state;
    const { requesting } = this.props;

    return (
      <>
        <Row>
          <Col
            md="12"
            className="login-pointer d-flex justify-content-end align-items-center"
          >
            <p className="pr-2 mb-0">Don't have an account? &nbsp;</p>
            <Link
              className="font-bold font-18"
              to="/authentication/company-signup"
            >
              Sign up
            </Link>
          </Col>
        </Row>
        <div className="right-side-content">
          <div style={{ maxWidth: "475px" }}>
            <h2>Try Zeedas for free</h2>
            <p>
              Please use your work email address so we can connect you with
              {" "}
              { companyData
                ? companyData.company
                : "your team"}
              {" "}
              in zeedas.
            </p>

            {/* TODO: uncomment when the slack and google login features are ready - MEL */}
            {/* <Row className="my-2">
              <Col md="6" className="d-flex justify-content-center p-2">
                <ButtonIconLeft
                  width="100%"
                  borderRadius="5px"
                  boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
                  onClick={this.attemptSlackLogin}
                  icon={<SlackIcon size={30} />}
                  text="Login with Slack"
                  color="zd-white"
                  fontColor={colors.ZEEDAS_BLUE_INVERSE}
                />
              </Col>
              <Col md="6" className="d-flex justify-content-center p-2">
                <GoogleLoginButton
                  buttonText="Login with Google"
                  company={companyData}
                  onGoogleLoginResponse={this.onGoogleLoginResponse}
                  // noCompanyCallback={() =>
                  //   notify(NO_COMPANY_MESSAGE_GOOGLE, NOTIFICATION_FAILURE)
                  // }
                />
              </Col>
            </Row>

            <OrSeparator /> */}

            <Form
              className="forms login-form"
              onKeyDown={this.onKeyDownHandler}
            >
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Email address"
                  placeholder="e.g: John@zeedas.com"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.onInputChange}
                />
              </FormGroup>
              {this.showErrors("email")}
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Password"
                  placeholder="e.g: *********"
                  type={showPassword? "text" :"password"}
                  name="password"
                  value={password}
                  onChange={this.onInputChange}
                />
                <div 
									onClick={this.toggleShowPassword}
									
									className="input-hide-btn">
									<EyeIcon />
								</div>
              </FormGroup>
              <FormGroup className="py-1">
                <Row>
                  <Col className="d-flex justify-content-end p-2 pr-3">
                    <Link
                      style={{ color: colors.ZEEDAS_DARK_BLUE }}
                      className="font-bold"
                      to="/authentication/forgot-password"
                    >
                      Forgot my login credentials
                    </Link>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="py-1">
                <BlockLevelButton
                  onClick={this.attemptLogin}
                  color="zd-blue"
                  disabled={requesting}
                >
                  <span>{requesting ? <ButtonLoadingIcon /> : "Log in"}</span>
                </BlockLevelButton>
              </FormGroup>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { requests, auth } = state;
  return {
    requesting: requests.requesting,
    auth,
  };
}
export default connect(mapStateToProps)(Login);
