import React from "react";
import {
  Row, Col, FormGroup, Form, Tooltip,
} from "reactstrap";
import { connect } from "react-redux";

import PasswordCheckNotValidIcon from "zeedas-assets/icons/icon-password-check-not-valid";
import PasswordCheckValidIcon from "zeedas-assets/icons/icon-password-check-valid";
import { Link } from "react-router-dom";
import { authActions } from "state/redux/auth/actions";
import ZeedasInput from "../../../zeedas-components/input";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import ZeedasCheckbox from "../../../zeedas-components/checkbox";
import validators from "../../../utils/validators";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";
import { usersActions } from "../../../state/redux/users/actions";
import AuthPageLayout from "../../../zeedas-layouts/components/AuthPageLayout";
import ZeedasPhoneInput from "../../../zeedas-components/phone-number-input";
import {LOCAL_STORE_COMPANY} from "../../../utils/constants";
import EyeIcon from "zeedas-assets/icons/icon-eye";


class UserSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      fullName: "",
      phoneNumber: "",
      token: "",
      openPasswordTooltip: false,
      phoneNumberHasError: false,
      showPassword:false
    };

    this.validators = validators;
  }

  componentDidMount() {
    const pathArray = window.location.pathname.split("/");
    this.setState({ token: pathArray[pathArray.length - 1] });
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

  onPhoneInputChange = (phoneNumber) => {
    this.setState({
      phoneNumber,
    });
  };

  setPhoneNumberError = (val) => {
    this.setState({ phoneNumberHasError: val });
  };

  onCheckChanged = (event) => {
    this.setState({ termsChecked: event.target.checked });
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
  };

  showErrors = (fieldName) => {
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
  };

  togglePasswordTooltip = () => {
    const { openPasswordTooltip } = this.state;
    this.setState({ openPasswordTooltip: !openPasswordTooltip });
  };

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

  attemptSignup = () => {
    const {
      token, password, fullName, phoneNumber,
    } = this.state;

    const payload = {
      token,
      password,
      name: fullName,
      phone: phoneNumber,
    };

    this.props.dispatch(usersActions.acceptInvite(payload))
      .then((response) => {
        if (response.response && response.response.data) {
          const loginPayload = {
            email: response.response.data.invite.email,
            password: this.state.password,
            company: response.response.data.company,
          };
          this.props.dispatch(authActions.login(loginPayload));
        }
      });
  };

  onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.attemptSignup();
    }
  };

  toggleShowPassword = () => {
    const {showPassword} = this.state;
    this.setState({showPassword: !showPassword});
  }

  render() {
    const {
      password,
      termsChecked,
      fullName,
      phoneNumber,
      phoneNumberHasError,
      openPasswordTooltip,
      showPassword
    } = this.state;
    const { requesting } = this.props;

    const formFields = Object.keys(this.validators);
    const errors = formFields.find(
      (field) => this.validators[field].errors.length,
    );
    const canAttemptLogin = password
      && fullName
      && phoneNumber
      && termsChecked
      && !phoneNumberHasError
      && !errors;

    const companyData = localStorage.LOCAL_STORE_COMPANY;

    return (
      <>
        <Row>
          <Col
            md="12"
            className="login-pointer d-flex justify-content-end align-items-center"
          >
            <p className="pr-2 mb-0">Already have an account? &nbsp;</p>
            <Link className="font-bold font-18" to="/authentication/login">
              Log in
            </Link>
          </Col>
        </Row>
        <div className="right-side-content">
          <div style={{ maxWidth: "475px" }}>
            <h2>Join Your Team</h2>
            <p>
              Please use your work email address so we can connect you with
              {" "}
              { companyData && companyData.company
                ? companyData.company
                : "your team"}
              {" "}
              in zeedas.
            </p>

            <Form className="forms" onKeyDown={this.onKeyDownHandler}>
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Full Name"
                  placeholder="e.g: Natterbase"
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={this.onInputChange}
                />
              </FormGroup>
              <FormGroup className="py-1">
                <ZeedasPhoneInput
                  label="Phone Number"
                  placeholder="+(000) 811 0000 000"
                  type="text"
                  name="phone"
                  value={phoneNumber}
                  handleError={this.setPhoneNumberError}
                  onChange={this.onPhoneInputChange}
                />
              </FormGroup>
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
              {/* {password.length > 0 && (
                    <PasswordStrengthBar password={password} />
                  )}
                  {this.showErrors("password")} */}

              <FormGroup className="py-3">
                <ZeedasCheckbox
                  id="signup-terms"
                  text="By signing up, you agree to the Terms and conditions and Privacy policy of Zeedas"
                  checked={termsChecked}
                  handleCheckboxChange={this.onCheckChanged}
                />
              </FormGroup>
              <FormGroup>
                <BlockLevelButton
                  onClick={this.attemptSignup}
                  color="zd-blue"
                  disabled={!canAttemptLogin}
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

export default connect(mapStateToProps)(UserSignUp);
