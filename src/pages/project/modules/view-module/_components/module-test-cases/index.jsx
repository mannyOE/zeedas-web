import React, { useState } from "react";
import NewTestCase from "pages/project/test2/_components/new-test-case";
import TestCases from "pages/project/test2/_components/test-cases";
import colors from "utils/colors";
import ButtonLoadingIcon from "zeedas-assets/icons/icon-button-loader";
import DefaultButton from "zeedas-components/default-button";
import { useSelector, useDispatch } from "react-redux";
import { publishModule } from "state/redux/modules/actions";
import {MODULE_PHASES, MODULE_TEST_STATES} from "utils/constants";
import "./style.scss";
import { withRouter } from "react-router-dom";

const ModuleTestCases = ({
  moduleId,
  testState,
  handleSubmit,
  userIsQA,
  history,
}) => {
  const [initFetchDone, setInitFetchDone] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isPublishing = useSelector((state) => state.modules.isPublishing);
  const testCases = useSelector((state) => state.test.testCases);
  const project = useSelector((state) => state.projects.single_project);
  const moduleIsPublished = testState === MODULE_TEST_STATES.published.value;
  const moduleIsBacklog = testState === MODULE_TEST_STATES.backlog.value;
  const dispatch = useDispatch();

  const _publishModule = () => {
    dispatch(publishModule(moduleId, project._id));
  };

  const handleToggleComments = (canShow, testId) => {
    setShowComments(canShow);
    const selectedTestCase = testCases.find((testCase) => testCase._id === testId);
    console.log("[TEST CASE]:", selectedTestCase);
  };

  return (
    <div className="ModuleTestCases h-100 flex-column justify-content-between">
      <TestCases
        userIsQA={userIsQA}
        activeModuleId={moduleId}
        className=""
        moduleIsBacklog={moduleIsBacklog}
        initFetchDone={initFetchDone}
        afterFetch={() => setInitFetchDone(true)}
        showComments={showComments}
        onToggleComments={handleToggleComments}
      />
      {initFetchDone && userIsQA && moduleIsBacklog && (
        <div>
          <NewTestCase handleSubmit={handleSubmit} moduleId={moduleId} />
          <div className="d-flex justify-content-end mt-3 publish-button py-4 px-4">
            <DefaultButton
              style={{ backgroundColor: colors.ZEEDAS_BLUE, width: "150px" }}
              color="zd-blue"
              type="button"
              onClick={_publishModule}
              disabled={isPublishing || !testCases.length}
            >
              {isPublishing ? <ButtonLoadingIcon /> : <span>Publish</span>}
            </DefaultButton>
          </div>
        </div>
      )}

      { showComments && (
        <div className="module-test-comment-modal">
          {}
        </div>
      )}
    </div>
  );
};

export default withRouter(ModuleTestCases);
