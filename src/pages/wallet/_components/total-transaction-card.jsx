import React from 'react';
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import CardComponent from "../../../zeedas-components/card";
import Colors from "../../../utils/colors";
import IconForwardBack from "../../../zeedas-assets/icons/icon-forward-back";

const TotalTransactionCard = ({ totalTransaction }) => (
  <div className={"total-transaction-container"}>
    <Row>
      <Col md={12}>
        <CardComponent
          color={Colors.ZEEDAS_WHITE}
          bgColor={Colors.ZEEDAS_ORANGE}
        >
          <>
            <Row>
              <Col md={4} sm={4} xs={4} className="pt-2">
                <IconForwardBack width={24} height={19} />
              </Col>
              <Col md={6} sm={6} xs={6} className="total-transaction">
                <p className="float-right">{totalTransaction}</p>
              </Col>
            </Row>
            <Row className="total">
              <Col lg={12}>
                <span className="total-text">Total</span>
                <span className="total-text">Transaction</span>
              </Col>
            </Row>
          </>
        </CardComponent>
      </Col>
    </Row>
  </div>
);

export default TotalTransactionCard;

TotalTransactionCard.defaultProps = {
  totalTransaction: 0,
};

TotalTransactionCard.propTypes = {
  totalTransaction: PropTypes.number,
};
