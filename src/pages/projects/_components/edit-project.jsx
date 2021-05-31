import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Label, Input } from "reactstrap";
import { projectService } from "../../../services/projects-service";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
} from "../../../constants";
import { ERROR_RESPONSE } from "../../../utils/constants";

import { notify } from "../../../zeedas-components/bottom-notification";
import ZeedasInput from "../../../zeedas-components/input";
import ZeedasTextArea from "../../../zeedas-components/text-area";
import CardComponent from "../../../zeedas-components/card";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";
import { projectActions } from 'state/redux/project/actions';
import { useDispatch } from 'react-redux';

const EditProject = ({ closeModal, project, getProjects }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    name: project.name ? project.name : "",
    description: project.description ? project.description : "",
  });

  const [requesting, setRequesting] = useState(false);

  const onInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const editProject = () => {
    setRequesting(true);
    if (state.name === "" || state.description === "") {
      notify("Some fields are empty", NOTIFICATION_FAILURE);
      return;
    }
    projectService.updateProject(state, project._id).then((response) => {
      if (response.status === ERROR_RESPONSE) {
        notify(response.response.message, NOTIFICATION_FAILURE);
      } else {
        dispatch(projectActions.setSingleProject(response.response.data));
        notify(response.response.message, NOTIFICATION_SUCCESS);
        getProjects();
        setRequesting(false);
        closeModal();
      }
    });
  };
  useEffect(() => {
    setState({
      ...state,
      name: project.name ? project.name : "",
      description: project.description ? project.description : "",
    });
  }, [project]);
  // <CardComponent>
  return (
    <CardComponent borderRadius="15px">
      <div style={{ padding: "20px" }}>
        <ZeedasInput
          label="Give this Project a name"
          // placeholder="Eg. Natterbase"
          value={state.name}
          onChange={onInputChange}
          name="name"
          type="text"
        />
        <p className="description"></p>
        <ZeedasTextArea
          className="mb-4"
          label="Project Description"
          name="description"
          value={state.description}
          onChange={onInputChange}
          // placeholder="Description"
          type="textarea"
          height="150px"
        />

        <div className="mt-4">
          <BlockLevelButton color="zd-blue" onClick={editProject}>
            {requesting ? (
              <span className="d-flex justify-content-center align-items-center">
                <ButtonLoadingIcon
                  margin="0 10px 0 0"
                  height="16px"
                  width="16px"
                />{" "}
                Updating Project...
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

export default EditProject;
EditProject.defaultProps = {
  project: {},
  closeModal: () => {},
  getProjects: () => {},
  requesting: false,
};
EditProject.propTypes = {
  closeModal: PropTypes.func,
  project: PropTypes.object,
  requesting: PropTypes.bool,
  getProjects: PropTypes.func,
};
