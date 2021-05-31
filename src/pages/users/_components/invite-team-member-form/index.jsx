import React from "react";
import "./style.scss";
import { Row, FormGroup, Form } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import ZeedasInput from "zeedas-components/input";
import BlockLevelButton from "zeedas-components/block-level-button";
import ButtonIconLeft from "zeedas-components/button-icon-left";
import SendEmailIcon from "zeedas-assets/icons/icon-send-email";
import colors from "utils/colors";
import { usersActions } from "state/redux/users/actions";
import ButtonLoadingIcon from "zeedas-assets/icons/icon-button-loader";
import { notify } from "zeedas-components/bottom-notification";
import { APP_ROLES, ERROR_RESPONSE } from "utils/constants";
import Joi from "joi";
import { NOTIFICATION_FAILURE } from "../../../../constants/index";
import Selector from "../select";
import InviteList from "../invitees-list/index";
import validators from "../../../../utils/validators";

class InviteTeamMemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      invitees: [],
      selectedRole: { label: "", value: "" },
      employmentMode: "fulltime",
      errors: {},
    };
    this.validators = validators;
  }

  schema = () => {
    const messages = {
      "any.required": "An email address is required",
      "any.empty": "An email address is required",
      "string.email": "Please enter a valid email address",
    };
    return {
      email: Joi.string()
        .required()
        .email()
        .error((err) => ({ message: messages[err[0].type] })),
    };
  };

  componentDidMount() {
    this.props.dispatch(usersActions.fetchRoles());
  }

  onInputChange = (event) => {
    const errors = this.setErrorMessage(event);
    this.setState({
      [event.target.name]: event.target.value,
      errors,
    });
  };

  setErrorMessage = (event) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateFormInput(event.target);
    errorMessage
      ? (errors[event.target.name] = errorMessage)
      : delete errors[event.target.name];
    return errors;
  };

  validateFormInput = ({ name, value }) => {
    /* Validate form input using the name of the form field */
    const obj = { [name]: value };
    const schema = { [name]: this.schema()[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validateForm = () => {
    const { email } = this.state;
    const schema = { ...this.schema() };
    const result = Joi.validate({ email }, schema, { abortEarly: false });
    if (!result.error) return null;
    const errors = {};
    for (const item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleChange = (selectedRole) => {
    this.setState({ selectedRole });
  };

  addEmailToList = (event) => {
    event.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} }, () => {
      if (errors && Object.keys(errors).length) return;
      if (this.state.email === "" || this.state.selectedRole.value === "") {
        return;
      }
      this.state.invitees.unshift({
        email: this.state.email,
        role: this.state.selectedRole.value,
      });
      this.setState({ email: "" });
    });
  };

  deleteInvitee = (inviteeIndex) => {
    const { invitees } = this.state;
    const updatedInvitees = invitees.filter(
      (item, index) => index !== inviteeIndex,
    );
    this.setState({ invitees: updatedInvitees });
  };

  sendInvites = () => {
    const { invitees } = this.state;
    if (invitees.length < 1) {
      notify("Your invite list is empty", NOTIFICATION_FAILURE);
      return;
    }
    const payload = {
      invitations: this.state.invitees,
      employmentMode: this.state.employmentMode,
    };

    this.props.dispatch(usersActions.inviteTeamMembers(payload))
      .then((response) => {
        if (response.status === ERROR_RESPONSE) return Promise.reject();
        this.setState(
          {
            email: "",
            invitees: [],
            selectedRole: { label: "", value: "" },
            employmentMode: "fulltime",
            errors: {},
          },
          this.props.handleSuccess(),
        );
      })
      .finally(() => this.props.dispatch(usersActions.fetchTeamMembers()));
  };

  render() {
    const {
      email, invitees, selectedRole, errors,
    } = this.state;
    const {
      userRoles, requesting, accountInfo, handleSuccess,
    } = this.props;

    const rolesWithoutOwner = userRoles.filter(
      (role) => role.value !== APP_ROLES.OWNER,
    );
    // TODO: Uncomment above block, delete below block - MEL
    // const rolesWithoutOwner = Object.values(APP_ROLES).filter(
    //   (role) => role !== APP_ROLES.OWNER,
    // );

    const hasError = Object.keys(errors).length;

    return (
      <div className="InviteTeamMemberForm">
        <div className="invite-list px-4 py-4">
          <p className="invite-list__header font-14 mb-0">Invite List</p>

          {invitees.length > 0 ? (
            <InviteList data={invitees} deleteItem={this.deleteInvitee} />
          ) : (
            <p className="text-center p-0" style={{ color: "lightgrey" }}>
              Your list is empty.
            </p>
          )}
        </div>

        <Form className="forms invite-team-form" onSubmit={this.addEmailToList}>
          <FormGroup>
            <p className="email-label">Work Email</p>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <div className="" style={{ width: "70%" }}>
                <ZeedasInput
                  placeholder="e.g: teammate@zeedas.com"
                  type="text"
                  name="email"
                  value={email}
                  style={{ borderRadius: "10px 0px 0 10px" }}
                  onChange={this.onInputChange}
                  error={errors.email}
                />
              </div>
              <div style={{ width: "30%", marginLeft: "-10px", zIndex:100 }}>
                <Selector
                  options={rolesWithoutOwner}
                  value={selectedRole}
                  onChange={this.handleChange}
                  placeholder="Select Role"
                  bgColor={colors.ZEEDAS_BLUE_INVERSE}
                  border={colors.ZEEDAS_BLUE_INVERSE}
                  label="label"
                  isClearable={false}
                />
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <ButtonIconLeft
              icon={<SendEmailIcon />}
              color="zd-white"
              fontColor={colors.ZEEDAS_ORANGE}
              text="Add to list"
              onClick={this.addEmailToList}
              disabled={
                !(selectedRole && selectedRole.value) || !email || hasError
              }
            />
          </FormGroup>
        </Form>
        <div className="" style={{ marginTop: "44px" }}>
          <BlockLevelButton
            disabled={requesting || invitees.length === 0}
            color="zd-blue"
            onClick={this.sendInvites}
          >
            {requesting ? <ButtonLoadingIcon /> : "Send invite"}
          </BlockLevelButton>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requests, users, auth } = state;
  return {
    requesting: requests.requesting,
    fullPageRequesting: requests.fullPageRequesting,
    userRoles: users.userRoles,
    user: auth.userData,
    accountInfo: users.accountInfo,
  };
}

export default connect(mapStateToProps)(InviteTeamMemberForm);
