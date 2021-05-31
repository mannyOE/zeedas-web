import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import fx from "money";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { PaystackButton } from "react-paystack";
import IconAddNewCard from "../../../zeedas-assets/icons/icon-add-new-card";
import TableAllCards from "./_components/table-all-cards";
import CardComponent from "../../../zeedas-components/card";
import ZeedasModal from "../../../zeedas-components/modal";
import ActionMessage from "../../../zeedas-components/action-message";
import IconTimes from "../../../zeedas-assets/icon-times";
import IconCheck from "../../../zeedas-assets/icons/icon-check";
import { walletService } from "../../../services/wallet-service";
import {
  appConstants, NOTIFICATION_SUCCESS, NOTIFICATION_FAILURE,
} from "../../../constants";
import AddCard from "../_components/add-card";
import { notify } from "../../../zeedas-components/bottom-notification";
import { store } from "../../../state/redux/store";
import EmptyRecordMessage from "../../../zeedas-components/empty-record-message";
import IconArrowBack from "../../../zeedas-assets/icons/icon-arrow-back";
import PageLoader from "../../../zeedas-components/page-loader";
import { requestActions } from "../../../state/redux/requests/actions";

class AllCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredRow: false,
      data: [
        {
          cardType: "mastercard",
          cardNumber: "**** 8210",
          expires: "12/2019",
          cardHolder: "Jerry Ibeawuchi",
          lastDebited: "12,500",
          totalTransaction: "5 ",
          status: "not default",
          id: 1,
        },
        {
          cardType: "visa",
          cardNumber: "**** 8210",
          expires: "12/2019",
          cardHolder: "Jerry Ibeawuchi",
          lastDebited: "12,500",
          totalTransaction: "5",
          status: "not default",
          id: 2,
        },
        {
          cardType: "mastercard",
          cardNumber: "**** 8210",
          expires: "12/2019",
          cardHolder: "Jerry Ibeawuchi",
          lastDebited: "12,500",
          totalTransaction: "5",
          status: "default",
          id: 3,
        },
      ],
      openDeleteCardModal: false,
      openDefaultCardModal: false,
      record: {},
      allCards: [],
      paymentChannel: "stripe",
      clientsIP: "",
      clientsCountry: "",
      config: {},
      payStackConfig: {},
      stripePaymentKey: "",
      payStackAmount: 0,
      openAddCardModal: false,
      email: "",
      userId: "",
      requestingCards: false,
      requestingAddCard: false,
      stripeErrorMsg: "",
      stripeError: false,
    };
  }

  componentDidMount() {
    const { auth } = store.getState();
    this.setState({
      email: auth.userData.email,
      userId: auth.userData.account,
    });

    this.getWalletCards();
    this.getClientsIP();
    this.initiatePayStack();
  }

  /* API calls */
  getWalletCards = () => {
    const { dispatch } = this.props;
    dispatch(requestActions.startRequest());
    walletService.getWalletCards()
      .then((res) => {
        dispatch(requestActions.stopRequest());

        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({
            allCards: response.data,
          });
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
  };

  // Third party API's
  getClientsIP = () => {
    walletService.getClientsIP()
      .then((res) => {
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({ clientsIP: response }, () => {
            this.getClientsLocation(this.state.clientsIP);
          });
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          // window.alert(res.response.message);
        }
      });
  };

  /* get clients location by IP */

  getClientsLocation = (ip) => {
    const payload = {
      ip,
      accessKey: appConstants.IP_STACK_ACCESS_KEY,
    };

    walletService.getClientsLocation(payload)
      .then((res) => {
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({ clientsCountry: response.country_name }, () => {
            // If the client's country is Nigeria, call the initiate
            // payStack API and set the paystack amount in state to
            // be used for payStack add card
            if (response.country_name && this.state.clientsCountry.toLowerCase() === "nigeria") {
              this.setState({ paymentChannel: "paystack" });
              this.initiatePayStack();
            } else {
              this.setState({ paymentChannel: "stripe" });
            }
          });
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          // window.alert(res.response.message);
        }
      });
  };

  getExchangeRate = () => {
    fetch(`https://cors-anywhere.herokuapp.com/https://openexchangerates.org/api/latest.json?app_id=${appConstants.OPEN_EXCHANGE_RATE_APP_ID}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => { // convert usd to naira using money.fx
        const { NGN } = response.rates;
        fx.base = "USD";
        fx.rates = {
          NGN, // eg. 1 USD === 0.745101 EUR
          USD: 1, // always include the base rate (1:1)
          /* etc */
        };
        const payStackAmount = Math.ceil(fx(1).from("USD").to("NGN"));
        this.setState({ payStackAmount });
      })
      .catch((err) => {
        // TODO
        window.alert(err);
      });
  };

  initiatePayStack = () => {
    walletService.payInitiateCard()
      .then((res) => {
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({ payStackAmount: Math.ceil(response.data.amount) }, () => {
            this.payStackAddCard();
          });
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
  }

  payStackAddCard = () => {
    const { payStackAmount, email, userId } = this.state;
    // Paystack
    const payStackConfig = {
      email,
      firstname: userId,
      amount: payStackAmount,
      publicKey: appConstants.PAYSTACK_PUBLIC_KEY, // TODO: Make this dynamic, production and test
      text: 'Add New Card',
      onSuccess: (response) => {
        this.confirmCard(response.reference); // post to the backend the refernce key
      },
      onClose: () => null, // Todo
    };
    this.setState({ payStackConfig });
  };

  // Initiate stripe to get a secret key
  // which would be used to initiate payment
  // with the stripe element
  initateStripe = () => {
    walletService.initiateStripe()
      .then((res) => {
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({ stripePaymentKey: response.data.stripePaymentKey });
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
  };

  // Add card to stripe
  addCardStripe = async (event) => {
    const { stripePaymentKey } = this.state;
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    this.setState({ requestingAddCard: true });
    const paymentMethods = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentMethods.error) {
      // window.alert(paymentError.error.message);
      this.setState({ requestingAddCard: false });
      this.displayStripeError(paymentMethods.error.message);
      return;
    }

    const { paymentMethod } = paymentMethods;

    const confirmPayment = await stripe.confirmCardPayment(stripePaymentKey, {
      payment_method: paymentMethod.id,
    });

    if (confirmPayment.error) {
      this.setState({ requestingAddCard: false });
      this.displayStripeError(confirmPayment.error.message);
      return;
    }
    const { paymentIntent, Intenterror } = await stripe.retrievePaymentIntent(stripePaymentKey);
    if (Intenterror) {
      // Handle error here
      this.setState({ requestingAddCard: false });

      // TODO: Dispatch alert action to display
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // send payment intent and payment method to stripe complete card API
      const payload = {
        stripePaymentIntent: paymentIntent.id,
        stripePaymentMethod: paymentIntent.payment_method,
      };
      // this.setState({ requestingAddCard: true });
      walletService.stripeCompleteCard(payload)
        .then((res) => {
          this.setState({ requestingAddCard: false });

          const { response } = res;
          if (res.status === appConstants.SUCCESS_RESPONSE) {
            this.getWalletCards();

            this.setState({ openAddCardModal: false }, () => {
              // cardElement.clear();
              notify(response.message, NOTIFICATION_SUCCESS);
            });
          } else if (res.status === appConstants.ERROR_RESPONSE) {
            notify(response.message, NOTIFICATION_FAILURE);
          }
        });
    }
  };

  // Complete paystack payment
  confirmCard = (reference) => {
    const payload = {
      reference,
    };
    walletService.payStackAddCard(payload)
      .then((res) => {
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.getWalletCards();
          this.setState({ openAddCardModal: false }, () => {
            notify(response.message, NOTIFICATION_SUCCESS);
          });
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
  };

  /* General component handlers */
  openAddCardModal = () => {
    this.setState({ openAddCardModal: true }, () => {
      this.addNewCard();
    });
  };

  addNewCard = () => {
    const { clientsCountry } = this.state;
    // If user's location is Nigeria, route to paystack else route to stripe
    if (clientsCountry && clientsCountry.toLowerCase() === "nigeria") {
      this.setState({ paymentChannel: "paystack" });
      this.payStackAddCard();
    } else {
      this.setState({ paymentChannel: "stripe" });
      this.initateStripe();
    }
  };

  onMouseEnter = (item) => {
    const { _id } = item;
    this.setState({ hoveredRow: _id });
  };

  onMouseLeave = () => {
    this.setState({ hoveredRow: false });
  };

  setDefaultCard = () => {
    const { record } = this.state;
    const { _id } = record;
    // const { dispatch } = store.getState();

    // dispatch(requestActions.startRequest());
    this.setState({ requestingCards: true });
    walletService.setDefaultCard(_id)
      .then((res) => {
        this.setState({ requestingCards: false });
        // dispatch(requestActions.stopRequest());
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({ openDefaultCardModal: false });
          notify(response.message, NOTIFICATION_SUCCESS);
          this.getWalletCards();
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          this.setState({ openDefaultCardModal: false });
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
  };

  openDeleteCardModal = (item) => {
    this.setState({ openDeleteCardModal: true, record: item });
  };

  deleteCard = () => {
    const { record } = this.state;
    // eslint-disable-next-line no-undef,no-underscore-dangle
    const { _id } = record;

    this.setState({ requestingCards: true });
    walletService.deleteCard(_id)
      .then((res) => {
        this.setState({ requestingCards: false });
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({ openDeleteCardModal: false });
          notify(response.message, NOTIFICATION_SUCCESS);
          this.getWalletCards();
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
  };

  closeDeleteCardModal = () => {
    this.setState({ openDeleteCardModal: false });
  };

  closeDefaultCardModal = () => {
    this.setState({ openDefaultCardModal: false });
  };

  openDefaultCardModal = (item) => {
    this.setState({ openDefaultCardModal: true, record: item });
  };

  closeAddCardModal= () => {
    const { elements } = this.props;

    this.setState({ openAddCardModal: false });

    if (this.state.paymentChannel === "stripe") {
      const cardElement = elements.getElement(CardElement);

      // Stripe.js has not loaded yet. Make sure to disable
      // clear cardElement has loaded.
      cardElement.clear();
    }
  };

  displayStripeError = (errorMsgText) => {
    this.setState({
      stripeErrorMsg: errorMsgText,
      stripeError: true,
    });
    setTimeout(() => {
      this.setState({
        stripeErrorMsg: "",
        stripeError: false,
      });
    }, 5000);
  };

  backToWallet = () => {
    this.props.history.push("/wallet");
  };

  render() {
    const {
      hoveredRow, openDeleteCardModal, openDefaultCardModal, allCards,
      openAddCardModal, payStackConfig, paymentChannel, requestingCards,
      requestingAddCard, stripeError, stripeErrorMsg,
    } = this.state;
    const { requesting } = this.props;

    if (requesting) {
      return <PageLoader />;
    }

    return (
      <div className="all-cards-wrapper">
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <div className="back-wrapper" onClick={this.backToWallet}>
              <p>
                <IconArrowBack />
                {' '}
                <span className="ml-3 mt-1 back">Back</span>
              </p>
            </div>

            <CardComponent
              border="1px solid rgba(16, 16, 16, 0.1)"
            >
              <div className="all-cards-second-wrapper">
                <Row className="all-cards-first-layer">
                  <Col md={6}>
                    <p>
                      {' '}
                      {allCards.length}
                      {' '}
                      in total
                    </p>
                  </Col>
                  <Col md={6}>
                    {
                      paymentChannel === "stripe"
                    && (
                    <div className="float-right" onClick={this.openAddCardModal}>
                      <span className="mr-2">
                        <IconAddNewCard
                          height={20}
                        />
                      </span>
                      <span className="pointer">Add New Card</span>
                    </div>
                    )
                      }

                    {
                      paymentChannel === "paystack"
                      && (
                      <div className="float-right paystack">
                        <span>
                          <IconAddNewCard
                            height={20}
                          />
                        </span>
                        <span>
                          <PaystackButton
                            className="paystack-button"
                            {...payStackConfig}
                          />
                        </span>
                      </div>
                      )
                    }
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    {allCards.length === 0
                    && (
                      <div className="wallet-empty-record">
                        <EmptyRecordMessage
                          message="You have not added any card yet"
                        />
                      </div>
                    )}
                    {allCards.length > 0
                    && (
                    <TableAllCards
                      data={allCards}
                      onMouseEnter={this.onMouseEnter}
                      onMouseLeave={this.onMouseLeave}
                      hoveredRow={hoveredRow}
                      setDefaultCard={this.openDefaultCardModal}
                      deleteCard={this.openDeleteCardModal}
                    />
                    )}
                  </Col>
                </Row>
              </div>

            </CardComponent>
          </Col>
        </Row>
        <ZeedasModal
          open={openDeleteCardModal}
          onClose={this.closeDeleteCardModal}
          title="Delete This Card"
          width="35%"
        >
          <ActionMessage
            question="Are you sure you want to delete this transaction card ?"
            // info="This will delete everything in Landing Pages - Module 1 including 0 completed tasks and 3 incomplete tasks."
            proceedText="Delete Card"
            btnProceedColor="zd-dark-pink"
            icon={<IconTimes />}
            onClickProceed={this.deleteCard}
            onClickCancel={this.closeDeleteCardModal}
            requestingCards={requesting}
          />
        </ZeedasModal>
        <ZeedasModal
          open={openDefaultCardModal}
          onClose={this.closeDefaultCardModal}
          title="Set this card as Default"
          width="35%"
        >
          <ActionMessage
            question="Are you sure you want to make this card as your default card ?"
            // info="This will delete everything in Landing Pages - Module 1 including 0 completed tasks and 3 incomplete tasks."
            proceedText="Yes I do"
            cancelText="No I dont"
            btnProceedColor="zd-green"
            icon={(
              <IconCheck
                fill="#fff"
              />
)}
            onClickProceed={this.setDefaultCard}
            onClickCancel={this.closeDefaultCardModal}
            requestingCards={requesting}

          />
        </ZeedasModal>
        <Col>
          <ZeedasModal
            open={openAddCardModal}
            onClose={this.closeAddCardModal}
            title="Add your card"
            width={window.innerWidth >= 1200 ? "35%"
              : (window.innerWidth >= 768) ? "50%"
                : window.innerWidth < 600 ? "100%" : "33%"}
          >
            <AddCard
              paystackProps={payStackConfig} // Props for PayStackButton
              paymentChannel={paymentChannel}
              addCardStripe={this.addCardStripe}
              requesting={requestingAddCard}
              stripeError={stripeError}
              stripeErrorMsg={stripeErrorMsg}
            />
          </ZeedasModal>
        </Col>
      </div>
    );
  }
}

AllCards.defaultProps = {
  stripe: ({}),
  elements: ({}),
};

AllCards.propTypes = {
  stripe: PropTypes.shape({
    createPaymentMethod: PropTypes.func,
    confirmCardPayment: PropTypes.func,
    retrievePaymentIntent: PropTypes.func,
  }),
  elements: PropTypes.shape({
    getElement: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  const {
    auth,
    requests,
  } = state;
  return {
    auth,
    requesting: requests.requesting,
  };
};

export default connect(mapStateToProps)((props) => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <AllCards stripe={stripe} elements={elements} {...props} />
    )}
  </ElementsConsumer>
));
