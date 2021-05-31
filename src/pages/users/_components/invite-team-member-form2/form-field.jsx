import React, { Component, useRef } from 'react';
import './style.scss';
import { FormGroup, Form } from 'reactstrap';
import ZeedasInput from 'zeedas-components/input';
import ButtonIconLeft from 'zeedas-components/button-icon-left';
import SendEmailIcon from 'zeedas-assets/icons/icon-send-email';
import colors from 'utils/colors';
import { APP_ROLES } from 'utils/constants';
import Joi from 'joi';
import MultiSelect from 'zeedas-components/multiselect';
import IconDeleteAlt from 'zeedas-assets/icons/icon-delete-alt';

class FormField extends Component {
  state = {
    email: '',
    selectedRole: [],
    errors: {},
  };

  componentDidMount = () => {
    const { data } = this.props;
    if (data) {
      this.setState({ email: data.email, selectedRole: data.selectedRole });
    }
  };

  schema = () => {
    const role = Joi.object().keys({
      label: Joi.string().required(),
      value: Joi.string().required(),
    });
    const emailMessages = {
      'any.required': 'An email address is required',
      'any.empty': 'An email address is required',
      'string.email': 'Please enter a valid email address',
    };
    const roleMessages = {
      'any.required': 'Please select a role',
      'any.empty': 'Please select a role',
      'array.min': 'Please select a role',
    };
    return {
      email: Joi.string()
        .required()
        .email()
        .error((err) => {
          return { message: emailMessages[err[0].type] };
        }),
      selectedRole: Joi.array()
        .items(role)
        .min(1)
        .required()
        .error((err) => {
          return { message: roleMessages[err[0].type] };
        }),
    };
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const errors = this.setErrorMessage(name, value);
    this.setState(
      {
        [name]: value,
        errors,
      },
      () => {
        const { email } = this.state;
        this.props.onInputChange({ email }, { email });
      }
    );
  };

  handleChange = (selectedRole) => {
    const errors = this.setErrorMessage('selectedRole', selectedRole);
    this.setState({ selectedRole, errors }, () => {
      const role = selectedRole.map((role) => role.value);
      this.props.onInputChange({ role }, { selectedRole });
    });
  };

  setErrorMessage = (name, value) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateFormInput(name, value);
    if (errorMessage) {
      this.props.updateErrorStatus(true);
      errors[name] = errorMessage;
    } else {
      this.props.updateErrorStatus(false);
      delete errors[name];
    }
    return errors;
  };

  validateFormInput = (name, value) => {
    /* Validate form input using the name of the form field */
    const obj = { [name]: value };
    const schema = { [name]: this.schema()[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  submit = (event) => {
    event.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} }, () => {
      if (errors && Object.keys(errors).length) {
        this.props.updateErrorStatus(true);
        return;
      }
      this.props.updateErrorStatus(false);
      if (this.state.email === '' || this.state.selectedRole.value === '') {
        return;
      }
      this.props.afterSubmit();
    });
  };

  validateForm = () => {
    const { email, selectedRole } = this.state;
    const schema = { ...this.schema() };
    const result = Joi.validate({ email, selectedRole }, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  //   !hasSelectedRole || !email || hasError
  render() {
    const { errors, email, selectedRole } = this.state;
    const { showSubmit, userRoles, deleteItem, hideDeleteIcon } = this.props;
    const hasError = Object.keys(errors).length;
    const hasSelectedRole = selectedRole && selectedRole.length;

    const rolesWithoutOwner = userRoles.filter(
      (role) => role.value !== APP_ROLES.OWNER
    );

    return (
      <Form className="forms invite-team-form mt-2" onSubmit={this.submit}>
        <FormGroup>
          <div className="row position-relative">
            <div className="col-md-4 pr-0">
              <ZeedasInput
                style={{ borderRadius: '10px 0px 0 10px', padding: '0 15px' }}
                placeholder="e.g: teammate@zeedas.com"
                type="text"
                name="email"
                value={email}
                onChange={this.onInputChange}
                error={errors.email}
              />
            </div>
            <div className="col-md-8 pl-1">
              <MultiSelect
                options={rolesWithoutOwner}
                value={selectedRole}
                onChange={this.handleChange}
                placeholder="Select Role"
                isClearable={false}
                error={errors.selectedRole}
                className="borderStyle"
              />
            </div>
            {!hideDeleteIcon && (
              <div
                className="position-absolute"
                style={{ right: '-40px', top: '15px' }}
              >
                <span onClick={deleteItem}>
                  <IconDeleteAlt width={15} />
                </span>
              </div>
            )}
          </div>
        </FormGroup>
        {showSubmit && (
          <FormGroup>
            <ButtonIconLeft
              icon={<SendEmailIcon />}
              color="zd-white"
              fontColor={colors.ZEEDAS_ORANGE}
              text="Add to list"
              onClick={this.submit}
              disabled={!hasSelectedRole || !email || hasError}
            />
          </FormGroup>
        )}
      </Form>
    );
  }
}

export default FormField;
