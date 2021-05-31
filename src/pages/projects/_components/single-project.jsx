import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { projectActions } from "../../../state/redux/project/actions";
import CardComponent from "../../../zeedas-components/card";
import IconMore from "../../../zeedas-assets/icons/icon-more";
import IconEye from "../../../zeedas-assets/icons/icon-eye";
import IconTrashAlt from "../../../zeedas-assets/icons/icon-trash-alt";
import AvatarStacked from "../../../zeedas-components/avatar-stacked";
import { AppUtils } from "../../../utils/app-utils";
import { APP_ROLES } from "../../../utils/constants";

const SingleProject = ({
  history,
  project,
  openEditProject,
  openShareProject,
  copyProjectLink,
  openDeleteProject,
}) => {
  const dispatch = useDispatch();
  const [singleProject, setProject] = useState({});
  const filterProject = () => {
    const singleProjects = project;
    const getUsers = singleProjects.users.filter(
      (user) => user.projectMember !== undefined && user.projectMember === true,
    );
    singleProjects.users = getUsers;

    setProject(singleProjects);
  };
  useEffect(() => {
    filterProject();
  }, [project]);

  const handleRouting = () => {
    const userRole = AppUtils.getCurrentUserRole();
    dispatch(projectActions.fetchSingleProject(project._id));
    history.push(`/project/${project._id}/overview`);
  };

  const userRoles = AppUtils.getCurrentUserRolesList();
  const userIsAdmin = userRoles.includes(APP_ROLES.OWNER) || userRoles.includes(APP_ROLES.ADMIN);

  return (
    <div className="project-card">
      <CardComponent height="165px" borderRadius="10px">
        <div className="project-header">
          <img
            className="company-logo"
            src={project.icon}
            alt=""
            onClick={() => handleRouting()}
          />
          { userIsAdmin && (
            <UncontrolledButtonDropdown className="cardDropdown">
              <DropdownToggle nav>
                <IconMore />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleRouting()}>
                  <IconEye />
                  <span style={{ marginLeft: "12px" }} className="">
                    View Details
                  </span>
                </DropdownItem>
                <DropdownItem onClick={openEditProject}>
                  <span className="noicon-text">Edit Name & Description</span>
                </DropdownItem>

                <DropdownItem onClick={copyProjectLink}>
                  <span className="noicon-text">Copy project Link</span>
                </DropdownItem>
                {/* <DropdownItem onClick={openShareProject}>
                  <span className="noicon-text">Share</span>
                </DropdownItem> */}
                <DropdownItem onClick={openDeleteProject}>
                  <IconTrashAlt />
                  {" "}
                  <span className="icon-text delete">Delete Project</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          )}
        </div>
        <div className="project-title" onClick={() => handleRouting()}>
          <h6>{project.name}</h6>
          <p>{project.description}</p>
        </div>

        {/* Please delete the div below when you uncomment pregress bar */}
        <div style={{ margin: "10px 0", height: "17px" }} />
        {/* <ProgressBar percentage="25" color="success" margin="10px 0" /> */}
        <div className="project-members">
          {/* <div className="avartar-wrap"> */}
          <AvatarStacked items={project.users} />
          {/* </div> */}

          <h6>
            {project.users.length}
            {" "}
            Team Members
          </h6>
        </div>
      </CardComponent>
    </div>
  );
};

SingleProject.defaultProps = {
  project: {},
  closeEditProjectModal: () => {},
  openEditProject: () => {},
  copyProjectLink: () => {},
  openShareProject: () => {},
  openDeleteProject: () => {},
};

SingleProject.propTypes = {
  project: PropTypes.object,
  closeEditProjectModal: PropTypes.func,
  openEditProject: PropTypes.func,
  openShareProject: PropTypes.func,
  copyProjectLink: PropTypes.func,
  openDeleteProject: PropTypes.func,
};

export default withRouter(function (props) {
  return <SingleProject {...props} {...this} />;
});
