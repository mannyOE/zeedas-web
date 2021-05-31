import React, {useState} from 'react';
import ZeedasModal from '../../../../../zeedas-components/modal';
import { Container, Wrapper, TextInputArea, Header, TestInput } from './style';
import RichTextEditor from 'react-rte';
import { NewTestButton } from '../style';
// import { Textarea } from 'pages/project/components/form/textarea';

export const AddTest = (props) => {
  const {showModal, setShowModal, projectId, moduleId, handleSubmit} = props;
  const [name, setName] = useState('');
  const [testProcessValue, setTestProcessValue] = useState('');
  const [expectedResultValue, setExpectedResultValue] = useState('');

  const handleChange = (e) => {
    const {target} = e;
    setName(target.value);
  }

  const submit = () => {
    handleSubmit({
      module: moduleId,
      testProcess: testProcessValue,
      expectedResult: expectedResultValue
    })
    setShowModal(false);
  }

  return (
    <Wrapper>
      <ZeedasModal onClose={() => setShowModal(false)} open={showModal} title="Add New Test Case">
        <Container>
          <Header>Test Process</Header>
          <TextInputArea>
            <textarea value={testProcessValue} onChange={({target}) => setTestProcessValue(target.value)} />
          </TextInputArea>
          <Header>Expected Result</Header>
          <TextInputArea>
            <textarea value={expectedResultValue} onChange={({target}) => setExpectedResultValue(target.value)} />
          </TextInputArea>
          <NewTestButton onClick={submit}>Update</NewTestButton>
        </Container>
      </ZeedasModal>
    </Wrapper>
  );
}


