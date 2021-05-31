import React, { useState, useEffect } from "react";
import "./style.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { listModules, modulesSelector } from "state/redux/modules/actions";
import list from "state/redux/modules/list";
import { fetchStats, createTestCase } from "state/redux/test/actions";
import ZeedasFullModal from "zeedas-components/full-modal";
import { MODULE_TEST_STATES } from "utils/constants";
import ProjectTestOverview from "./_components/test-overview/index";
import { CodeReviewSnippet } from "../modules/code-review/index";
import NewTestCase from "./_components/new-test-case";
import ModuleTestCases from "./_components/test-cases/index";
import { ListBody } from "../_components/list/style";
import ModuleCard from "../modules/_components/module-card/index";
import TestFilter from "./_components/test-filter";
import ViewModule from "../modules/view-module/index";

const { backlog, published, review } = MODULE_TEST_STATES;
const moduleTestStates = [backlog, published, review];
const ModuleColumn = ({
  headerText, modules, onClick, active, handleCardClick,
}) => (
  <>
    <div className="d-flex align-items-center justify-content-between">
      <h2 className="font-14">{headerText}</h2>
      {/* <TestFilter
          activeFilters={activeFilters}
          addFilter={(filter) => addFilter(filter)}
          removeFilter={(filter) => removeFilter(filter)}
        /> */}
    </div>
    <ListBody empty={!modules.length}>
      {modules.map((module) => (
        <ModuleCard
          onClick={() => handleCardClick(module._id)}
          module={module}
          className="mb-2"
          showNotification={false}
          active={active}
        />
      ))}
    </ListBody>
  </>
);

const ProjectTest = (props) => {
  const {
    match, listModules, modules, fetchStats, createTestCase,
  } = props;
  const { params } = match;
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [viewModule, setViewModule] = useState(false);

  useEffect(() => {
    listModules(params.projectId);
    fetchStats(params.projectId);
    // if (modules.length > 0) setActiveModuleId(modules[0]._id);
  }, [params.projectId, listModules]);

  const filterModules = (state) => {
    if (!state) return modules;
    return modules.filter((module) => module.state === state);
  };

  return (
    <>
      <div className="ProjectTest h-100 mt-4">
        <div className="row flex-grow-1 h-100" style={{ minHeight: "0px" }}>
          <div className="col-md-7 h-100">
            <div className="row flex-grow-1 h-100">
              {moduleTestStates.map((state, index) => (
                <div className="col-md-4 h-100 d-flex flex-column">
                  <ModuleColumn
                    key={index}
                    headerText={state.name}
                    modules={filterModules(state.value)}
                    active={false}
                    handleCardClick={(id) => setActiveModuleId(id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5 h-100 d-flex flex-column">
            <h2 className="font-14">Quick Overview</h2>
            <div className="ProjectTest__card py-5 px-4">
              <ProjectTestOverview />
            </div>
          </div>
        </div>
      </div>
      {activeModuleId && (
        <ZeedasFullModal
          open={!!activeModuleId}
          onClose={() => setActiveModuleId(null)}
          removeDefaultPadding
          width={
            window.innerWidth >= 768
              ? "45%"
              : window.innerWidth < 600
                ? "100%"
                : "33%"
          }
        >
          <ViewModule id={activeModuleId} />
        </ZeedasFullModal>
      )}
    </>
  );
};

const filterModules = (modules = []) => modules.filter((module) => {
  const [backlog, assigned, planning, development, inReview] = list;
  // return modules;
  return (
    (module.status === backlog.status && (module.state === backlog.state[0] || module.state === backlog.state[1]))
    || module.state === backlog.state[2]
    || (module.status === inReview.status && module.state === inReview.state[1])
  );
});

const mapStateToProps = (state) => ({
  modules: filterModules(modulesSelector(state)),
});

export default connect(mapStateToProps, {
  listModules,
  fetchStats,
  createTestCase,
})(withRouter(ProjectTest));
