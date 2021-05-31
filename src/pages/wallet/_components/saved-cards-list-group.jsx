import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from 'reactstrap';
import PropTypes from "prop-types";
// import IconMastercard from "../../../zeedas-assets/icons/icon-mastercard";
import RadioButton from "../../../zeedas-components/radio-button";
// import IconVisa from "../../../zeedas-assets/icons/icon-visa";
import { walletHelpers } from "../_helper";
// import IconFundWallet from "../../../zeedas-assets/icons/icon-fund-wallet";

const SavedCardsListGroup = ({
  data, onChangeRadioButton,
  name, cardId, cardLength,
}) => (
  <div className={cardLength > 3 ? "fund-wallet-wrapper show-overflow" : "fund-wallet-wrapper"}>
    <ListGroup className="zeedas-list-group">
      {data.map((item, i) => (
        <ListGroupItem key={i}>
          <Row>
            <Col md={1}>
              <span>
                {/* {element1} */}
                <RadioButton
                  key={i}
                  onChange={onChangeRadioButton}
                  checked={item._id === cardId}
                  name={name}
                  id={item._id}
                  cardId={cardId}
                />
              </span>
            </Col>
            <Col md={2}>
              {' '}
              <span>
                {' '}
                {walletHelpers.creditCard(item.brand.toLowerCase(), true, true, "#000")}
              </span>
            </Col>
            <Col md={3}>
              <span>
                {' '}
                {`**** ${item.last4}`}
              </span>
            </Col>
            <Col md={5}>
              {' '}
              <span className="float-lg-right float-md-right">
                {`Expiry Date ${item.expMonth}/${item.expYear}`}
              </span>
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default SavedCardsListGroup;

SavedCardsListGroup.defaultProps = {
  data: [],
  name: "",
  cardId: "",
  onChangeRadioButton: () => {},
};

SavedCardsListGroup.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
  name: PropTypes.string,
  cardId: PropTypes.string,
  onChangeRadioButton: PropTypes.func,
};
