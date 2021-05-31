import React, { useState, useEffect } from "react";
import "./style.scss";
import { connect, useDispatch } from "react-redux";
import { AppUtils } from "utils/app-utils";
import list from "state/redux/modules/list";
import { comment } from "state/redux/comment/actions";
import {
  modulesSelector,
  updateModule,
  appSelector,
} from "../../../../state/redux/modules/actions";
import {
  APP_ROLES,
  MODULE_STATUS,
  MODULE_TEST_STATES,
} from "../../../../utils/constants";
import ModuleDetails from "./_components/module-details/index";
import ModuleTestCases from "./_components/module-test-cases/index";
import ModuleComments from "../_components/module-comments";

const ViewModuleEA = (props) => {
  const dispatch = useDispatch();
  const {
    module,
    isFetching,
    handleSubmit,
  } = props;

  const userIsQA = AppUtils.confirmCurrentUserProjectRole(APP_ROLES.QUALITY_ASSURANCE);

  const { backlog, published, review } = MODULE_TEST_STATES;
  const moduleStatusQA = {
    [backlog.value]: backlog,
    [published.value]: published,
    [review.value]: review,
  };

  const [activeTabIndex, setActiveTabIndex] = useState(userIsQA ? 1 : 0);

  const getModuleStatus = () => {
    if (userIsQA && module.state) return moduleStatusQA[module.state].name;

    const moduleStatus = list.find(
      (item) => item.status === module.status && item.stage === module.stage,
    );
    return moduleStatus.title;
  };

  const getComments = () => {
    dispatch(
      comment.fetchComments({
        app: module.app,
        module: module._id,
      }),
    );
  };

  const handleComments = () => (
    dispatch(
      comment.setCommentTarget({
        app: module.app,
        module: module._id,
      }),
    )
      .then(() => getComments())
  );

  const getModuleActivity = () => (
    dispatch(
      comment.fetchActivities("module", module._id),
    )
  );

  const tabs = [
    {
      name: "Activities",
      component: <ModuleComments />,
    },
    {
      name: "Test Cases",
      component: (
        <ModuleTestCases
          moduleId={module._id}
          testState={module.state}
          handleSubmit={handleSubmit}
          userIsQA={userIsQA}
        />
      ),
    },
  ];

  useEffect(() => {
    handleComments();
    getModuleActivity();

    return (() => {
      dispatch(comment.clearActivities());
    });
  }, []);

  return (
    <div className="ViewModule d-flex flex-column h-100">
      <div className="ViewModule__header d-flex justify-content-between align-items-center pb-3 px-5 pt-4">
        <h2 className="font-18 text-capitalize">{module.name}</h2>
        {isFetching && <span className="loading-status">Saving...</span>}
        <span
          style={{
            backgroundColor: userIsQA && module.state ? moduleStatusQA[module.state].color : "",
          }}
          className={`ViewModule__status text-capitalise ${
            module.status ? module.status.toLowerCase() : ""
          }`}
        >
          {getModuleStatus()}
        </span>
      </div>
      <div
        className="flex-grow-1 d-flex flex-column h-100"
        style={{ minHeight: "0px", overflowY: "auto" }}
      >
        <ModuleDetails id={module._id} />

        <div className="ViewModule__Tabs px-5 flex-grow-1 d-flex flex-column">
          <div className="ViewModule__Tabs-header d-flex">
            {tabs.map((tab, index) => (
              <a
                className={`ViewModule__Tab px-3 py-2 d-block ${
                  index === activeTabIndex ? "active" : ""
                }`}
                type="button"
                key={index}
                onClick={() => setActiveTabIndex(index)}
              >
               <span>{tab.name}</span>
              </a>
            ))}
          </div>
          <div className="ViewModule__Tab-content flex-grow-1">
            {tabs[activeTabIndex].component}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, { id, handleSubmit }) => {
  const modules = modulesSelector(state);
  const module = modules.find(({ _id }) => _id === id);
  return {
    apps: appSelector(state),
    modules,
    module,
    isFetching: state.modules.isFetching,
    handleSubmit,
  };
};
export default connect(mapStateToProps, { updateModule })(ViewModuleEA);
