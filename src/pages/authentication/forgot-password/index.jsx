import React from 'react';
import { Row, Col, FormGroup, Form } from 'reactstrap';
import { connect } from 'react-redux';

import ZeedasInput from '../../../zeedas-components/input';
import BlockLevelButton from '../../../zeedas-components/block-level-button';
import validators from '../../../utils/validators';
import { authActions } from '../../../state/redux/auth/actions';
import ButtonLoadingIcon from '../../../zeedas-assets/icons/icon-button-loader';
import { LOCAL_STORE_COMPANY } from '../../../utils/constants';
import { Link } from 'react-router-dom';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      companyData: JSON.parse(window.localStorage.getItem(LOCAL_STORE_COMPANY)),
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
      } else if (typeof rule.test === 'function') {
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
      if (field === 'email' || field === 'password') {
        if (!this.validators[field].valid) {
          status = false;
        }
      }
    });
    return status;
  }

  showErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = '';
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => (
        <span className="error" key={index}>
          *{info}
          <br />
        </span>
      ));
      return <div className="error mb-2">{errors}</div>;
    }
    return result;
  }

  sendPasswordResetLink = () => {
    const { email, companyData } = this.state;

    const payload = {
      email,
      company: companyData.company,
    };
    this.props.dispatch(authActions.sendPasswordResetLink(payload));
  };

  onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.sendPasswordResetLink();
    }
  };

  render() {
    const { email } = this.state;
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
          <div style={{ maxWidth: '475px', marginTop: '15%' }}>
            <h2>Forgot Password?</h2>
            <p className="subtext">
              Enter your username or email to reset your password.
              <br />
              You will receive an email with instructions on how to reset your
              password. If you are experiencing problems resetting your password
              contact us or send us an email
            </p>

            <Form className="forms" onKeyDown={this.onKeyDownHandler}>
              <FormGroup>
                <ZeedasInput
                  label="Email address"
                  placeholder="e.g: John@zeedas.com"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.onInputChange}
                />
              </FormGroup>
              {this.showErrors('email')}

              <FormGroup className="py-1">
                <BlockLevelButton
                  color="zd-blue"
                  onClick={this.sendPasswordResetLink}
                  disabled={requesting}
                >
                  {requesting ? (
                    <ButtonLoadingIcon />
                  ) : (
                    `Send password reset email`
                  )}
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

export default connect(mapStateToProps)(ForgotPassword);
