import React from "react";
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
import { notify } from "../../../zeedas-components/bottom-notification";
import { NOTIFICATION_FAILURE } from "../../../constants";

class CompanyName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
    };

    this.validators = validators;
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.formValidators([event.target.name], event.target.value);
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

  verifyCompany = () => {
    const payload = {
      company: this.state.company,
    };

    if (this.state.company === "") {
      notify("Please enter your company name", NOTIFICATION_FAILURE);
      return;
    }
    this.props.dispatch(authActions.verifyCompany(payload));
  };

  onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.verifyCompany();
    }
  };

  render() {
    const { company } = this.state;
    const { requesting } = this.props;

    return (
      <>
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
        <div className="right-side-content" style={{ marginTop: "160px" }}>
          <div style={{ maxWidth: "475px" }}>
            <h2>Confirm your team?</h2>
            <p>
              Please use your Team name so we can connect you with your team on
              zeedas.
            </p>

            <Form className="forms" onKeyDown={this.onKeyDownHandler}>
              <FormGroup>
                <ZeedasInput
                  label="Team Name"
                  placeholder="e.g: Natterbase"
                  type="text"
                  name="company"
                  value={company}
                  onChange={this.onInputChange}
                />
              </FormGroup>
              {this.showErrors("company")}

              <FormGroup className="mt-4 pt-3">
                <BlockLevelButton
                  onClick={this.verifyCompany}
                  color="zd-blue"
                  disabled={requesting}
                >
                  {requesting ? <ButtonLoadingIcon /> : "Continue"}
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
  const { requesting } = state;
  return { requesting };
}
export default connect(mapStateToProps)(CompanyName);
