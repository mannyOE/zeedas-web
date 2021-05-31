import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, FormGroup } from "reactstrap";
import { projectService } from "../../../services/projects-service";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
} from "../../../constants";
import { ERROR_RESPONSE } from "../../../utils/constants";
import { notify } from "../../../zeedas-components/bottom-notification";
import CardComponent from "../../../zeedas-components/card";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";
import Chips from "../../../zeedas-components/chips";

const ShareProject = ({ closeModal, projectId }) => {
  const [state, setState] = useState({
    items: [],
    value: "",
    error: null,
  });
  const [requesting, setRequesting] = useState(false);
  const handleKeyDown = (evt) => {
    if (["Enter", "Tab", ",", " "].includes(evt.key)) {
      evt.preventDefault();

      var value = state.value.trim();
      if (value) {
        setState({
          items: [...state.items, state.value],
          value: "",
        });
      }
    }
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      value: evt.target.value,
      error: null,
    });
  };

  const handleDelete = (item) => {
    setState({
      items: state.items.filter((i) => i !== item),
    });
  };

  const handlePaste = (evt) => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      setState({
        items: [...state.items, ...emails],
      });
    }
  };
  const ShareProject = () => {
    setRequesting(true);
    projectService.shareProjectLink(state.items, projectId).then((response) => {
      if (response.status === ERROR_RESPONSE) {
        notify(response.response.message, NOTIFICATION_FAILURE);
      } else {
        notify(response.response.message, NOTIFICATION_SUCCESS);
        setRequesting(false);
        closeModal();
      }
    });
  };
  return (
    <CardComponent borderRadius="15px">
      <div style={{ padding: "20px" }}>
        <Row>
          {state.items.map((item) => (
            <Col
              key={item}
              style={{ marginLeft: "0", marginBottom: "10px" }}
              sm={{ size: "auto", offset: 1 }}
            >
              <Chips text={item} deleteChip={() => handleDelete(item)} />
            </Col>
          ))}
        </Row>
        <FormGroup>
          <input
            className="share-input"
            name="email"
            type="email"
            value={state.value}
            placeholder="Type or paste email addresses and press `Enter`..."
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onPaste={handlePaste}
          />
        </FormGroup>

        <div className="mt-4">
          <BlockLevelButton color="zd-blue" onClick={ShareProject}>
            {requesting ? (
              <span className="d-flex">
                <ButtonLoadingIcon />
              </span>
            ) : (
              <span>Share</span>
            )}
          </BlockLevelButton>
        </div>
      </div>
    </CardComponent>
  );
};

export default ShareProject;
ShareProject.defaultProps = {
  closeModal: () => {},
  requesting: false,
  projectId: "",
};
ShareProject.propTypes = {
  closeModal: PropTypes.func,
  requesting: PropTypes.bool,
  projectId: PropTypes.string,
};
