import React, { Component } from "react";
import { Label, FormGroup } from "reactstrap";
import { PropTypes } from "prop-types";
import { serverServices } from "../../../services/config-service";
import Joi from "joi";
import DefaultButton from "../../../zeedas-components/default-button";
import InfoPopover from "./info-popover";
import ZeedasInput from "../../../zeedas-components/input";
import CodeTextArea from "./build-command";
import SelectOption from "./select-option";
import colors from "../../../utils/colors";
import Switch from "../../../zeedas-components/switch";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
} from "../../../constants/index";
import { notify } from "../../../zeedas-components/bottom-notification";

const typeOptions = [
  { label: "API Based", value: "api", name: "type" },
  { label: "UI Based", value: "ui", name: "type" },
  { label: "Both", value: "both", name: "type" },
];
class ConfigServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        url: "",
        sshPrivateKey: "",
        username: "",
        path: "",
        app: "",
        type: "",
        password: "",
        authMechanism: "",
      },
      selectedType: typeOptions[0],
      errors: {},
      canSave: false,
      showPassword: true,
      loadingSave: false,
      loadingTest: false,
      loadingConfig: false,
    };
  }

  componentDidMount = () => {
    this.initPayload(this.props.serverCredentials);
  };

  initPayload = (data, reset = false) => {
    let payload = {
      ...this.state.payload,
    };
    if (data) {
      const { ip: url, path, user: username, authMechanism } = data;
      payload = {
        url,
        path,
        username,
        authMechanism,
      };
    }
    if (reset) {
      payload.password = "";
      payload.sshPrivateKey = "";
    }
    const showPassword = payload.authMechanism === "password" ? true : false;
    this.setState({ payload, showPassword });
  };

  testServerConfiguration = (payload) => {
    this.setState({ loadingTest: true });
    const { fetchAppCredentials, app } = this.props;
    serverServices.testServer(payload).then((res) => {
      const { response } = res;
      this.setState({ loadingTest: false });
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        notify(response.message, NOTIFICATION_SUCCESS);
        this.setState({ canSave: true });
        fetchAppCredentials(app._id);
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  saveServerConfiguration = (payload) => {
    this.setState({ loadingSave: true });
    const { fetchAppCredentials, app } = this.props;
    serverServices.saveServerConfig(payload).then((res) => {
      const { response } = res;
      this.setState({ loadingSave: false });
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        notify(response.message, NOTIFICATION_SUCCESS);
        fetchAppCredentials(app._id);
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  schema = () => {
    const authMechanism = this.state.showPassword
      ? "password"
      : "sshPrivateKey";
    const authMechanismLabel = this.state.showPassword
      ? "Password"
      : "SSH Private Key";
    const getErrorMessage = (label) => {
      return { message: `${label} is required` };
    };
    return {
      url: Joi.string()
        .required()
        .error(() => getErrorMessage("Url")),
      username: Joi.string()
        .required()
        .error(() => getErrorMessage("Username")),
      path: Joi.string()
        .required()
        .error(() => getErrorMessage("Path")),
      [authMechanism]: Joi.string()
        .required()
        .error(() => getErrorMessage(authMechanismLabel)),
    };
  };

  validate = () => {
    const authMechanism = this.state.showPassword
      ? "password"
      : "sshPrivateKey";
    const { url, username, path } = this.state.payload;
    const schema = { ...this.schema() };
    schema.password ? delete schema.sshPrivateKey : delete schema.password;
    const result = Joi.validate(
      {
        url,
        username,
        path,
        [authMechanism]: this.state.payload[authMechanism],
      },
      schema,
      {
        abortEarly: false,
      }
    );
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema()[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  onInputChange = (event) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.target);
    errorMessage
      ? (errors[event.target.name] = errorMessage)
      : delete errors[event.target.name];
    const { payload } = this.state;
    payload[event.target.name] = event.target.value;
    this.setState({ payload, errors });
  };

  toggleSwitch = () => {
    const { showPassword } = this.state;
    const newState = !showPassword;
    this.setState({ showPassword: newState });
    const errors = { ...this.state.errors };
    if (newState && errors.sshPrivateKey) delete errors.sshPrivateKey;
    else if (!newState && errors.password) delete errors.password;
    this.setState({ errors });
  };

  onSelectChange = (option) => {
    const { payload } = this.state;
    payload[option.name] = option.value;
    this.setState({ payload, selectedType: option });
  };

  handleFormSubmission = (test = true) => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    const { payload, canSave } = this.state;
    const payloadCopy = { ...payload };
    payloadCopy.app = this.props.app._id;
    payloadCopy.authMechanism = this.state.showPassword
      ? "password"
      : "private-key";
    this.state.showPassword
      ? (payloadCopy.sshPrivateKey = "")
      : (payloadCopy.password = "");
    if (test) this.testServerConfiguration(payloadCopy);
    else if (canSave) this.saveServerConfiguration(payloadCopy);
  };

  render = () => {
    const {
      loadingSave,
      loadingTest,
      errors,
      payload,
      showPassword,
      selectedType,
      canSave,
    } = this.state;
    const { defaultButtonStyles } = this.props;
    return (
      <>
        {/* <div className="d-flex justify-content-between align-items-center">
          <h1 className="app-name font-bold font-24 m-0">Server Setup</h1>
          <div className="d-flex">
            <button
              className="config-btn__secondary px-2 mr-3 py-1"
              onClick={() => resetAppCredentials()}
            >
              Reset Configuration
            </button>
            <InfoPopover id="info" />
          </div>
        </div> */}
        <form action="" className="mt-5">
          <div className="row">
            <div className="col-md-6 my-2">
              <FormGroup>
                <ZeedasInput
                  label="Domain name (SSH Host)"
                  placeholder="ssh host"
                  type="text"
                  name="url"
                  value={payload.url}
                  onChange={this.onInputChange}
                  error={errors.path}
                  error={errors.url}
                />
              </FormGroup>
            </div>
            <div className="col-md-6 my-2">
              <FormGroup>
                <ZeedasInput
                  label="SSH username"
                  placeholder="ssh username"
                  type="text"
                  name="username"
                  value={payload.username}
                  onChange={this.onInputChange}
                  error={errors.username}
                />
              </FormGroup>
            </div>
            <div className="col-md-6 my-2">
              <FormGroup>
                <Label
                  className="default-input-label d-block"
                  style={{ marginBottom: "7px" }}
                >
                  Select Type
                </Label>
                <SelectOption
                  label="setupType"
                  value={selectedType}
                  options={typeOptions}
                  onChange={this.onSelectChange}
                  bgColor={colors.ZEEDAS_INPUT_GREY}
                  border={colors.ZEEDAS_INPUT_GREY}
                  color="red"
                  placeholderColor={colors.ZEEDAS_INPUT_GREY}
                />
              </FormGroup>
            </div>
            <div className="col-md-6 my-2">
              <FormGroup>
                <ZeedasInput
                  label="Project Path"
                  placeholder="home/desktop/evr"
                  type="text"
                  name="path"
                  value={payload.path}
                  onChange={this.onInputChange}
                  error={errors.path}
                />
              </FormGroup>
            </div>
            <div className="col-md-6 py-2">
              <CodeTextArea label="Add build Command" id="build-command" />
            </div>
            <div className="col-md-6 py-2">
              <CodeTextArea label="Add run Command" id="run-command" />
            </div>
            <div className="col-md-12 mt-5 mb-2">
              <div className="d-flex align-items-center">
                <Switch
                  isActive={showPassword ? true : false}
                  toggleSwitch={this.toggleSwitch}
                />
                <span
                  className="mx-4"
                  style={{ color: "#03293D", opacity: 0.5 }}
                >
                  Switch password & private key
                </span>
              </div>
            </div>
            <div className="col-md-12 mb-2 mt-2">
              {showPassword ? (
                <FormGroup>
                  <ZeedasInput
                    label="SSH Password"
                    placeholder="SSH Password"
                    type="password"
                    name="password"
                    onChange={this.onInputChange}
                    error={errors.password}
                  />
                </FormGroup>
              ) : (
                <FormGroup>
                  <ZeedasInput
                    label="SSH Private Key"
                    placeholder="SSH Private Key"
                    type="text"
                    value={payload.sshPrivateKey}
                    name="sshPrivateKey"
                    onChange={this.onInputChange}
                    error={errors.sshPrivateKey}
                  />
                </FormGroup>
              )}
            </div>
            <div className="mt-5 col-md-6">
              <DefaultButton
                disabled={loadingTest}
                style={{
                  ...defaultButtonStyles,
                  backgroundColor: colors.ZEEDAS_GREEN,
                  border: "2px solid rgba(26, 12, 47, 0.1)",
                  color: colors.ZEEDAS_WHITE,
                  width: 177,
                }}
                onClick={this.handleFormSubmission}
              >
                <span>{loadingTest ? "Testing..." : "Test Configuration"}</span>
              </DefaultButton>
            </div>
            <div className="mt-5 col-md-6 d-flex justify-content-md-end">
              <DefaultButton
                disabled={loadingSave || !canSave}
                style={{
                  ...defaultButtonStyles,
                  backgroundColor: colors.ZEEDAS_WHITE,
                  border: `2px solid ${colors.ZEEDAS_DARK_BLUE}`,
                  color: colors.ZEEDAS_DARK_BLUE,
                }}
                onClick={() => this.handleFormSubmission(false)}
              >
                <span>{loadingSave ? "Saving..." : "Save"}</span>
              </DefaultButton>
            </div>
          </div>
        </form>
      </>
    );
  };
}

ConfigServer.defaultProps = {
  defaultButtonStyles: {},
};

ConfigServer.propTypes = {
  defaultButtonStyles: PropTypes.object,
};

export default ConfigServer;
