import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  withRouter, Switch, Route, Redirect,
} from "react-router-dom";
import {
  TabListComponent, ProjectTimeline, theme, Body,
} from "./style";
import { ClockIcon } from "../../zeedas-assets/icons/icon-clock";
import { Tab } from "./_components/tabs";
import KanbanBoard from "./kanban";
import { Module } from "./modules";
import Test from "./test2";
import ProjectTeams from "../project-teams";
import IconPlusList from "../../zeedas-assets/icons/icon-plus-list";
import ZeedasFullModal from "../../zeedas-components/full-modal";
import CreateTodo from "./_components/todo";
import { listModules } from "../../state/redux/modules/actions";
import Files from "./files";
import Apps from "./apps";
import App from "../app/index";

const { colors } = theme;

const iconProps = {
  dimension: {
    width: 12.8,
    height: 12.8,
  },
  color: colors.green,
  strokeWidth: 1,

};

export const TabComponent = ({}) => {
  const [openTodoModal, setState] = useState(false);
  const toggleTodoModal = () => {
    setState(() => !openTodoModal);
  };
  return (
    <>
      <TabListComponent onClick={toggleTodoModal}>
        <IconPlusList />
      </TabListComponent>
      <TabListComponent>
        <ProjectTimeline>
          <ClockIcon {...iconProps} />
          Project Deadline: 6 weeks
        </ProjectTimeline>
      </TabListComponent>
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

export const Kanban = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { tab } = params;

  const goTo = (path) => {
    history.replace(`/project/${params.projectId}/${path}`);
  };

  return (
    <Body>
      <Tab TabListComponent={TabComponent} goTo={goTo} selectedPath={tab}>
        <Tab.Panel label="Overview" path="overview" />

        <Tab.Panel label="Apps" path="apps">
          <Apps projectId={params.projectId} />
        </Tab.Panel>
        <Tab.Panel label="Test" path="test">
          <Test />
        </Tab.Panel>
        <Tab.Panel label="Teams" path="project-teams">
          <ProjectTeams />
        </Tab.Panel>
        <Tab.Panel label="Modules" path="modules">
          <KanbanBoard />
        </Tab.Panel>
        <Tab.Panel label="Files" path="files">
          <Files projectId={params.projectId} />
        </Tab.Panel>
      </Tab>
    </Body>
  );
};

export default connect(null, { listModules })(withRouter(Kanban));
