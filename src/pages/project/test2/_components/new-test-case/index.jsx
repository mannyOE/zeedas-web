import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./style.scss";
import ButtonLoadingIcon from "zeedas-assets/icons/icon-button-loader";
import DefaultButton from "zeedas-components/default-button";
import { createTestCase } from "state/redux/test/actions";
import colors from "utils/colors";

const NewTestCase = ({ moduleId, createTestCase, match, isCreating }) => {
  const testProcessRef = useRef(null);
  const expectedResultRef = useRef(null);
  const [testProcess, setTestProcess] = useState("");
  const [expectedResult, setExpectedResult] = useState("");
  useEffect(() => {
    testProcessRef.current.focus();
  }, [moduleId, isCreating]);

  const submit = () => {
    const payload = {
      module: moduleId,
      testProcess,
      expectedResult,
    };
    createTestCase(payload, match.params.projectId).then(() => {
      testProcessRef.current.innerText = "";
      expectedResultRef.current.innerText = "";
      setTestProcess("");
      setExpectedResult("");
      testProcessRef.current.focus();
    });
  };

  const disableEnter = (event) => {
    if (event.which === 13) {
      event.preventDefault();
      if (testProcess && expectedResult) {
        submit();
        return;
      } else if (testProcess && !expectedResult) {
        expectedResultRef.current.focus();
        return;
      } else if (!testProcess && expectedResult) {
        testProcessRef.current.focus();
        return;
      }
    }
  };

  return (
    <form
      id="createTest"
      onSubmit={submit}
      className="NewTestCase font-14 pt-4 pb-5"
    >
      <div className="NewTestCase__input d-flex align-items-center flex-wrap mt-2">
        <span className="mr-1">I want to</span>
        <span
          onInput={() => setTestProcess(testProcessRef.current.innerText)}
          onKeyDown={disableEnter}
          ref={testProcessRef}
          contentEditable
          className="NewTestCase__test d-block flex-grow-1  my-1 px-1"
        ></span>
        <span className="mx-1">and I expect that</span>
        <span
          onInput={() => setExpectedResult(expectedResultRef.current.innerText)}
          onKeyDown={disableEnter}
          ref={expectedResultRef}
          className="NewTestCase__result d-block flex-grow-1 my-1 px-1"
          contentEditable
        ></span>
      </div>
      <button hidden type="submit">
        Create test case
      </button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isCreating: state.test.isCreating,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    createTestCase,
  })(NewTestCase)
);
