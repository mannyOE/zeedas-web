import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import colors from "utils/colors";
import {
  withRouter, Switch, Route, NavLink,
} from "react-router-dom";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import moment from "moment";

import { setPageTitle } from "state/redux/app-header/actions";
import { ClockIcon } from "../../zeedas-assets/icons/icon-clock";
import KanbanBoard from "./kanban";
import { Module } from "./modules";
import Test from "./test2/index";
import ProjectTeams from "../project-teams";
import IconPlusList from "../../zeedas-assets/icons/icon-plus-list";
import ZeedasFullModal from "../../zeedas-components/full-modal";
import CreateTodo from "./_components/todo";
import { listModules } from "../../state/redux/modules/actions";
import Files from "./files";
import Apps from "./apps";
import App from "../app";
import { AppUtils } from "../../utils/app-utils";
import { APP_ROLES } from "../../utils/constants";
import "./style.scss";
import ProjectOverview from "./overview/index";
import ProjectDetailsCard from "./_components/project-details-card";

export const Project = (props) => {
  const userIsQA = AppUtils.confirmCurrentUserProjectRole(APP_ROLES.QUALITY_ASSURANCE);
  const userIsPM = AppUtils.confirmCurrentUserProjectRole(APP_ROLES.PROJECT_MANAGER);
  const userIsEA = AppUtils.confirmCurrentUserProjectRole(APP_ROLES.ENTERPRISE_ARCHITECT);
  const userIsAdmin = AppUtils.confirmCurrentUserCompanyRole(APP_ROLES.ADMIN);
  const userIsOwner = AppUtils.confirmCurrentUserCompanyRole(APP_ROLES.OWNER);

  const { projectId, moduleId, userRole } = props.match.params;

  const [openTodoModal, setState] = useState(false);
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.single_project);
  const currentUser = useSelector((state) => state.auth.userData);
  const allNotifications = useSelector((state) => state.notification.allNotifications);

  const subRoutes = () => {
    const { history, match } = props;
    const { params } = match;
    const { projectId } = params;

    return [
      {
        name: "Overview",
        path: "/project/:projectId/overview",
        roles: [],
        component: () => <ProjectOverview {...props} />,
      },
      {
        name: "Apps",
        path: "/project/:projectId/apps",
        roles: [],
        component: () => <Apps projectId={params.projectId} />,
      },
      {
        name: "Apps",
        path: "/project/:projectId/apps/:appId",
        roles: [],
        component: () => <App />,
        childRoute: true,
      },
      {
        name: "Test",
        path: "/project/:projectId/test/:userRole?/:moduleId?",
        roles: [APP_ROLES.QUALITY_ASSURANCE],
        component: (props) => <Test {...props} />,
        hidden: !userIsQA && !userIsAdmin && !userIsOwner,
      },
      {
        name: "Teams",
        path: "/project/:projectId/teams",
        roles: [],
        component: (props) => <ProjectTeams {...props} />,
      },
      // {
      //   name: userIsEA ? "Architect" : "Modules",
      //   path: "/project/:projectId/modules/:userRole?/:moduleId?",
      //   component: (props) => <KanbanBoard {...props} userRole={userRole} />,
      //   hidden: !userIsPM && !userIsAdmin && !userIsOwner && !userIsEA,
      // },
      {
        name: "Architect",
        path: "/project/:projectId/modules/:userRole?/:moduleId?",
        roles: [APP_ROLES.ENTERPRISE_ARCHITECT],
        component: (props) => <KanbanBoard {...props} />,
        hidden: !userIsAdmin && !userIsOwner && !userIsEA,
      },
      {
        name: "Modules",
        path: "/project/:projectId/modules/:userRole?/:moduleId?",
        roles: [APP_ROLES.PROJECT_MANAGER],
        component: (props) => <KanbanBoard {...props} />,
        hidden: !userIsPM && !userIsAdmin && !userIsOwner,
      },
      // {
      //   name: 'Files',
      //   path: `/project/:projectId/files`,
      //   component: () => <Files projectId={params.projectId} />,
      // },
    ];
  };

  const iconProps = {
    dimension: {
      width: 12.8,
      height: 12.8,
    },
    color: colors.ZEEDAS_GREEN,
    strokeWidth: 2,
  };

  const toggleTodoModal = () => {
    setState(() => !openTodoModal);
  };

  const filterNotificationsByRole = (userRole, isUnseen = true) => (
    allNotifications.filter((singleNotification) => (
      singleNotification.seen === !isUnseen
      // && singleNotification.role === (Array.isArray(userRole) ? )
      && (
        Array.isArray(userRole)
          ? userRole.includes(singleNotification.role)
          : singleNotification.role === userRole
      )
    ))
  );

  const tabNotificationHandler = (routeData) => {
    let tabNotifications;

    switch (routeData.name) {
      case "Test":
        tabNotifications = filterNotificationsByRole([
          APP_ROLES.QUALITY_ASSURANCE,
          APP_ROLES.OWNER,
          APP_ROLES.ADMIN,
        ]);
        break;
      case "Architect":
        tabNotifications = filterNotificationsByRole([
          APP_ROLES.ENTERPRISE_ARCHITECT,
          APP_ROLES.OWNER,
          APP_ROLES.ADMIN,
        ]);
        break;
      case "Module":
        tabNotifications = filterNotificationsByRole([
          APP_ROLES.PROJECT_MANAGER,
          APP_ROLES.SOFTWARE_DEVELOPER,
          APP_ROLES.OWNER,
          APP_ROLES.ADMIN,
        ]);
        break;
      default:
        break;
    }

    return tabNotifications;
  };

  useEffect(() => {
    dispatch(setPageTitle({ project }));
  }, []);

  return (
    <>
      <div className="project-layout h-100 d-flex flex-column">
        <div className="d-flex justify-content-between project-layout__header">
          <div className="d-flex project-layout__tabs">
            {subRoutes()
              .filter((route) => !route.childRoute && !route.hidden)
              .map((route, index) => {
                const tabNotifications = tabNotificationHandler(route);
                // TODO: Review changes made towards notification routing - MEL
                return (
                  <NavLink
                    key={index}
                    className={`project-layout__tabs-item ${route.roles.includes(userRole) && "active"}`}
                    activeClassName="active"
                    to={
                      route.path
                        .replace(":projectId", `${projectId}`)
                        .replace("/:userRole?", `/${route.roles[0]}`)
                        .replace("/:moduleId?", "")
                        // .replace("/:moduleId?", `${moduleId ? `/${moduleId}` : ""}`)
                    }
                  >
                    <li className="text-center pb-2" key={index} style={{ position: "relative" }}>
                      {route.name}
                      {" "}
                      { tabNotifications && tabNotifications.length > 0 && (
                        <div className="project-tab-notification-count font-weight-light">
                          { tabNotifications.length }
                        </div>
                      )}
                    </li>
                  </NavLink>
                );
              })}
          </div>
          {/* <div className="project-todo" onClick={toggleTodoModal}>
            <IconPlusList />
          </div> */}
          <UncontrolledButtonDropdown>
            <DropdownToggle tag="div">
              <div className="project-layout__timeline d-flex align-items-center pb-2">
                <ClockIcon {...iconProps} />

                <span className="ml-3">
                  Project Deadline:
                  {/* {project.expectedEndDate ? project.expectedEndDate : "--"} */}
                  {project.expectedEndDate
                    ? moment(project.expectedEndDate).format(" Do MMMM YYYY")
                    : "--"}
                </span>
              </div>
            </DropdownToggle>
            <DropdownMenu className="ProjectDetails__card">
              <ProjectDetailsCard />
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>

        <div className="project-layout__body pt-2 flex-grow-1" style={{ minHeight: "0px" }}>
          <Switch>
            {subRoutes().map((route, index) => (
              <Route
                key={index}
                exact
                path={route.path}
                render={(props) => route.component(props)}
              />
            ))}
          </Switch>
        </div>
      </div>

      <ZeedasFullModal
        open={openTodoModal}
        onClose={toggleTodoModal}
        width={
          window.innerWidth >= 768
            ? "50%"
            : window.innerWidth < 600
              ? "100%"
              : "33%"
        }
      >
        <CreateTodo closeModal={toggleTodoModal} />
      </ZeedasFullModal>
    </>
  );
};

export default connect(null, { listModules })(withRouter(Project));
