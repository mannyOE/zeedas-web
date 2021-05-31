import React from 'react';
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import CardComponent from "../../../../zeedas-components/card";
import IconClearAll from "../../../../zeedas-assets/icons/icon-clear-all";
import ButtonIconLeft from "../../../../zeedas-components/button-icon-left";
import DefaultButton from "../../../../zeedas-components/default-button";

const ClearTransactionHistory = ({ onClearHistory }) => (
  <CardComponent>
    <div className="p-3">
      <Row>
        <Col sm={12}>
          <p className="clear-question">Are you sure you want to clear transaction history ?</p>
          <p className="clear-info">
            This will delete everything in Landing Pages - Module 1
            including 0 completed tasks and 3 incomplete tasks.
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={3}>
          <DefaultButton
            color="zd-light-blue"
            border="1px solid rgba(35, 179, 232, 1)"
          >
            <span className="cancel-clear">Cancel </span>
          </DefaultButton>
        </Col>
        <Col lg={5}>
          <ButtonIconLeft
            color="zd-dark-pink"
            icon={<IconClearAll />}
            text="Clear History"
            onClick={onClearHistory}
          />
        </Col>
      </Row>
    </div>

  </CardComponent>
);

export default ClearTransactionHistory;

ClearTransactionHistory.defaultProps = {
  onClearHistory: () => {
    // your logic here...
  },
};
ClearTransactionHistory.propTypes = {
  onClearHistory: PropTypes.func,
};
