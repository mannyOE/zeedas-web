import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { FaAngleRight } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import TotalTransactionCard from './_components/total-transaction-card';
import CardComponent from '../../zeedas-components/card';
import Balance from './_components/balance';
import TimelineList from '../../zeedas-components/timeline-list';
import SideCard from './_components/side-card';
import ReferFriend from './_components/refer-friend';
import ZeedasModal from '../../zeedas-components/modal';
import AddCard from './_components/add-card';
import FundWallet from './_components/fund-wallet';
import { appHelpers } from '../../helpers/app.helpers';
import { walletService } from '../../services/wallet-service';
import {
  appConstants,
  NOTIFICATION_FAILURE,
  NOTIFICATION_SUCCESS,
} from '../../constants';
import { history } from '../../state/history';
import { notify } from '../../zeedas-components/bottom-notification';
import { store } from '../../state/redux/store';
import EmptyRecordMessage from '../../zeedas-components/empty-record-message';
import PieChartCustomLegend from './_components/PieChartCustomLegend';
import ReferCard from './_components/refer-card';
import { requestActions } from '../../state/redux/requests/actions';
import PageLoader from '../../zeedas-components/page-loader';
import './style.scss';
import { setPageTitle } from 'state/redux/app-header/actions';
import { PAGE_TITLES, REFERRAL_LINK } from 'utils/constants';
import { AppUtils } from 'utils/app-utils';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieData: [],
      referrals: [],
      referFriendModal: false,
      openAddCardModal: false,
      openFundWalletModal: false,
      fundValue: '',
      subscriptionPrice: 15,
      cardNumber: '**** **** **** ****',
      cardExpiryDate: '',
      showReferralCard: false,
      walletStatistics: 0,
      pieChartLabels: [],
      walletActivities: [],
      billing: [],
      userCards: [],
      cvv: '***',
      clientsIP: '',
      clientsCountry: '',
      payStackConfig: {},
      paymentChannel: 'stripe',
      payStackAmount: 0,
      stripePaymentKey: '',
      cardId: null,
      brand: '',
      email: '',
      userId: '',
      requestingFundWallet: false,
      requestingAddCard: false,
      checkedSavedCard: false,
      requestingReferral: false,
      referError: false,
      stripeErrorMsg: '',
      stripeError: false,
      referralCode: null,
      referralLink: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(setPageTitle(PAGE_TITLES.wallet))
    const { auth } = store.getState();

    this.setState({
      email: auth.userData.email,
      userId: auth.userData.account,
    });

    this.getWalletStatistics();
    this.getWalletActivities();
    this.getBilling();
    this.getWalletCards();
    this.getClientsIP();
  }

  /* Zeedas APIs */
  getBilling = () => {
    const { dispatch } = this.props;
    dispatch(requestActions.startRequest());
    walletService.getBilling().then((res) => {
      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({ billing: response.data.bill });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        // window.alert(res.response.message);
      }
    });
  };

  /* fetch data from redux */
  getWalletStatistics = () => {
    const { dispatch } = this.props;
    dispatch(requestActions.startRequest());
    walletService.getWalletStatistics().then((res) => {
      dispatch(requestActions.stopRequest());

      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        const pieData = Object.values(response.data.chart);
        const pieChartLabels = Object.keys(response.data.chart);
        this.setState({
          walletStatistics: response.data,
          pieChartLabels,
          pieData,
          referralCode: response.data.referalCode,
        });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        // window.alert(response.message);
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  getWalletActivities = () => {
    const { dispatch } = this.props;
    dispatch(requestActions.startRequest());

    walletService.getWalletActivities().then((res) => {
      dispatch(requestActions.stopRequest());

      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        const slicedData = response.data.slice(0, 5);
        this.setState({ walletActivities: slicedData });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  getWalletCards = () => {
    const { dispatch } = this.props;
    dispatch(requestActions.startRequest());
    walletService.getWalletCards().then((res) => {
      dispatch(requestActions.stopRequest());

      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        if (response.data.length > 0) {
          const savedCard = response.data[0];
          const cardNumber = `xxxx xxxx xxxx ${savedCard.last4}`;
          const cardExpiryDate = `${savedCard.expMonth}/${savedCard.expYear}`;
          const cvv = '385';
          const modifiedCVV = cvv.split('');
          modifiedCVV[1] = '*';
          this.setState({
            userCards: response.data,
            brand: savedCard.brand,
            cardNumber,
            cardExpiryDate,
            cvv: modifiedCVV.join(''),
          });
        }
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  initiateAddCard = () => {
    const { userCards } = this.state;
    // If user has no card in the system,
    // display the no card modal that prompts them to add a card
    // if (userCards.length === 0) { // TODO: Confirm this condition is right
    this.setState({ openAddCardModal: true }, () => {
      this.addNewCard();
    });
    // } else { // If they have a card in the system, display view for them to select card
    //   history.push("/all-cards");
    // }
  };

  // Third party API's
  getClientsIP = () => {
    walletService.getClientsIP().then((res) => {
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

    walletService.getClientsLocation(payload).then((res) => {
      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({ clientsCountry: response.country_name }, () => {
          // If the client's country is Nigeria, call the initiate
          // payStack API and set the paystack amount in state to
          // be used for payStack add card
          if (
            response.country_name &&
            this.state.clientsCountry.toLowerCase() === 'nigeria'
          ) {
            this.setState({ paymentChannel: 'paystack' });
            this.initiatePayStack();
          } else {
            this.setState({ paymentChannel: 'stripe' });
          }
        });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        // window.alert(res.response.message);
      }
    });
  };

  initiatePayStack = () => {
    walletService.payInitiateCard().then((res) => {
      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState(
          { payStackAmount: Math.ceil(response.data.amount) },
          () => {
            this.payStackAddCard();
          }
        );
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

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
      // onSuccess: (response) => this.confirmCard(response.reference),
      onClose: () => null, // Todo
    };
    this.setState({ payStackConfig });
  };

  // Initiate stripe to get a secret key
  // which would be used to initiate payment
  // with the stripe element
  initateStripe = () => {
    walletService.initiateStripe().then((res) => {
      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({ stripePaymentKey: response.data.stripePaymentKey });
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

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
    const { paymentIntent, Intenterror } = await stripe.retrievePaymentIntent(
      stripePaymentKey
    );
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
      walletService.stripeCompleteCard(payload).then((res) => {
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

  /* General component handlers */
  addNewCard = () => {
    const { clientsCountry } = this.state;
    // If user's location is Nigeria, route to paystack else route to stripe
    if (clientsCountry && clientsCountry.toLowerCase() === 'nigeria') {
      this.setState({ paymentChannel: 'paystack' });
      this.payStackAddCard();
    } else {
      this.setState({ paymentChannel: 'stripe' });
      this.initateStripe();
    }
  };

  // Complete paystack payment
  confirmCard = (reference) => {
    const payload = {
      reference,
    };
    walletService.payStackAddCard(payload).then((res) => {
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

  fundWallet = () => {
    const { fundValue, cardId } = this.state;

    const fundWalletValue = document.getElementById('fund-wallet').value;

    if (fundWalletValue === '' && cardId === null) {
      notify('Please enter all details to fund wallet', NOTIFICATION_FAILURE);
      return;
    }

    if (fundValue < 0) {
      notify(
        'Wallet amount should not be less than zero',
        NOTIFICATION_FAILURE
      );
      return;
    }

    if (fundValue === '') {
      notify('Invalid amount', NOTIFICATION_FAILURE);
      return;
    }

    if (cardId === null) {
      notify('Kindly select a card', NOTIFICATION_FAILURE);
      return;
    }

    const payload = {
      card: cardId,
      amount: fundValue,
    };

    this.setState({ requestingFundWallet: true });
    walletService.fundWallet(payload).then((res) => {
      this.setState({ requestingFundWallet: false });
      const { response } = res;
      if (res.status === appConstants.SUCCESS_RESPONSE) {
        this.setState({
          fundValue: '',
          openFundWalletModal: false,
          ardId: null,
        });
        document.getElementById('fund-wallet').value = '';
        document.body.style.overflowY = 'visible';
        document.querySelector('.fund-wallet-complete').scrollTop = 0;
        this.getWalletStatistics();
        this.getWalletActivities();
        notify(response.message, NOTIFICATION_SUCCESS);
      } else if (res.status === appConstants.ERROR_RESPONSE) {
        notify(response.message, NOTIFICATION_FAILURE);
      }
    });
  };

  sendReferral = () => {
    const { referrals } = this.state;

    if (this.validateInput()) {
      const payload = {
        emails: referrals,
      };

      this.setState({ requestingReferral: true });
      walletService.sendReferrals(payload).then((res) => {
        this.setState({ requestingReferral: false });
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({ referrals: [] });
          this.getWalletActivities();
          notify(response.message, NOTIFICATION_SUCCESS);
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
    }
  };

  /* Referal Modal Handlers */
  deleteChip = (index) => {
    const remainingChips = this.state.referrals.filter(
      (chip, i) => i !== index
    );
    this.setState({ referrals: remainingChips });
  };

  handleKeyPress = (event) => {
    const { referrals } = this.state;
    if (event.key === 'Enter' && !this.validateEmail(event.target.value)) {
      this.setState({ referError: true });
      return;
    }
    if (event.key === 'Enter' && event.target.value === '') {
      this.setState({ referError: true });
      return;
    }
    if (event.key === 'Enter' && event.target.value !== '') {
      const newChip = event.target.value;
      referrals.push(newChip);
      this.setState({ referrals }, () => {
        if (this.state.referrals.length > 0) {
          this.setState({ referError: false });
        }
      });
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  };

  closeReferFriendModal = () => {
    document.querySelector('.refer-input').value = '';
    this.setState({
      referFriendModal: false,
      referrals: [],
      referError: false,
    });
  };

  validateEmail = (mail) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    this.setState({ referError: true });
    return false;
  };

  openReferModal = () => {
    this.setState({ referFriendModal: true });
  };

  transactionHistory = () => {
    history.push('/transaction-history');
  };

  openAddCardModal = () => {
    this.setState({ openAddCardModal: true });
  };

  closeAddCardModal = () => {
    const { elements } = this.props;

    this.setState({ openAddCardModal: false });

    if (this.state.paymentChannel === 'stripe') {
      const cardElement = elements.getElement(CardElement);

      // Stripe.js has not loaded yet. Make sure to disable
      // clear cardElement has loaded.
      cardElement.clear();
    }
  };

  showFundWalletModal = () => {
    const { userCards } = this.state;
    if (userCards.length > 0) {
      // TODO: change this to less than zero
      this.setState({ openFundWalletModal: true, openAddCardModal: false });
      document.body.style.overflowY = 'hidden'; // Prevent body from scrolling when fund wallet is open
      this.addNewCard();
    } else {
      // If they have a card in the system, display view for them to select card
      this.setState({ openAddCardModal: true }, () => this.addNewCard());
    }
  };

  closeFundWalletModal = () => {
    document.getElementById('fund-wallet').value = '';
    document.body.style.overflowY = 'visible';
    document.querySelector('.fund-wallet-complete').scrollTop = 0; // Scroll fund wallet modal to back to the top
    this.setState({
      openFundWalletModal: false,
      fundValue: '',
      checkedSavedCard: false,
      cardId: null,
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeRadioButton = (e, id) => {
    this.setState({ cardId: id, checkedSavedCard: e.target.value }, () => {});
  };

  showReferralCard = () => {
    this.setState((prevState) => ({
      showReferralCard: !prevState.showReferralCard,
    }));
  };

  validateInput = () => {
    let noError = true;
    if (this.state.referrals.length === 0) {
      noError = false;
      this.setState({ referError: true });
    } else {
      this.setState({ referError: false });
    }
    return noError;
  };

  displayStripeError = (errorMsgText) => {
    this.setState({
      stripeErrorMsg: errorMsgText,
      stripeError: true,
    });
    setTimeout(() => {
      this.setState({
        stripeErrorMsg: '',
        stripeError: false,
      });
    }, 4000);
  };

  handleReferralSuccess() {
    this.getWalletActivities();
    this.closeReferFriendModal();
  }

  render() {
    const {
      openAddCardModal,
      walletStatistics,
      openFundWalletModal,
      fundValue,
      showReferralCard,
      pieChartLabels,
      pieData,
      walletActivities,
      billing,
      userCards,
      cvv,
      cardNumber,
      cardExpiryDate,
      payStackConfig,
      paymentChannel,
      subscriptionPrice,
      requestingFundWallet,
      brand,
      requestingAddCard,
      checkedSavedCard,
      requestingReferral,
      referError,
      stripeError,
      stripeErrorMsg,
    } = this.state;
    const { requesting } = this.props;

    const modifiedWalletActivitiesData = walletActivities.map((item) => {
      if (item.transactionType === 'credit') {
        item.color = 'rgba(77, 189, 152, 1)';
        item.boxShadow = '0 0 0 10px rgba(77, 189, 152, 0.2)';
      }
      if (item.transactionType === 'debit') {
        item.color = 'rgba(35, 179, 232, 1)';
        item.boxShadow = '0 0 0 10px rgba(35, 179, 232, 0.2)';
      }
      return item;
    });

    if (requesting) {
      return <PageLoader />;
    }

    return (
      <div className="wallet-wrapper container Fade">
            <Row>
              <Col lg={8}>
                <Row>
                  <Col md={12}>
                    <Balance
                      balance={
                        walletStatistics.currentBalance &&
                        appHelpers.numberWithCommas(
                          walletStatistics.currentBalance
                        )
                      }
                      subscriptionPrice={subscriptionPrice}
                      lastFunded={
                        walletStatistics.lastFunded &&
                        moment(walletStatistics.lastFunded).from(new Date())
                      }
                      fundWallet={this.showFundWalletModal}
                      addCard={this.initiateAddCard}
                      paystackProps={payStackConfig} // Props for PayStackButton
                      paymentChannel={paymentChannel}
                      requesting={requestingAddCard}
                    />
                  </Col>
                </Row>
                <div className="transactions-container">
                  <Row>
                    <Col lg={4}>
                      <TotalTransactionCard
                        totalTransaction={walletStatistics.totalTransactions}
                      />
                    </Col>
                    <Col lg={8}>
                      {/* <CardComponent className="pie-card"> */}
                      <CardComponent border="1px solid rgba(16, 16, 16, 0.1)">
                        {Object.keys(pieData).some(
                          (item) => pieData[item] > 0
                        ) && (
                          <PieChartCustomLegend
                            data={{
                              labels: pieChartLabels,
                              datasets: [
                                {
                                  label: 'Transactions',
                                  data: pieData,
                                  backgroundColor: [
                                    '#27AE60',
                                    '#6AC895',
                                    '#FBB700',
                                  ],
                                },
                              ],
                            }}
                          />
                        )}
                        {!Object.keys(pieData).some(
                          (item) => pieData[item] > 0
                        ) && (
                          <div className="wallet-empty-record">
                            <EmptyRecordMessage
                              message="You have no Transaction Breakdown"
                              width={73}
                              fontSize="15px"
                            />
                          </div>
                        )}
                      </CardComponent>
                    </Col>
                  </Row>
                </div>
                <div className="activities">
                  <Row>
                    <Col xs={6}>
                      <h4 className="recent-activities">Recent Activities</h4>
                    </Col>
                    <Col xs={6}>
                      <div onClick={this.transactionHistory}>
                        <p className="float-right see-all">
                          See all
                          <span className="angle-right">
                            <FaAngleRight className=" ml-2 size={20} " />
                          </span>
                        </p>
                      </div>
                    </Col>
                    <Col lg={12}>
                      {modifiedWalletActivitiesData.length === 0 && (
                        <div className="wallet-activities">
                          <CardComponent
                            height="332px"
                            border={'1px solid rgba(16, 16, 16, 0.1)'}
                          >
                            <div className="wallet-empty-record">
                              <EmptyRecordMessage message="You have no recent Activities" />
                            </div>
                          </CardComponent>
                        </div>
                      )}

                      {modifiedWalletActivitiesData.length > 0 && (
                        <CardComponent
                          height="332px"
                          border="1px solid rgba(16, 16, 16, 0.1)"
                        >
                          <TimelineList
                            timelineData={modifiedWalletActivitiesData}
                          />
                        </CardComponent>
                      )}
                    </Col>
                  </Row>
                </div>
                <ReferCard />
              </Col>
              <Col lg={4}>
                <SideCard
                  openReferModal={this.openReferModal}
                  billingAmount={billing ? billing.nextBillAmount : 0.0}
                  billingDate={
                    billing &&
                    moment(billing.nextBillingDate).format('DD/MMMM/YYYY')
                  }
                  showReferralCard={showReferralCard}
                  showInfo={this.showReferralCard}
                  showSubscriptionSettings={false}
                  seeAllCards={() => history.push('/all-cards')}
                  cardNumber={cardNumber}
                  cardExpiryDate={cardExpiryDate}
                  cvv={cvv}
                  brand={brand}
                  link={AppUtils.getReferralLink(this.state.referralCode)}
                />
              </Col>
            </Row>
          <Col>
            <ZeedasModal
              open={this.state.referFriendModal}
              onClose={this.closeReferFriendModal}
              title="Refer a friend"
              width={
                window.innerWidth >= 1200
                  ? '38%'
                  : window.innerWidth >= 768
                  ? '50%'
                  : window.innerWidth < 600
                  ? '100%'
                  : '38%'
              }
            >
              <ReferFriend onReferralSuccess={this.handleReferralSuccess} />
            </ZeedasModal>
          </Col>
          <Col>
            <ZeedasModal />
          </Col>
          <Col>
            <ZeedasModal
              open={openAddCardModal}
              onClose={this.closeAddCardModal}
              title="Add your card"
              width={
                window.innerWidth >= 1200
                  ? '35%'
                  : window.innerWidth >= 768
                  ? '50%'
                  : window.innerWidth < 600
                  ? '100%'
                  : '33%'
              }
            >
              <AddCard
                cardLength={userCards.length}
                paystackProps={payStackConfig} // Props for PayStackButton
                paymentChannel={paymentChannel}
                addCardStripe={this.addCardStripe}
                requesting={requestingAddCard}
                stripeError={stripeError}
                stripeErrorMsg={stripeErrorMsg}
              />
            </ZeedasModal>
          </Col>
          <Col>
            <ZeedasModal
              open={openFundWalletModal}
              onClose={this.closeFundWalletModal}
              title="Fund your wallet"
              width="38%"
            >
              <FundWallet
                cardLength={userCards.length}
                data={userCards}
                onChange={this.handleChange}
                fundWallet={this.fundWallet}
                onChangeRadioButton={this.onChangeRadioButton}
                name="savedCard"
                checkedSavedCard={checkedSavedCard}
                fundValue={fundValue}
                requestingFundWallet={requestingFundWallet}
                cardId={this.state.cardId}
              />
            </ZeedasModal>
          </Col>
          <Col />
      </div>
    );
  }
}

Wallet.defaultProps = {
  stripe: {},
  elements: {},
};

Wallet.propTypes = {
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
    walletStatistics,
    walletActivities,
    billing,
    walletCards,
    clientsIP,
    requests,
  } = state;
  return {
    walletStatistics,
    walletActivities,
    billing,
    walletCards,
    clientsIP,
    requesting: requests.requesting,
  };
};

// the injectStripe Higher-Order-Component is needed
// in order to pass the Stripe object as a prop to the Wallet component
export default connect(mapStateToProps)((props) => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <Wallet stripe={stripe} elements={elements} {...props} />
    )}
  </ElementsConsumer>
));

/* Documentation */
// zeedas: https://documenter.getpostman.com/view/3813285/SztJzj8Z?version=latest#b1638b41-52f0-45a5-adcb-532db2932fa7
// addCardStripe: https://stripe.com/docs/payments/accept-a-payment
// addCardStripe: https://stripe.com/docs/payments/payment-intents/verifying-status
// addCardStripe: https://stripe.com/docs/stripe-js/reference#elements-get-element
// addCardStripe: https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
// addCardStripe: https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
// getClientsIP:  https://www.ipify.org/
// payStackAddCard: https://paystack.com/docs/payments/accept-payments
// getClientsLocation: https://ipstack.com/
// get Exchange Rate:  https://docs.openexchangerates.org/docs/latest-json, http://openexchangerates.github.io/money.js/#fx.rates
