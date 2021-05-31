import React from "react";
import "./style.scss";
import { connect } from "react-redux";
import {
  Row, Col, FormGroup, Form,
} from "reactstrap";

import { Link } from "react-router-dom";
import ZeedasInput from "../../../zeedas-components/input";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import validators from "../../../utils/validators";
import { authActions } from "../../../state/redux/auth/actions";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";
import findTeamsIcon from "../../../zeedas-assets/icons/find-teams-icon.svg";
import { notify } from "../../../zeedas-components/bottom-notification";
import { NOTIFICATION_FAILURE, NOTIFICATION_SUCCESS } from "../../../constants";
import COLORS from "../../../utils/colors";

class CompanySubdomain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      email: "",
      selectedField: "",
      isRequestingEmail: false,
      isRequestingCompany: false,
    };

    this.validators = validators;
  }

  onFocusChange = (event) => {
    this.setState({ selectedField: event.target.name });
  }

  onInputChange = (event) => {
    this.setState({
      company: "",
      email: "",
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

  submitData = (event) => {
    if (event) event.preventDefault();
    let payload;

    if (this.state.selectedField === "company" || (event && event.target.name === "company-submit")) {
      this.setState({
        isRequestingEmail: false,
        isRequestingCompany: true,
      });

      if (this.state.company === "") {
        notify("Please enter your company name", NOTIFICATION_FAILURE);
        return;
      }

      payload = {
        company: this.state.company,
      };
      this.props.dispatch(authActions.verifyCompany(payload))
        .finally(() => this.setState({ isRequestingCompany: false }));
      //
    } else if (this.state.selectedField === "email" || (event && event.target.name === "email-submit")) {
      this.setState({
        isRequestingEmail: true,
        isRequestingCompany: false,
      });

      if (this.state.email === "") {
        notify("Please enter your email", NOTIFICATION_FAILURE);
        return;
      }

      payload = {
        email: this.state.email,
      };
      authActions.recoverTeams(payload)
        .then((responseMessage) => notify(responseMessage, NOTIFICATION_SUCCESS))
        .catch((errorMessage) => notify(errorMessage, NOTIFICATION_FAILURE))
        .finally(() => this.setState({ isRequestingEmail: false }));

    }
  };

  onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.submitData();
    }
  };

  render() {
    const { company, email, isRequestingEmail, isRequestingCompany } = this.state;
    const { requesting } = this.props;

    return (
      <div className="Company-subdomain">
        <Row>
          <Col
            md="12"
            className="login-pointer d-flex justify-content-end align-items-center"
          >
            <p className="pr-2 mb-0">Don&apos;t have an account? &nbsp;</p>
            <Link
              className="font-bold font-18"
              to="/authentication/company-signup"
            >
              Sign up
            </Link>
          </Col>
        </Row>

        <div className="right-side-content" style={{ marginTop: "80px" }}>
          <div style={{ maxWidth: "475px" }}>
            <h2
              className="Company-subdomain__title"
              style={{
                fontFamily: "Futura, sans-serif",
              }}
            >
              Confirm your team?
            </h2>
            <p>
              Please use your Team name so we can connect you with your team on
              zeedas.
            </p>

            <div className="Company-subdomain__form-container">
              <Form className="forms m-0" onKeyDown={this.onKeyDownHandler}>
                <p className="w-100 font-weight-bold mb-2">
                  Find your teams
                </p>
                <FormGroup className="d-flex justify-content-between">
                  <ZeedasInput
                    placeholder="Name@company.com"
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.onInputChange}
                    onFocus={this.onFocusChange}
                    style={{
                      width: "80%",
                      height: "52px",
                      border: "none",
                    }}
                  />
                  <button
                    className="Company-subdomain__find-teams-button"
                    name="email-submit"
                    onClick={this.submitData}
                    disabled={requesting || isRequestingEmail}
                  >
                    { !isRequestingEmail
                      ? (
                        <img src={findTeamsIcon} alt="" />
                      ) : (
                        <ButtonLoadingIcon
                          margin="0"
                          height="25px"
                          width="25px"
                        />
                      )}
                  </button>
                </FormGroup>

                {this.showErrors("email")}

                <p className="w-100 mb-2 font-12">
                  Receive an email with the teams you&apos;ve joined or can automatically join.
                </p>

                {/* SEPARATOR */}
                <div className="Company-subdomain__separator">
                  <span className="Company-subdomain__separator__line" />
                  <p className="Company-subdomain__separator__text">
                    OR
                  </p>
                  <span className="Company-subdomain__separator__line" />
                </div>

                {/* USE TEAM URL */}
                <p className="w-100 font-weight-bold mb-2">
                  Use your Team URL
                </p>
                <FormGroup className="d-flex justify-content-between">
                  <ZeedasInput
                    placeholder="Subdomain"
                    type="text"
                    name="company"
                    value={company}
                    onChange={this.onInputChange}
                    onFocus={this.onFocusChange}
                    style={{
                      width: "68%",
                      height: "52px",
                      border: "none",
                    }}
                  />
                  <button
                    className="Company-subdomain__team-url-button"
                    name="company-submit"
                    onClick={this.submitData}
                    disabled={requesting || isRequestingCompany}
                  >
                    { !isRequestingCompany
                      ? (
                        ".zeedas.com"
                      ) : (
                        <ButtonLoadingIcon
                          margin="0"
                          height="25px"
                          width="25px"
                          stroke={COLORS.ZEEDAS_BLUE_INVERSE}
                        />
                      )}
                  </button>
                </FormGroup>
                {this.showErrors("company")}

                <p className="Company-subdomain__form-container__footnote">
                  Need to get your team on Zeedas? Create a new organization
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requesting } = state;
  return { requesting };
}
export default connect(mapStateToProps)(CompanySubdomain);
