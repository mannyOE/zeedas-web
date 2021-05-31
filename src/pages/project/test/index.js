import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Content } from "../style";
import TestCases from "./test-cases";
import Overview from "./overview";
import {
  modulesSelector,
  listModules,
} from "../../../state/redux/modules/actions";
import { ListTestModules } from "./test-cases/list-modules";
import list from "../../../state/redux/modules/list";
import { fetchStats } from "../../../state/redux/test/actions";
import ModuleTestCases from "../modules/view-module/_components/test-cases";

const Test = (props) => {
  const {
    match, listModules, modules, fetchStats,
  } = props;
  const { params } = match;
  const [activeModuleId, setActiveModuleId] = useState("");

  useEffect(() => {
    listModules(params.projectId);
    fetchStats(params.projectId);
    setActiveModuleId(modules[0]._id);
  }, [params.projectId, listModules]);

  return (
    <>
      <Content>
        <ListTestModules
          modules={modules}
          activeModuleId={activeModuleId}
          setActiveModule={setActiveModuleId}
        />
        <ModuleTestCases activeModuleId={activeModuleId} />
        {/* <TestCases
          projectId={params.projectId}
          activeModuleId={activeModuleId}
        /> */}
        <Overview />
      </Content>
    </>
  );
};

const filterModules = (modules = []) => modules.filter((module) => {
  const [backlog, x, y, inReview] = list;
  return module;
  // return (
  //   (module.status === backlog.status &&
  //     (module.state === backlog.state[1] ||
  //       module.state === backlog.state[2])) ||
  //   (module.status === inReview.status && module.state === inReview.state[1])
  // );
});

const mapStateToProps = (state) => ({
  modules: filterModules(modulesSelector(state)),
});

export default connect(mapStateToProps, { listModules, fetchStats })(
  withRouter(Test),
);
