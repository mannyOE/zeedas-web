import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Row, Col, Label, Input,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { projectService } from "../../../services/projects-service";
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
} from "../../../constants";
import { APP_ROLES, ERROR_RESPONSE } from "../../../utils/constants";
import { notify } from "../../../zeedas-components/bottom-notification";
import ZeedasInput from "../../../zeedas-components/input";
import ZeedasTextArea from "../../../zeedas-components/text-area";
import TeamList from "./team-list";
import CardComponent from "../../../zeedas-components/card";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import IconPlus from "../../../zeedas-assets/icons/icon-plus";
import TabNavigation from "../../../zeedas-components/tab-navigation";
import ProjectIconsList from "../../../zeedas-components/project-icons-list";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";
import UploadIcon from "../../../zeedas-components/upload-icon";

const tabNavigationTitles = [
  { tabId: 1, title: "Project Icons" },
  { tabId: 2, title: "Custom Icons" },
];

const CreateProject = ({
  ProjectDescription,
  toggleDescreption,
  closeModal,
  teamMembers,
  getProjects,
}) => {
  const uploadedImage = useRef(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [fileUpload, setFile] = useState("");
  const [state, setState] = useState({
    icon: "",
    name: "",
    description: "",
    expectedEndDate: "",
    leadId: "",
    leadName: "",
    startDate: "",
  });

  const [buttonDisable, setDisable] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [customIcon, setCustomIcon] = useState(false);

  const selectActiveUrl = (e) => {
    setState({
      ...state,
      icon: e,
    });
    setCustomIcon(false);
  };

  const onChangeRadioButton = (e, team) => {
    setState({
      ...state,
      leadId: team.user._id,
      leadName: team.user.name,
    });
  };

  const onUploadImage = (e) => {
    const [file] = e.target.files;

    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const icon = e.target.result;
        setUploadUrl(icon);
        setCustomIcon(true);
      };
    }
  };
  const onInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const onTimelineChange = (date) => {
    setState({
      ...state,
      expectedEndDate: date,
    });
  };
  useEffect(() => {
    if (state.name === "" || state.leadName == "" || state.leadId == "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [state]);

  const getEligibleTeamMembers = () => teamMembers.filter(
    (member) => member.roles.includes(APP_ROLES.ENTERPRISE_ARCHITECT)
      || member.roles.includes(APP_ROLES.PROJECT_MANAGER)
      || member.roles.includes(APP_ROLES.QUALITY_ASSURANCE),
  );

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", fileUpload);
    formData.append("upload_preset", "fy3bojc7");
    const options = {
      method: "POST",
      body: formData,
    };
    return fetch("https://api.Cloudinary.com/v1_1/zeedas/image/upload", options)
      .then((res) => res.json())
      .then(async (res) => res.secure_url)
      .catch((err) => {});
  };

  const createProject = (icon) => {
    setRequesting(true);
    const start = new Date().toISOString();

    const newState = {
      ...state,
      startDate: start,
      icon: icon || state.icon,
    };

    setState(newState);
    projectService.createProject(newState)
      .then(async (response) => {
        // const { response } = res;
        if (response.status === ERROR_RESPONSE) {
          notify(response.response.message, NOTIFICATION_FAILURE);
        } else {
          await getProjects();
          setState({
            name: "",
            description: "",
            leadId: "",
            leadName: "",
            startDate: "",
            icon: "",
          });
          setUploadUrl("");
          document
            .querySelectorAll("input[type=radio]")
            .forEach((el) => (el.checked = false));
          document
            .querySelectorAll(".project-icon-wrap")
            .forEach((el) => el.classList.remove("icon-active"));
          notify(response.response.message, NOTIFICATION_SUCCESS);
          closeModal();
        }
      })
      .finally(() => setRequesting(false));
  };

  const checkUploadType = async () => {
    setRequesting(true);

    if (customIcon) {
      const clod = await uploadToCloudinary();
      await createProject(clod);
    } else {
      await createProject();
    }
  };

  const tabNavigationContents = [
    {
      contentId: 1,
      content: <ProjectIconsList onClick={selectActiveUrl} />,
    },
    {
      contentId: 2,
      content: (
        <UploadIcon
          uploadedImage={uploadedImage}
          onUploadImage={onUploadImage}
          uploadUrl={uploadUrl}
        />
      ),
    },
  ];
  // <CardComponent>

  useEffect(() => {
    console.log("[REQUESTING]:", requesting);
  }, [requesting]);

  return (
    <div className="create-project">
      <div className="">
        <h1 className="modalTitle">Create New Project</h1>
        <p className="description-header">
          {" "}
          Enter the Details of the Project you would like to create and assign a
          team lead specific to this project
        </p>
      </div>
      <div className="row">
        <div className="col-md-7">
          <ZeedasInput
            label="Give this Project a name"
            placeholder="Eg. Natterbase"
            onChange={onInputChange}
            value={state.name}
            name="name"
            type="text"
          />
        </div>
        <div className="col-md-5">
          <p className="default-input-label">Timeline</p>
          <DatePicker
            selected={state.expectedEndDate}
            onChange={(date) => onTimelineChange(date)}
            name="timeline"
            placeholderText="Select Date"
            showYearDropdown
            showMonthDropdown
            filterDate={(date) => date.getTime() > Date.now() || Date.now()}
            className="project-timeline"
            useShortMonthInDropdown
            popperClassName="zeedas-datepicker"
            minDate={new Date()}
          />
        </div>
      </div>

      <p className="description" onClick={toggleDescreption}>
        Add a description
      </p>
      {ProjectDescription === true && (
        <ZeedasTextArea
          className=""
          // label="Project Description"
          name="description"
          onChange={onInputChange}
          value={state.description}
          placeholder="Description"
          type="textarea"
          height="150px"
        />
      )}
      <div className="team-lead-cards">
        <p className="team-header">Assign Team Leads</p>
        <div className="team-members-wrapper">
          {getEligibleTeamMembers().map((team, i) => (
            <span key={team._id}>
              {team.user && (
                <TeamList
                  key={team._id}
                  onChangeRadioButton={(e) => onChangeRadioButton(e, team)}
                  checkedItem={state.leadId === team.user._id}
                  team={team}
                  id={team._id}
                />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 icons-tabs">
        <CardComponent
          bgColor="#FDFDFD"
          border="1px solid rgba(45, 45, 45, 0.1)"
          borderRadius="10px"
          minHeight="190px"
        >
          <TabNavigation
            tabNavigationTitles={tabNavigationTitles}
            tabNavigationContents={tabNavigationContents}
          />
        </CardComponent>
      </div>
      <div className="mt-4">
        <BlockLevelButton
          color="zd-blue"
          onClick={checkUploadType}
          disabled={buttonDisable || requesting}
        >
          {requesting ? (
            <span className="d-flex justify-content-center align-items-center">
              <ButtonLoadingIcon
                margin="0 10px 0 0"
                height="16px"
                width="16px"
              />
              {/*{" "}*/}
              {/*Creating Project...*/}
            </span>
          ) : (
            <span>
              <IconPlus height={13} width={13} />
              {" "}
              Create Project
            </span>
          )}
        </BlockLevelButton>
      </div>
    </div>
  );
  // </CardComponent>
};

export default CreateProject;

CreateProject.defaultProps = {
  openCreateProject: () => {},
  toggleDescreption: () => {},
  closeModal: () => {},
  getProjects: () => {},
  ProjectDescription: false,
  teamMembers: [],
  icons: "",
};
CreateProject.propTypes = {
  openCreateProject: PropTypes.func,
  ProjectDescription: PropTypes.bool,
  toggleDescreption: PropTypes.func,
  closeModal: PropTypes.func,
  icons: PropTypes.string,
  getProjects: PropTypes.func,
  teamMembers: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
      PropTypes.string,
      PropTypes.object,
    ]),
  ),
};
