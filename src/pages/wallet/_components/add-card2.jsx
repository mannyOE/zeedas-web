import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import CardComponent from "../../../zeedas-components/card";
import IconBack from "../../../zeedas-assets/icons/icon-back";
import InputRightIcon from "../../../zeedas-components/input-right-icon";
import IconAddCard from "../../../zeedas-assets/icons/icon-add-card";
import ButtonIconLeft from "../../../zeedas-components/button-icon-left";
import IconMastercard from "../../../zeedas-assets/icons/icon-mastercard";
import IconInfoSolid from "../../../zeedas-assets/icons/icon-info-solid";
import { CaretCard2 } from "../../../zeedas-components/caret-card";

class AddCard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCaretCard: false,
    };
  }

  backToWallet = () => {
    this.props.history.push("/wallet");
  };

  addCard = () => {

  };

  showCaretCard = () => {
    this.setState((prevState) => ({
      showCaretCard: !prevState.showCaretCard,
    }));
  }

  render() {
    const { showCaretCard } = this.state;
    return (
      <main className="add-card-child-wrapper">
        <div>
          <CardComponent>
            <div className="add-card-content" style={{ position: "relative" }}>
              <p>
                <span onClick={this.backToWallet}>
                  <IconBack
                    fill="#03293D"
                  />
                </span>
                <span className="add-new-card-title">Add New Card</span>
              </p>
              <p className="add-card-text">
                Enter your debit or credit card details to add your card to your account
              </p>
              <Row>
                <Col>
                  <InputRightIcon
                    label="Card Number"
                    type="text"
                    icon={<IconMastercard />}
                    placeholder="**** **** **** ****"
                    name="cardNumber"
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={6}>
                  <InputRightIcon
                    label="Expiry Date"
                    type="date"
                    name="cardExpiryDate"
                  />
                </Col>
                <Col lg={6}>
                  <div>
                    <div>
                      <InputRightIcon
                        label="Security Code"
                        type="number"
                        placeholder="***"
                        name="cardSecurityCode"
                        icon={<span style={{ marginLeft: "3px" }} onClick={this.showCaretCard}><IconInfoSolid /></span>}
                      />
                    </div>
                    <CaretCard2
                      text="Find the CVV three digit (***) number at the back of your card."
                      displayCaretCard={showCaretCard}
                    />

                  </div>

                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col lg={4} md={4} sm={12}>
                  <ButtonIconLeft
                    color="zd-blue"
                    icon={<IconAddCard />}
                    text="Add Card"
                    onClick={this.addCard}
                  />
                </Col>
              </Row>
            </div>
          </CardComponent>
        </div>
      </main>
    );
  }
}

export default AddCard2;
