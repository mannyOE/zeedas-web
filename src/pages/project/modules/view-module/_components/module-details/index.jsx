/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import moment from "moment";
import ZeedasCheckbox from "zeedas-components/checkbox";
import { store } from "state/redux/store";
import {
  modulesSelector,
  updateModule,
  appSelector,
} from "state/redux/modules/actions";
import { projectService } from "services/projects-service";
import { planningService } from "services/planning-service";
import { connect } from "react-redux";
import CalendarCircleIcon from "zeedas-assets/icons/icon-calendar-circle";
import { APP_ROLES, MODULE_STATUS, COMPLEXITY_RATINGS } from "utils/constants";
import { AppUtils } from "utils/app-utils";
import colors from "utils/colors";
import list from "state/redux/modules/list";
import { appConstants } from "../../../../../../constants/app.constants";

import SelectOption from "../../../../../app/_components/select-option";
import PageLoader from "../../../../../../zeedas-components/page-loader";

//
const [backlog, assigned, planning, development, inReview, done] = list;

const ModuleDetails = (props) => {
  const {
    module,
    $updateModule,
    isFetching,
    modules,
    apps,
    id,
  } = props;

  const userIsEA = AppUtils.confirmCurrentUserProjectRole(APP_ROLES.ENTERPRISE_ARCHITECT);

  const [app, setApp] = useState(apps.data.find((app) => app._id === module.app));
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loadingTeamMembers, setLoadingTeamMembers] = useState(false);
  // const [tempPlanningStatus, setTempPlanningStatus] = useState(module.planning);
  const [tempPlanningStatus, setTempPlanningStatus] = useState(false);
  const [loadingTestCases, setLoadingTestCases] = useState(false);
  const [settingComplexity, setSettingComplexity] = useState(false);
  const [taskComplexity, setTaskComplexity] = useState(
    module.complexity ? module.complexity.value : 1,
  );
  const [activePlan, setActivePlan] = useState({});

  const formatTeamMembers = (teamMembersList) => teamMembersList
    .filter((member) => member.roles.includes(APP_ROLES.SOFTWARE_DEVELOPER))
    .map((member) => ({
      label: member.user.name,
      value: member.user._id,
      avatar: member.user.avatar,
      avatarColor: member.user.avatarColor,
      email: member.user.email,
    }));

  const getAssignee = (members) => (module.sd
    ? members.find((member) => member.value === module.sd)
    : null);

  const getTeamMembers = () => {
    setLoadingTeamMembers(true);
    projectService.getTeamMembers().then((res) => {
      setLoadingTeamMembers(false);

      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        const formattedTeamMembers = formatTeamMembers(response.data.members);
        setTeamMembers(formattedTeamMembers);
        setSelectedTeamMember(getAssignee(formattedTeamMembers));
      } else if (res.status === appConstants.ERROR_RESPONSE) {
      }
    });
  };

  const getInitials = (name) => {
    const nameArr = name.split(" ");
    if (nameArr && nameArr.length > 0) { return `${nameArr[0][0]}${nameArr[1] ? `.${nameArr[1][0]}` : ""}`; }
  };

  const handleAssignDeveloper = (selectedMember) => {
    setLoadingTeamMembers(true);

    $updateModule(module._id, {
      project: module.project,
      sd: selectedMember.value,
    })
      .then(() => {
        if (selectedMember.value) {
          setSelectedTeamMember(selectedMember);
        } else {
          setSelectedTeamMember(null);
        }
      })
      .finally(() => {
        setLoadingTeamMembers(false);
      });
  };

  // TODO: This version of handlePlanning is a placeholder. Uncomment the commented parts when due
  const handlePlanning = () => {
  // const handlePlanning = ({ target }) => {
    // setTempPlanningStatus(target.checked);
    $updateModule(module._id, {
      project: module.project,
      // planning: target.checked,
      planning: tempPlanningStatus,
    });
  };

  const canAssignDev = userIsEA && module.stage === backlog.stage;

  const setComplexity = (selectedComplexity) => {
    // const { planning: planningState } = store.getState();
    const payload = {
      module: module._id,
      complexity: selectedComplexity.value,
    };
    setSettingComplexity(true);
    planningService.setComplexity(payload)
      .then((response) => {
        // setTaskComplexity(selectedComplexity);
      })
      .finally(() => {
        setSettingComplexity(false);
        setTaskComplexity(selectedComplexity);
      });
  };

  const { single_project: project } = store.getState().projects;

  useEffect(() => {
    getTeamMembers();
    if (userIsEA && (module.status === "backlog" || module.status === "assigned")) {
      // handlePlanning();
    }
    // getActivePlan();
  }, []);

  const formatOptionLabel = ({
    value, label, avatar, avatarColor, email,
  }) => (
    <div className="d-flex align-items-center">
      <div className="value mr-2">
        {!avatar ? (
          <span
            className="assignee__avatar d-inline-flex"
            style={{ backgroundColor: avatarColor }}
          >
            {getInitials(label)}
          </span>
        ) : (
          <img
            src={avatar}
            alt=""
            className="assignee__avatar d-inline-flex"
            style={{ backgroundColor: avatarColor }}
          />
        )}
      </div>
      <div>
        <div className="font-12">{label}</div>
        <div style={{ fontSize: "10px", color: colors.ZEEDAS_GREY }}>
          {email}
        </div>
      </div>
    </div>
  );

  return (
    <div className="ViewModule__details py-4 mb-2 px-5">
      {(module.stage === backlog.state && userIsEA)
        // TODO: review the added `userIsEA` in the condition below - MEL
        || (module.stage !== backlog.state && userIsEA && (
          <div className="row justify-content-between" style={{ height: "62px" }}>
            {/* <div className="ViewModule__details-item py-2 mb-2 col-md-7"> */}
             <div className="ViewModule__details-item py-2 mb-2 col-md-8">
              <label htmlFor="assignee" className="mr-2">
                Assignee
              </label>
              <div className="value d-flex flex-grow-1">
                <SelectOption
                  onChange={handleAssignDeveloper}
                  options={[
                    {
                      label: "Unassigned",
                      value: null,
                    },
                    ...teamMembers,
                  ]}
                  value={selectedTeamMember}
                  borderless
                  placeholder={canAssignDev ? "Select team member" : "--"}
                  className="flex-grow-1"
                  isSearchable
                  isLoading={loadingTeamMembers}
                  hideIndicator
                  getOptionLabel={(option) => `${option.label}`}
                  formatOptionLabel={formatOptionLabel}
                  placeholderColor={colors.ZEEDAS_GREY}
                  disabled={!canAssignDev}
                />
              </div>
            </div>

            {/* remove assigned developer */}
            {/* {
              selectedTeamMember
              && (
              <div
                className="ViewModule__details-item py-2 mb-0 mr-auto
                col-md-2 font-12 text-danger align-self-center"
                onClick={() => handleAssignDeveloper("")}
                style={{
                  cursor: "pointer",
                  height: "30px",
                }}
              >
                remove
              </div>
              )
            } */}

            <div className="ViewModule__details-item py-2 mb-2 col-md-3">
              {/* TODO: UNCOMMENT WHEN REIMPLEMENTED */}
              {/* <ZeedasCheckbox
                id="signup-terms"
                text="Planning"
                disabled={!canAssignDev}
                checked={tempPlanningStatus}
                square
                handleCheckboxChange={handlePlanning}
              /> */}
            </div>
            <div className="ViewModule__details-item py-2 mb-2 col-md-1">
              {/* <InfoPopover id="info" /> */}
            </div>
          </div>
        ))}
      <div className="ViewModule__details-item row py-2 mb-3">
        <div className="col-md-8 d-flex align-items-center">
          <label htmlFor="due-date" className="mr-2">
            Due Date
          </label>
          {module.dueDate ? (
            <div className="value d-flex align-items-center">
              <CalendarCircleIcon />

              <span className="ml-2">
                {moment(module.dueDate).format("ddd, DD MMM YYYY")}
              </span>
            </div>
          ) : (
            <div style={{ color: "#A5A4A4" }}>--</div>
          )}
        </div>

        {
          userIsEA && (
            <div className="ViewModule__details-item py-2 mb-2 mr-4 col-md-3">
              <label htmlFor="complexitySelect" className="mr-2">
                Complexity
              </label>
              <div className="value d-flex flex-grow-1">
                <SelectOption
                  width="45px"
                  height="21px"
                  onChange={setComplexity}
                  options={COMPLEXITY_RATINGS}
                  value={taskComplexity}
                  placeholder={taskComplexity}
                  padding="0px"
                  // borderless
                  borderStyle={{
                    border: "transparent",
                    borderBottom: "2px solid #e8e9ed",
                    borderBottomRightRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                  hideIndicator
                  className="flex-grow-1"
                  isSearchable
                  disabled={!selectedTeamMember}
                  // disabled={activePlan.plan}
                  // isLoading={settingComplexity || !activePlan.plan}
                  isLoading={settingComplexity}
                  placeholderColor={colors.ZEEDAS_GREY}
                />
              </div>
            </div>
          )
        }
      </div>

      <div className="ViewModule__details-item py-2 mb-3 row">
        <div className="col-md-8 d-flex align-items-center">
          <label htmlFor="due-date" className="mr-2">
            App
          </label>
          <div className="value row align-items-center">
            {module.app && app ? (
              <>
                <div className="col-md-3 text-center">
                  <img src={app.icon} alt="" width="21px" className="mx-2" />
                </div>
                <div className="col">
                  <span>{app.name}</span>
                </div>
              </>
            ) : (
              <div className="col" style={{ color: "#A5A4A4" }}>
                --
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="ViewModule__details-item py-2 mb-2 row">
        <div className="col-md-12 d-flex align-items-center">
          <label htmlFor="description" className="mr-2">
            Description
          </label>
          <div className="value flex-grow-1">
            <p className="m-0 font-12">
              {module.desc || <span style={{ color: "#A5A4A4" }}>--</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, { id }) => {
  const modules = modulesSelector(state);
  const module = modules.find(({ _id }) => _id === id);
  return {
    apps: appSelector(state),
    modules,
    module,
    isFetching: state.modules.isFetching,
  };
};

export default connect(mapStateToProps, { $updateModule: updateModule })(ModuleDetails);
