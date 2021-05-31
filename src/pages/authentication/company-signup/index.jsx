import React from "react";
import {
  Row, Col, FormGroup, Form, Tooltip,
} from "reactstrap";
import { connect } from "react-redux";
import PasswordCheckNotValidIcon from "zeedas-assets/icons/icon-password-check-not-valid";
import PasswordCheckValidIcon from "zeedas-assets/icons/icon-password-check-valid";
import { Link } from "react-router-dom";
import ButtonIconLeft from "../../../zeedas-components/button-icon-left";
import ZeedasInput from "../../../zeedas-components/input";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import ZeedasCheckbox from "../../../zeedas-components/checkbox";
import OrSeparator from "../_components/OrSeparator";
import validators from "../../../utils/validators";
import colors from "../../../utils/colors";
import { authActions } from "../../../state/redux/auth/actions";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";
import SlackIcon from "../../../zeedas-assets/icons/icon-slack";
import {
  SLACK_AUTH_URL,
  LOCAL_STORE_REDIRECT_URL,
} from '../../../utils/constants';
import GoogleLoginButton from '../_components/GoogleLoginButton';
import { notify } from '../../../zeedas-components/bottom-notification';
import { NOTIFICATION_FAILURE } from '../../../constants';
import EyeIcon from 'zeedas-assets/icons/icon-eye';

class CompanySignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      password: "",
      email: "",
      termsChecked: false,
      referalCode: null,
      openPasswordTooltip: false,
      showPassword:false
    };

    this.validators = validators;
  }

  componentDidMount() {
    if (window.location.href.includes("ref")) {
      const pathArray = window.location.href.split("=");
      const referralCode = pathArray[pathArray.length - 1];
      this.setState({ referralCode });
    } else {
      const params = new URLSearchParams(window.location.search);
      if (params.has("code")) {
        const code = params.get("code");
        // const company = params.get("company");
        const payload = {
          // company,
          code,
          url: SLACK_AUTH_URL,
        };
        this.props.dispatch(authActions.signupWithSlack(payload));
        window.localStorage.removeItem(LOCAL_STORE_REDIRECT_URL);
      }
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "password" && !this.state.openPasswordTooltip) {
      this.togglePasswordTooltip();
    }
    this.formValidators([event.target.name], event.target.value);
  };

  onCheckChanged = (event) => {
    this.setState({ termsChecked: event.target.checked });
  };

  formValidators(fieldName, value) {
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

  validForm() {
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


  showErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = "";
    if (validator && !validator.valid && validator.state !== "") {
      const errors = validator.errors.map((info, index) => (
        <span className="error" key={index}>
          {info}
          <br />
        </span>
      ));
      return <div className="error mb-2">{errors}</div>;
    }
    return result;
  }

  togglePasswordTooltip = () => {
    const { openPasswordTooltip } = this.state;
    this.setState({ openPasswordTooltip: !openPasswordTooltip });
  };
  toggleShowPassword = () => {
    const {showPassword} = this.state;
    this.setState({showPassword: !showPassword});
  }

  showPasswordValidStatus = (message) => {
    const { password } = this.state;
    const passwordErrors = [...this.validators.password.errors];
    if (password === "" || passwordErrors.includes(message)) {
      return (
        <div>
          <span>
            <PasswordCheckNotValidIcon />
          </span>
          {" "}
          <span>{message}</span>
        </div>
      );
    }
    return (
      <div className="validation-text-bold">
        <span>
          <PasswordCheckValidIcon />
        </span>
        {" "}
        <span>{message}</span>
      </div>
    );
  };

  renderPasswordValidationCheck = () => {
    const passwordRules = [...validators.password.rules];
    return (
      <div>
        <div className="password-validation-title">Password Requirements</div>
        {passwordRules.map((rule, index) => (
          <div key={index} className="validation-text">
            {this.showPasswordValidStatus(rule.message)}
          </div>
        ))}
      </div>
    );
  };

  onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.attemptSignup();
    }
  };

  attemptSignup = () => {
    const {
      company, email, password, referralCode,
    } = this.state;

    const payload = {
      email,
      company,
      password,
    };

    if (referralCode !== null) {
      payload.referalCode = referralCode;
    }

    this.props.dispatch(authActions.companySignUp(payload));
  };

  onGoogleLoginResponse = (response) => {
    if (response.error) {
      notify(response.error, NOTIFICATION_FAILURE);
      return;
    }

    const payload = {
      access_token: response.accessToken,
      // company: this.state.company,
    };
    this.props.dispatch(authActions.signupWithGoogle(payload));
  };

  attemptSlackSignup = () => {
    window.localStorage.setItem(LOCAL_STORE_REDIRECT_URL, window.location.href);
    window.location.assign(`${SLACK_AUTH_URL}`);
  };

  render() {
    const {
      password,
      company,
      email,
      termsChecked,
      openPasswordTooltip,
      showPassword
    } = this.state;
    const { requesting } = this.props;

    return (
      <>
        <Row>
          <Col
            md="12"
            className="login-pointer d-flex justify-content-end align-items-center"
          >
            <p className="pr-2 mb-0">Already have an account? &nbsp;</p>
            <Link className="font-bold font-18" to="/authentication/login">
              Login
            </Link>
          </Col>
        </Row>
        <div className="right-side-content">
          <div style={{ maxWidth: "475px" }}>
            <h2>Try Zeedas for free</h2>
            <p>
              Please use your work email address so we can connect you with your
              team in zeedas.
            </p>


            {/* TODO: uncomment below when feature is ready - MEL */}
            {/* <Row className="my-4">
              <Col md="6" className="d-flex py-2">
                <ButtonIconLeft
                  width="100%"
                  borderRadius="5px"
                  boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
                  onClick={this.attemptSlackSignup}
                  icon={<SlackIcon size={30} />}
                  text="Sign up with Slack"
                  fontColor={colors.ZEEDAS_BLUE_INVERSE}
                  color="zd-white"
                />
              </Col>
              <Col md="6" className="d-flex py-2">
                <GoogleLoginButton
                  buttonText="Sign up with Google"
                  onGoogleLoginResponse={this.onGoogleLoginResponse}
                  company={company}
                  // noCompanyCallback={() => {
                  // notify(NO_COMPANY_MESSAGE_GOOGLE, NOTIFICATION_FAILURE)
                  // }}
                />
              </Col>
            </Row>

            <OrSeparator /> */}

            <Form
              className="forms company-signup-form"
              onKeyDown={this.onKeyDownHandler}
            >
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Company Name"
                  placeholder="e.g: Natterbase"
                  type="text"
                  name="company"
                  value={company}
                  onChange={this.onInputChange}
                />
              </FormGroup>
              {this.showErrors("companyName")}
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Work Email"
                  placeholder="e.g: John@zeedas.com"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.onInputChange}
                />
              </FormGroup>
              {this.showErrors("email")}

              <Tooltip
                placement="top-end"
                trigger="hover"
                toggle={this.togglePasswordTooltip}
                isOpen={openPasswordTooltip}
                target="password"
                className="password-tooltip"
                innerClassName="password-tooltip-inner"
                arrowClassName="password-tooltip-arrow"
              >
                {this.renderPasswordValidationCheck()}
              </Tooltip>
              <FormGroup className="py-1">
                <ZeedasInput
                  id="password"
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
                <ZeedasCheckbox
                  id="signup-terms"
                  text="By signing up, you agree to the Terms and conditions and Privacy policy of Zeedas"
                  checked={termsChecked}
                  handleCheckboxChange={this.onCheckChanged}
                />
              </FormGroup>
              <FormGroup className="py-1">
                <BlockLevelButton
                  onClick={this.attemptSignup}
                  color="zd-blue"
                  disabled={!termsChecked || !this.validForm()}
                >
                  {requesting ? <ButtonLoadingIcon /> : "Create account"}
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
  const { requests } = state;
  return {
    requesting: requests.requesting,
  };
}
export default connect(mapStateToProps)(CompanySignUp);
