import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TestHeader from "../../_components/test-header";
import {
  Body,
  IFrameContainer,
  TestCasesContainer,
  ListBody,
  ImprovementButton,
  ListBodyCentered,
} from "./style";
import TestCase from "../../_components/test-case";
import {
  testCaseSelector,
  createTestCase,
  fetchTestCases,
} from "../../../../state/redux/test/actions";
import { AddTest } from "../test-cases/add-test.js/index.js";
import PageLoader from "../../../../zeedas-components/page-loader";

export const IFrame = (props) => {
  const {
    match,
    fetchTestCases,
    testCases,
    createTestCase,
    isFetching,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);
  const { params } = match;

  useEffect(() => {
    fetchTestCases("", params.module);
  }, []);

  const handleSubmit = (payload) => {
    createTestCase(payload);
  };

  const generatedTestCases = ((testCases = []) => testCases.map((value) => (
    <TestCase testCase={value} key={value._id} />
  )))(testCases);

  return (
    <>
      <TestHeader
        showTestCases={showTestCases}
        setShowTestCases={setShowTestCases}
        moduleId={params.module}
      />
      <Body>
        <IFrameContainer>
          {/* TODO: update Iframe source url */}
          <iframe src="http://localhost:3000" />
        </IFrameContainer>
        <TestCasesContainer show={showTestCases}>
          <ImprovementButton onClick={() => setShowModal(true)}>
            Add Improvement
          </ImprovementButton>
          <ListBody>
            {isFetching && (
              <ListBodyCentered>
                <PageLoader message="getting test cases" />
              </ListBodyCentered>
            )}
            {!isFetching && generatedTestCases}
          </ListBody>
        </TestCasesContainer>
      </Body>
      {showModal && (
        <AddTest
          handleSubmit={handleSubmit}
          appId=""
          moduleId={params.module}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  testCases: testCaseSelector(state),
  isFetching: state.test.isFetching,
});

export default connect(mapStateToProps, { fetchTestCases, createTestCase })(
  withRouter(IFrame),
);
