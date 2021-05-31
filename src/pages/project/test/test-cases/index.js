import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  TestCasesWrapper,
  Header,
  List,
  ListBody,
  ListFooter,
  TestButton,
  NewTestButton,
  ListBodyCentered,
} from './style';
import TestCase from '../../_components/test-case';
import { AddTest } from './add-test.js/index.js';
import {
  fetchTestCases,
  createTestCase,
  testCaseSelector,
  clearTestCases,
} from '../../../../state/redux/test/actions';
import { modulesSelector } from '../../../../state/redux/modules/actions';
import PageLoader from '../../../../zeedas-components/page-loader';
import list from '../../../../state/redux/modules/list';
import EmptyRecordMessage from '../../../../zeedas-components/empty-record-message';

export const TestCases = (props) => {
  const {
    activeModuleId,
    projectId,
    fetchTestCases,
    createTestCase,
    testCases,
    isFetching,
    module,
    clearTestCases,
  } = props;
  const { status, state } = module;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!activeModuleId) {
      clearTestCases();
      return;
    }
    fetchTestCases(projectId, activeModuleId);
  }, [activeModuleId, projectId]);

  useEffect(() => {
    const message_receive = (ev) => {
      if (ev.key !== 'message') return;

      fetchTestCases(projectId, activeModuleId);
    };
    window.addEventListener('storage', message_receive);
  }, []);

  const goTo = () => {
    const { hostname, protocol, port } = new URL(window.location.href);
    let url = '';
    if (port) {
      url = `${protocol}//${hostname}:${port}/test/${activeModuleId}`;
    } else {
      url = `${protocol}//${hostname}/test/${activeModuleId}`;
    }
    window.open(url, '_blank');
  };

  const generatedTestCases = ((testCases = []) => {
    return testCases.map((value) => (
      <TestCase testCase={value} key={value._id} projectId={projectId} />
    ));
  })(testCases);

  const handleSubmit = (payload) => {
    createTestCase(payload, projectId);
  };

  return (
    <React.Fragment>
      <TestCasesWrapper>
        <Header>
          <h3>Added Test Cases</h3>
        </Header>
        <List>
          <ListBody center={!activeModuleId || isFetching}>
            {!activeModuleId && (
              <ListBodyCentered>
                <EmptyRecordMessage
                  width={300}
                  textWidth="300px"
                  message="Please select a module"
                  display="none"
                  showActionButton={false}
                />
              </ListBodyCentered>
            )}
            {isFetching && (
              <ListBodyCentered>
                <PageLoader message={'getting test cases'} />
              </ListBodyCentered>
            )}
            {activeModuleId && !isFetching && testCases.length === 0 && (
              <ListBodyCentered>
                <EmptyRecordMessage
                  callAction={() => setShowModal(true)}
                  width={300}
                  textWidth="300px"
                  message="Add a New Test Case"
                  btnText=" Add test case"
                  display="none"
                  showActionButton={true}
                />
              </ListBodyCentered>
            )}
            {!isFetching && activeModuleId && generatedTestCases}
          </ListBody>
          {activeModuleId && !isFetching && testCases.length > 0 && (
            <ListFooter>
              <NewTestButton onClick={() => setShowModal(true)}>
                New Test Case
              </NewTestButton>
              {status &&
                status === list[3].status &&
                state === list[3].state[1] && (
                  <TestButton onClick={goTo}>Test</TestButton>
                )}
            </ListFooter>
          )}
        </List>
      </TestCasesWrapper>
      {showModal && (
        <AddTest
          handleSubmit={handleSubmit}
          projectId={projectId}
          moduleId={activeModuleId}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </React.Fragment>
  );
};

const   = (state, { activeModuleId }) => {
  const module =
    modulesSelector(state).find(({ _id }) => _id === activeModuleId) || {};
  return {
    testCases: testCaseSelector(state),
    isFetching: state.test.isFetching,
    module,
  };
};

export default connect(mapStateToProps, {
  fetchTestCases,
  createTestCase,
  clearTestCases,
})(TestCases);
