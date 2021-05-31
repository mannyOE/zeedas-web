import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import CardComponent from "../../../../zeedas-components/card";
import IconMore from "../../../../zeedas-assets/icons/icon-more";
import IconTrashAlt from "../../../../zeedas-assets/icons/icon-trash-alt";
import IconEditAlt from "../../../../zeedas-assets/icons/icon-edit-alt";
import TransactionBadge from "../../../../zeedas-components/transaction-badge.jsx";
import {AppUtils} from "../../../../utils/app-utils";
import {APP_ROLES} from "../../../../utils/constants";

const SingleApp = ({
  history, projectId, app, openEditApp, openDeleteApp,
}) => {
  const routeToApp = () => {
    history.push(`/project/${projectId}/apps/${app._id}`);
  };

  const userRoles = AppUtils.getCurrentUserRolesList();
  const userIsAdmin = userRoles.includes(APP_ROLES.OWNER) || userRoles.includes(APP_ROLES.ADMIN);

  return (
    <div className="project-card">
      <CardComponent height="136px" borderRadius="10px">
        <div className="project-header">
          <img className="company-logo" src={app.icon} alt="" />
          { userIsAdmin && (
            <UncontrolledButtonDropdown className="cardDropdown">
              <DropdownToggle nav>
                <IconMore />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={openEditApp}>
                  <IconEditAlt />
                  {" "}
                  <span className="icon-text">Edit Name & Description</span>
                </DropdownItem>
                <DropdownItem onClick={openDeleteApp}>
                  <IconTrashAlt />
                  {" "}
                  <span className="icon-text delete">Delete App</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          )}
        </div>
        <div className="project-title" onClick={routeToApp}>
          <h6>{app.name}</h6>
          <p className="my-1" style={{ minHeight: "14px" }}>{app.description}</p>
        </div>
        <div className="d-flex mt-2 scroll-div">
          {app.skills.map((skill, i) => (
            <span className="mr-2  " key={i}>
              <TransactionBadge
                status={skill}
                bgColor="rgba(226, 229, 242, 0.4)"
                padding="11px 13px"
                width="max-content"
                height="0"
                color="#2E384D"
              />
            </span>
          ))}
        </div>
      </CardComponent>
    </div>
  );
};

SingleApp.defaultProps = {
  app: {},
  openEditApp: () => {},
  openDeleteApp: () => {},
  projectId: "",
};

SingleApp.propTypes = {
  app: PropTypes.object,
  openEditApp: PropTypes.func,
  openDeleteApp: PropTypes.func,
  projectId: PropTypes.string,
};

// export default SingleApp;
export default withRouter(function (props) {
  return <SingleApp {...props} {...this} />;
});
