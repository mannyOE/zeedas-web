import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { planning } from "state/redux/planning/actions";
import { comment } from "state/redux/comment/actions";
import { planningService } from "services/planning-service";
import colors from "utils/colors";
import { COMMENT_TYPES, COMPLEXITY_RATINGS } from "utils/constants";
import "./style.scss";

import PlanningSidebar from "./_components/planning-sidebar";
import PlanningSnippet from "./_components/planning-snippet";
import PlanningFileSystem from "./_components/planning-file-system/index";
import SelectOption from "../../../app/_components/select-option";
import ModuleComments from "../_components/module-comments/index";

const Planning = ({ onCloseModal, task }) => {
  const dispatch = useDispatch();
  const activeProject = useSelector((state) => state.projects.single_project);
  const activePlan = useSelector((state) => state.planning.activePlan);
  // const activeModule = useSelector((state) => state.modules.module[0]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [moduleComplexity, setModuleComplexity] = useState(
    activePlan.module ? activePlan.module.complexity.value : 1,
  );
  const [dependencies, setDependencies] = useState([]);
  const [fetchingPlan, setFetchingPlan] = useState(false);
  const [settingComplexity, setSettingComplexity] = useState(false);
  const [approvingPlan, setApprovingPlan] = useState(false);

  const fetchPlan = () => {
    setFetchingPlan(true);
    dispatch(planning.fetchPlan(task._id))
      .then(() => {
        // initSnippet();
      })
      .finally(() => {
        setFetchingPlan(false);
      });
  };

  const initSnippet = () => {
    const firstSnippet = activePlan.plan.classes[0];
    dispatch(planning.setActiveSnippet(firstSnippet));
    dispatch(
      comment.setCommentTarget({
        app: firstSnippet.app,
        module: task._id,
        type: COMMENT_TYPES.class,
        id: firstSnippet._id,
        name: firstSnippet.name,
      }),
    );
  };

  const fetchComments = (snippet) => {
    const payload = {
      app: snippet.app,
      module: task._id,
      target: snippet._id,
    };
    // dispatch(comment.fetchComments(payload));
  };

  const tabs = [
    {
      name: "Comments",
      component: <ModuleComments task={task} className="pt-4" />,
    },
    {
      name: "File System",
      component: <PlanningFileSystem task={task} className="px-5" />,
    },
  ];

  const setComplexity = (selectedComplexity) => {
    const payload = {
      module: activePlan.module,
      complexity: selectedComplexity.value,
    };
    setSettingComplexity(true);
    planningService
      .setComplexity(payload)
      .then((response) => {
        setModuleComplexity(selectedComplexity);
      })
      .finally(() => setSettingComplexity(false));
  };
  const approvePlan = () => {
    const payload = {
      plan: activePlan.plan._id,
    };
    setApprovingPlan(true);
    planningService
      .approvePlan(payload)
      .then((response) => {
      })
      .finally(() => setApprovingPlan(false));
  };

  useEffect(() => {
    if (!activePlan.plan) return;
    setModuleComplexity(
      activePlan.module.complexity
        ? activePlan.module.complexity.value
        : moduleComplexity,
    );
    initSnippet();
  }, [activePlan]);

  useEffect(() => {
    fetchPlan();
  }, []);

  return (
    <div className="Planning py-5 px-3  d-flex flex-column">
      <div className="d-flex align-items-center">
        <a
          className="Planning__close font-24 position-relative"
          style={{ top: "-20px" }}
          onClick={() => onCloseModal()}
        >
          &times;
        </a>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-5">
        <h1 className="Planning__header">
          <img src={activeProject.icon} alt="" width="21px" className="mr-2" />
          <span>{activeProject.name}</span>
        </h1>
        <div className="d-flex">
          <div className="d-flex mr-5 align-items-center">
            <span className="font-14 mr-3">Complexity</span>
            <SelectOption
              value={moduleComplexity}
              onChange={setComplexity}
              options={COMPLEXITY_RATINGS}
              // bgColor={colors.ZEEDAS_INPUT_GREY}
              border={colors.ZEEDAS_INPUT_GREY}
              // placeholderColor={colors.ZEEDAS_INPUT_GREY}
              placeholderColor="#000"
              hideIndicator
              placeholder={moduleComplexity}
              height="unset"
              width="45px"
              padding="0"
            />
          </div>
          <button className="Planning__button approve mr-3" onClick={approvePlan} disabled={approvingPlan}>Approve</button>
          <button className="Planning__button cancel">Cancel</button>
        </div>
      </div>

      <div className="row flex-grow-1" style={{ minHeight: "0px" }}>
        <div className="col-md-2 h-100">
          <PlanningSidebar
            task={task}
            moduleSnippets={activePlan.plan ? activePlan.plan.classes : []}
          />
        </div>
        <div className="col-md-5 h-100">
          <PlanningSnippet task={task} dependencies={dependencies} />
        </div>
        <div className="col-md-5 h-100">
          <div className="Planning__tab-component d-flex flex-column h-100">
            <div className="Planning__tabs">
              <div className="row no-gutters">
                {tabs.map((tab, index) => (
                  <div className={`col-md-${12 / tabs.length}`} key={index}>
                    <a
                      onClick={() => setActiveTabIndex(index)}
                      className={`d-block text-center tab p-3 ${
                        activeTabIndex === index ? "active" : ""
                      }`}
                    >
                      {tab.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-100" style={{ overflowY: "auto" }}>
              {tabs[activeTabIndex].component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planning;
