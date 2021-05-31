import React from 'react';
import { Row, Col, FormGroup, Form, Tooltip } from 'reactstrap';

import { connect } from 'react-redux';
import PasswordCheckNotValidIcon from '../../../zeedas-assets/icons/icon-password-check-not-valid';
import PasswordCheckValidIcon from '../../../zeedas-assets/icons/icon-password-check-valid';
import ZeedasInput from '../../../zeedas-components/input';
import BlockLevelButton from '../../../zeedas-components/block-level-button';
import validators from '../../../utils/validators';
import { authActions } from '../../../state/redux/auth/actions';
import ButtonLoadingIcon from '../../../zeedas-assets/icons/icon-button-loader';
import { LOCAL_STORE_COMPANY } from '../../../utils/constants';
import { Link } from 'react-router-dom';
import EyeIcon from 'zeedas-assets/icons/icon-eye';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      token: '',
      companyName: '',
      openPasswordTooltip: false,
      showPassword:false
    };

    this.validators = validators;
  }

  componentDidMount() {
    const { history } = this.props;
    const { search } = history.location;
    const query = new URLSearchParams(search);
    const token = query.get('resetToken');
    const companyName = query.get('company');
    this.setState({ token, companyName });
  }

  resetPassword = () => {
    const { token, password, companyName } = this.state;
    window.localStorage.setItem(LOCAL_STORE_COMPANY, companyName);
    const payload = {
      token,
      password,
      company: companyName,
    };
    this.props.dispatch(authActions.resetPassword(payload));
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    if (event.target.name === 'password' && !this.state.openPasswordTooltip) {
      this.togglePasswordTooltip();
    }
    this.formValidators([event.target.name], event.target.value);
  };

  formValidators = (fieldName, value) => {
    const { password } = this.state;

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
        if (fieldName.includes('confirmPassword')) {
          if (!rule.test(value, password)) {
            this.validators[fieldName].errors.push(rule.message);
            this.validators[fieldName].valid = false;
          }
        } else if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
  };

  validForm = () => {
    let status = true;
    Object.keys(this.validators).forEach((field) => {
      if (field === 'email' || field === 'password') {
        if (!this.validators[field].valid) {
          status = false;
        }
      }
    });
    return status;
  };

  togglePasswordTooltip = () => {
    const { openPasswordTooltip } = this.state;
    this.setState({ openPasswordTooltip: !openPasswordTooltip });
  };

  showPasswordValidStatus = (message) => {
    const { password } = this.state;
    const passwordErrors = [...this.validators.password.errors];
    if (password === '' || passwordErrors.includes(message)) {
      return (
        <div>
          <span>
            <PasswordCheckNotValidIcon />
          </span>{' '}
          <span>{message}</span>
        </div>
      );
    }
    return (
      <div className="validation-text-bold">
        <span>
          <PasswordCheckValidIcon />
        </span>{' '}
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
      this.resetPassword();
    }
  };

  showErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = '';
    if (validator && !validator.valid && validator.state !== '') {
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
  toggleShowPassword = () => {
    const {showPassword} = this.state;
    this.setState({showPassword: !showPassword});
  }

  render() {
    const { password, confirmPassword, openPasswordTooltip, showPassword } = this.state;
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
        <div className="right-side-content" style={{ marginTop: '160px' }}>
          <div className="w-100" style={{ maxWidth: '475px' }}>
            <h2>Reset password</h2>
            <p>Enter your new password.</p>

            <Form className="forms mt-4" onKeyDown={this.onKeyDownHandler}>
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
              {/* {this.showErrors("password")}
                  {password.length > 0 && (
                    <PasswordStrengthBar password={password} />
                  )} */}

              <FormGroup className="py-1">
                <ZeedasInput
                 label=" Confirm password"
                 placeholder="e.g: *********"

                 name="confirmPassword"
                 value={confirmPassword}
                 onChange={this.onInputChange}
                  type={showPassword? "text" :"password"}
                  
                />
                <div 
									onClick={this.toggleShowPassword}
									
									className="input-hide-btn">
									<EyeIcon />
								</div>
              </FormGroup>
              {this.showErrors('confirmPassword')}
              <FormGroup className="mt-4 pt-3">
                <BlockLevelButton
                  onClick={this.resetPassword}
                  color="zd-blue"
                  disabled={requesting}
                >
                  {requesting ? <ButtonLoadingIcon /> : `Reset password`}
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

export default connect(mapStateToProps)(ResetPassword);
