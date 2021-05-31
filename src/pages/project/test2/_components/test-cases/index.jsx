import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./style.scss";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import SquareCommentsIcon from "zeedas-assets/icons/icon-comments-square";
import {
  updateTestCase,
  fetchTestCases,
  testCaseSelector,
  deleteTestCase,
} from "state/redux/test/actions";
import IconDeleteAlt from "zeedas-assets/icons/icon-delete-alt";
import colors from "utils/colors";
import IconCircleCheck from "zeedas-assets/icons/icon-circle-check";
import IconDropDown from "zeedas-assets/icons/icon-drop-down";
import { modulesSelector } from "state/redux/modules/actions";
import EmptyRecordMessage from "zeedas-components/empty-record-message";
import { AppUtils } from "utils/app-utils";
import {APP_ROLES, MODULE_PHASES} from "utils/constants";

const testCaseStatus = [
  {
    name: "Passed",
    status: "passed",
  },
  {
    name: "Failed",
    status: "failed",
  },
  {
    name: "Untested",
    status: "untested",
  },
];

const TestCase = (props) => {
  const {
    testCase,
    projectId,
    userIsQA,
    module,
    onToggleComments,
    assignIconRef,
  } = props;
  const dispatch = useDispatch();

  const {
    testProcess, status, _id, expectedResult,
  } = testCase;

  const isInReview = module.status === MODULE_PHASES.qa_review.status
    && module.state === MODULE_PHASES.qa_review.state;

  const handleStatusChange = (selectedStatus) => {
    if (selectedStatus === status) {
      return;
    }
    updateTestCase(_id, { status: selectedStatus }, projectId)(dispatch);
  };

  const handleDeleteTestCase = () => {
    deleteTestCase(_id, projectId)(dispatch);
  };

  return (
    <div className="TestCase pl-5 my-2 py-1">
      <div className="row no-gutters align-items-center justify-content-between">
        <div className="TestCase__item col-md-7">
          <div className="test-case py-1 my-2">{testProcess}</div>
          <div className="result py-1 my-2">{expectedResult}</div>
        </div>

        { userIsQA && <div className="col-md-4 d-flex align-items-center justify-content-end">
          <UncontrolledButtonDropdown>
            <DropdownToggle
              disabled={!userIsQA || !isInReview}
              className={`${status} d-flex align-items-center ${
                userIsQA && isInReview ? "justify-content-between" : "justify-content-center"
              }`}
            >
              <span className={`${userIsQA && isInReview ? "pr-3" : ""} text-capitalize"`}>
                {status}
              </span>
              {userIsQA && isInReview && <IconDropDown height={5} width={7} />}
            </DropdownToggle>
            <DropdownMenu className="py-0 TestCase__dropdown">
              {testCaseStatus.map((statusItem, index) => (
                <DropdownItem
                  onClick={() => handleStatusChange(statusItem.status)}
                  key={index}
                  className="font-12 py-2 d-flex align-items-center justify-content-between"
                >
                  <span>{statusItem.name}</span>
                  {status === statusItem.status && <IconCircleCheck />}
                </DropdownItem>
              ))}
              <hr className="m-0" />
              <DropdownItem
                className="delete d-flex align-items-center py-2"
                onClick={() => handleDeleteTestCase()}
              >
                <IconDeleteAlt fill={colors.ZEEDAS_ORANGE} height={10} />
                <span className="ml-1 font-12">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>

          <div
            className="TestCase__comments-icon ml-3 d-flex align-testCases-center"
            onClick={(event) => onToggleComments(event, _id)}
            id={`test-case-icon-${_id}`}
            ref={(inst) => assignIconRef && assignIconRef(inst, `test-case-icon-${_id}`)}
          >
            <SquareCommentsIcon
              count={4}
              fill="#A5A4A4"
            />
          </div>
        </div>}
      </div>
    </div>
  );
};

const TestCases = ({
  activeModuleId,
  projectId,
  className,
  testCases,
  match,
  isFetching,
  initFetchDone,
  afterFetch,
  fetchTestCases,
  userIsQA,
  moduleIsBacklog,
  module,
  showComments,
  onToggleComments,
}) => {

  const commentIconRefs = {};

  const refAssigner = (instance, key, refStore) => {
    if (!instance) {
      delete refStore[key];
    } else {
      refStore[key] = instance;
    }
  };

  const handleRefAssign = (instance, key) => {
    refAssigner(instance, key, commentIconRefs);
  };

  const handleToggleComments = (event, testId) => {
    const { currentTarget } = event;
    let activeIconId = "";

    Object.keys(commentIconRefs).forEach((iconRef) => {
      const currentElement = commentIconRefs[iconRef];
      if (currentElement.classList.contains("active")) {
        activeIconId = currentElement.id;
      }
      currentElement.classList.remove("active");
    });

    if (currentTarget.id !== activeIconId) {
      currentTarget.classList.add("active");
      onToggleComments(true, testId);
    } else {
      onToggleComments(!showComments, testId);
    }

  };

  useEffect(() => {
    if (!activeModuleId) {
      return;
    }
    fetchTestCases(projectId, activeModuleId).then(() => {
      afterFetch();
    });
  }, [activeModuleId, projectId]);

  return (
    <div className={`ModuleTestCases ${className}`}>

      {testCases.length ? (
        <>
          {testCases.map((testCase, index) => (
            <TestCase
              testCase={testCase}
              projectId={match.params.projectId}
              key={index}
              userIsQA={userIsQA}
              module={module}
              onToggleComments={handleToggleComments}
              assignIconRef={handleRefAssign}
            />
          ))}
        </>
      ) : (
        ((userIsQA && !moduleIsBacklog) || !userIsQA) && !isFetching && (
          <EmptyRecordMessage
            display="block"
            width={194}
            minHeight={300}
            textWidth="336px"
            message="Nothing to see here"
            className="d-flex flex-column align-items-center justify-content-between"
          />
        )
      )}
      {/* </> */}
      {/* )} */}
    </div>
  );
};

const mapStateToProps = (state, { activeModuleId }) => ({
  testCases: testCaseSelector(state),
  isFetching: state.test.isFetching,
  module: modulesSelector(state).find(({ _id }) => _id === activeModuleId) || {},
});

const mapDispatch = {
  fetchTestCases,
  deleteTestCase,
};

export default withRouter(
  connect(mapStateToProps, mapDispatch)(TestCases),
);
