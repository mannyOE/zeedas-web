import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { projectService } from "services/projects-service";
import { notify } from "zeedas-components/bottom-notification";
import { setPageTitle } from "state/redux/app-header/actions";
import ZeedasModal from "zeedas-components/modal";
import ActionMessage from "zeedas-components/action-message";
import IconDeleteAlt from "zeedas-assets/icons/icon-delete-alt";
import EditProject from "../edit-project";
import { appConstants } from "../../../../constants/app.constants";
import { AppUtils } from "../../../../utils/app-utils";
import IconTrashAlt from "../../../../zeedas-assets/icons/icon-trash-alt";
import IconEye from "../../../../zeedas-assets/icons/icon-eye";
import { projectActions } from "../../../../state/redux/project/actions";
import ShareProject from "../share-project";
import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
} from "../../../../constants/index";
import "../../style.scss";
import "./style.scss";

const SingleProjectMenu = ({ menuToggleComponent }) => {
  const project = useSelector((state) => state.projects.single_project);
  const [openEditProject, setOpenEditProject] = useState(false);
  const [openShareProject, setOpenShareProject] = useState(false);
  const [openDeleteProject, setOpenDeleteProject] = useState(false);

  const copyProjectLink = (link) => {
    const aux = document.createElement("input");
    aux.setAttribute("value", link);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    notify("Project link copied to clipboard", NOTIFICATION_SUCCESS);
  };

  const deleteProject = () => {
    projectService.deleteProject(project._id).then((res) => {
      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        notify(response.message, NOTIFICATION_SUCCESS);
        // setRequesting(false);
        getProjects();
        setOpenDeleteProject(false);
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        // window.alert(response.message);
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  const getProjects = () => {
    /* Direct */
    projectService.getProjects().then((res) => {
      const { response } = res;

      if (res.status === appConstants.SUCCESS_RESPONSE) {
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        // window.alert(response.message);
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  return (
    <>
      <UncontrolledButtonDropdown className="cardDropdown SingleProjectMenu">
        <DropdownToggle nav>{menuToggleComponent}</DropdownToggle>
        <DropdownMenu positionFixed right>
          <DropdownItem onClick={() => setOpenEditProject(true)}>
            <span className="noicon-text">Edit Name & Description</span>
          </DropdownItem>

          <DropdownItem onClick={() => copyProjectLink()}>
            <span className="noicon-text">Copy project Link</span>
          </DropdownItem>
          {/* <DropdownItem onClick={openShareProject}>
                <span className="noicon-text">Share</span>
              </DropdownItem> */}
          <DropdownItem onClick={() => setOpenDeleteProject(true)}>
            <IconTrashAlt />
            {" "}
            <span className="icon-text delete">Delete Project</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>

      <ZeedasModal
        open={openEditProject}
        onClose={() => setOpenEditProject(false)}
        title="Edit Name & Description"
        description={`For ${project.name}`}
        width={
          window.innerWidth >= 1200
            ? "35%"
            : window.innerWidth >= 768
              ? "50%"
              : window.innerWidth < 600
                ? "100%"
                : "33%"
        }
      >
        <EditProject
          project={project}
          getProjects={() => getProjects()}
          closeModal={() => setOpenEditProject(false)}
        />
      </ZeedasModal>

      <ZeedasModal
        open={openShareProject}
        onClose={() => setOpenShareProject(false)}
        title="Share Project"
        align="center"
        width={
          window.innerWidth >= 1200
            ? "35%"
            : window.innerWidth >= 768
              ? "50%"
              : window.innerWidth < 600
                ? "100%"
                : "33%"
        }
      >
        <ShareProject
          closeModal={() => setOpenShareProject(false)}
          projectId={project._id}
        />
      </ZeedasModal>

      <ZeedasModal
        open={openDeleteProject}
        onClose={() => setOpenDeleteProject(false)}
        title="Delete Project"
        description={`For ${project.name}`}
        width="35%"
      >
        <ActionMessage
          question={`Are you sure you want to Delete ${project.name}?`}
          info="This Project will be deleted and can never be retrived."
          proceedText="Delete this Project"
          btnProceedColor="zd-dark-pink"
          icon={<IconDeleteAlt fill="#fff" />}
          onClickProceed={() => deleteProject()}
          onClickCancel={() => setOpenDeleteProject(false)}
          switchButtonOrder
        />
      </ZeedasModal>
    </>
  );
};

export default SingleProjectMenu;
