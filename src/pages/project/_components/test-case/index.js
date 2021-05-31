import React from "react";
import { CaseContainer, Option, ProcessContainer, ProcessItem } from "./style";
import ButtonMenu from "../button-menu";
import { theme } from "../../style";
import { TrashIcon } from "../../../../zeedas-assets/icons/icon-trash";
import { TickIcon } from "../../../../zeedas-assets/icons/icon-tick";
import { connect } from "react-redux";
import {
  updateTestCase,
  deleteTestCase,
} from "../../../../state/redux/test/actions";

const deleteIconProps = {
  dimension: {
    width: 12.8,
    height: 12.8,
  },
  color: theme.colors.red,
};

const options = [
  {
    status: "passed",
    color: theme.colors.$zdGreen,
  },
  {
    status: "failed",
    color: theme.colors.$zdRed,
  },
  {
    status: "untested",
    color: theme.colors.$zdOrange,
  },
];
const findColor = (name) => {
  return (
    options.find((option) => option.status === name).color ||
    theme.colors.$zdBlue
  );
};
export const TestCase = (props) => {
  const { testCase, dispatch, projectId } = props;
  if (!testCase) {
    return;
  }
  const { testProcess, status, _id, expectedResult } = testCase;

  const handleStatusChange = (selectedStatus) => {
    if (selectedStatus === status) {
      return;
    }
    updateTestCase(_id, { status: selectedStatus }, projectId)(dispatch);
  };

  const handleDeleteTestCase = () => {
    deleteTestCase(_id, projectId)(dispatch);
  };

  const items = options.map((option) => (
    <Option
      onClick={() => handleStatusChange(option.status)}
      space={true}
      key={option.status}
    >
      {option.status} {status === option.status && <TickIcon />}
    </Option>
  ));
  return (
    <CaseContainer borderColor={findColor(status)}>
      <ProcessContainer>
        <ProcessItem borderColor={theme.colors.$zdOrange}>
          {testProcess}
        </ProcessItem>
        <ProcessItem borderColor={theme.colors.$zdGreen}>
          {expectedResult}
        </ProcessItem>
      </ProcessContainer>
      <ButtonMenu title={status} color={findColor(status)}>
        {items}
        <Option
          onClick={handleDeleteTestCase}
          border={true}
          color={theme.colors.red}
        >
          <TrashIcon {...deleteIconProps} />
          Delete
        </Option>
      </ButtonMenu>
    </CaseContainer>
  );
};

export default connect()(TestCase);
