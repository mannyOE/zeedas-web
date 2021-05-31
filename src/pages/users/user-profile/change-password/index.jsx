import React from 'react';
import { FormGroup, Row, Col, Form, Tooltip } from 'reactstrap';
import { connect } from 'react-redux';
import PasswordCheckNotValidIcon from '../../../../zeedas-assets/icons/icon-password-check-not-valid';
import PasswordCheckValidIcon from '../../../../zeedas-assets/icons/icon-password-check-valid';
import ZeedasInput from '../../../../zeedas-components/input';
import ButtonLoadingIcon from '../../../../zeedas-assets/icons/icon-button-loader';
import { usersActions } from '../../../../state/redux/users/actions';
import DefaultButton from '../../../../zeedas-components/default-button';
import validators from '../../../../utils/validators';
import EyeIcon from 'zeedas-assets/icons/icon-eye';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      confirmPassword: '',
      openPasswordTooltip: false,
      showPassword:false,
      showPassword2:false
    };

    this.validators = validators;
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    if (event.target.name === 'password' && !this.state.openPasswordTooltip) {
      this.togglePasswordTooltip();
    }
    if (event.target.name !== 'oldPassword')
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

  canSubmit = () => {
    const { password, oldPassword, newPassword } = this.state;
    return password && oldPassword && newPassword;
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

  updatePassword = (event) => {
    event.preventDefault();

    const { oldPassword, password } = this.state;
    const payload = {
      newPassword: password,
      oldPassword,
    };
    this.props.dispatch(usersActions.updatePassword(payload)).then(() => {
      
      this.resetState();
    });
  };

  resetState = () => {
    this.setState({
      oldPassword: '',
      password: '',
      confirmPassword: '',
      openPasswordTooltip: false,
    });
  };

  showErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = '';
    if (validator && !validator.valid && validator.state !== '') {
      return validator.errors[0];
    }
    return result;
  }
  toggleShowPassword2 = () => {
    const {showPassword2} = this.state;
    this.setState({showPassword2: !showPassword2});
  }
  toggleShowPassword = () => {
    const {showPassword} = this.state;
    this.setState({showPassword: !showPassword});
  }

  render() {
    const {
      oldPassword,
      password,
      confirmPassword,
      openPasswordTooltip,
      showPassword,
      showPassword2
    } = this.state;
    const { requesting } = this.props;
    return (
      <div className="profile-update">
        <div className="profile_update--heading">
          <p className="profile_update--title">Change Password</p>
          <p className="profile_update_text">
            Try and remember your new password
          </p>
        </div>

        <div>
          <Row>
            <Col md={12}>
              <Form
                className="change-password-form"
                onSubmit={this.updatePassword}
              >
                <FormGroup className="py-1">
                <ZeedasInput
                  label=" Old Password"
                  placeholder="e.g: *********"
                  type={showPassword? "text" :"password"}
                  name="oldPassword"
                  value={oldPassword}
                  onChange={this.onInputChange}
                />
                <div 
									onClick={this.toggleShowPassword}
									
									className="input-hide-btn">
									<EyeIcon />
								</div>
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
                    label="New Password"
                    placeholder="e.g: *********"
                    type={showPassword2? "text" :"password"}
                    name="password"
                    value={password}
                    onChange={this.onInputChange}
                  />
                <div 
									onClick={this.toggleShowPassword2}
									
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
                    type={showPassword2? "text" :"password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.onInputChange}
                    isError={this.showErrors('confirmPassword')}
                    // error={this.showErrors('confirmPassword')}
                  />
                <div 
									onClick={this.toggleShowPassword2}						
									className="input-hide-btn">
									<EyeIcon />
								</div>
                {this.showErrors('confirmPassword') && (
                  <span className="default-input-error__message__under">{this.showErrors('confirmPassword')}</span>
                )}
                </FormGroup>
                <DefaultButton
                  style={{ marginTop: '30px', width: '162px' }}
                  onClick={this.updatePassword}
                  color="zd-blue"
                  type="submit"
                  disabled={
                    requesting || !password || !oldPassword || !confirmPassword
                  }
                >
                  {requesting ? <ButtonLoadingIcon /> : `Update Password`}
                </DefaultButton>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requests } = state;
  return { requesting: requests.requesting };
}

export default connect(mapStateToProps)(ChangePassword);
