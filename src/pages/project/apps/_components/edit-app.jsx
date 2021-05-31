import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Label, Input } from "reactstrap";
import { appService } from "../apps.services";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
} from "../../../../constants";
import { ERROR_RESPONSE } from "../../../../utils/constants";
import { notify } from "../../../../zeedas-components/bottom-notification";
import ZeedasInput from "../../../../zeedas-components/input";
import ZeedasTextArea from "../../../../zeedas-components/text-area";
import CardComponent from "../../../../zeedas-components/card";
import BlockLevelButton from "../../../../zeedas-components/block-level-button";
import ButtonLoadingIcon from "../../../../zeedas-assets/icons/icon-button-loader";

const EditApp = ({ closeModal, app, getApps }) => {
  const [state, setState] = useState({
    name: app.name ? app.name : "",
    description: app.description ? app.description : "",
  });

  const [requesting, setRequesting] = useState(false);

  const onInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const editApp = () => {
    setRequesting(true);
    if (state.name === "" || state.description === "") {
      notify("Some fields are empty", NOTIFICATION_FAILURE);
      return;
    }
    appService.updateApp(state, app._id).then((response) => {
      if (response.status === ERROR_RESPONSE) {
        notify(response.response.message, NOTIFICATION_FAILURE);
      } else {
        notify(response.response.message, NOTIFICATION_SUCCESS);
        getApps();
        setRequesting(false);
        closeModal();
      }
    });
  };
  useEffect(() => {
    setState({
      ...state,
      name: app.name ? app.name : "",
      description: app.description ? app.description : "",
    });
  }, [app]);
  // <CardComponent>
  return (
    <CardComponent borderRadius="15px">
      <div style={{ padding: "20px" }}>
        <ZeedasInput
          label="Give this App a name"
          // placeholder="Eg. Natterbase"
          value={state.name}
          onChange={onInputChange}
          name="name"
          type="text"
        />
        <p className="description"></p>
        <ZeedasTextArea
          className="mb-4"
          label="App Description"
          name="description"
          value={state.description}
          onChange={onInputChange}
          // placeholder="Description"
          type="textarea"
          height="150px"
        />

        <div className="mt-4">
          <BlockLevelButton color="zd-blue" onClick={editApp}>
            {requesting ? (
              <span className="d-flex justify-content-center align-items-center">
                <ButtonLoadingIcon
                  margin="0 10px 0 0"
                  height="16px"
                  width="16px"
                />{" "}
                Updating App...
              </span>
            ) : (
              <span>Update Details</span>
            )}
          </BlockLevelButton>
        </div>
      </div>
    </CardComponent>
  );
};

export default EditApp;
EditApp.defaultProps = {
  app: {},
  closeModal: () => {},
  getApps: () => {},
  requesting: false,
};
EditApp.propTypes = {
  closeModal: PropTypes.func,
  app: PropTypes.object,
  requesting: PropTypes.bool,
  getApps: PropTypes.func,
};
