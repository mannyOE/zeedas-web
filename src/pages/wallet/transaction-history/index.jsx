import React, { Component } from 'react';
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import TransactionHistoryTable from "./_components/transaction-history-table";
import CardComponent from "../../../zeedas-components/card";
import IconArrowBack from "../../../zeedas-assets/icons/icon-arrow-back";
import ZeedasModal from "../../../zeedas-components/modal";
import { walletService } from "../../../services/wallet-service";
import { appConstants, NOTIFICATION_FAILURE, NOTIFICATION_SUCCESS } from "../../../constants";
import ActionMessage from "../../../zeedas-components/action-message";
import IconClearAll from "../../../zeedas-assets/icons/icon-clear-all";
import { notify } from "../../../zeedas-components/bottom-notification";
import IconCheck from "../../../zeedas-assets/icons/icon-check";
import EmptyRecordMessage from "../../../zeedas-components/empty-record-message";
import { requestActions } from "../../../state/redux/requests/actions";
import PageLoader from "../../../zeedas-components/page-loader";

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 5,
      tableHead: ["name", "price", "stock"],
      openClearModal: false,
      walletActivities: [],
      hoveredRow: false,
      openRepeatModal: false,
      requestingRepeatTransaction: false,
    };
  }

  componentDidMount() {
    this.getWalletActivities();
  }

  /* Zeedas API calls */

  getWalletActivities = () => {
    const { dispatch } = this.props;
    dispatch(requestActions.startRequest());
    walletService.getWalletActivities()
      .then((res) => {
        dispatch(requestActions.stopRequest());

        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.setState({ walletActivities: response.data });
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
  };

  clearTransactionHistory = () => {
    walletService.deleteWalletActivities()
      .then((res) => {
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          notify(response.message, NOTIFICATION_SUCCESS);
          this.getWalletActivities();
          this.closeClearModal();
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
        }
      });
  };

  /* General page handlers */
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  backToWallet = () => {
    this.props.history.push("/wallet");
  };

  clearAll = () => {
    this.setState({ openClearModal: true });
  };

  closeClearModal = () => {
    this.setState({ openClearModal: false });
  };

  onMouseEnter = (item) => {
    const { _id } = item;
    this.setState({ hoveredRow: _id });
  };

  onMouseLeave = () => {
    this.setState({ hoveredRow: false });
  };

  closeRepeatModal = () => {
    this.setState({ openRepeatModal: false });
  };

  openRepeatModal = (item) => {
    this.setState({ openRepeatModal: true, record: item });
  };

  repeatTransaction = () => {
    const { record } = this.state;
    const { Source } = record;
    this.setState({ requestingRepeatTransaction: false });

    const payload = {
      card: Source._id,
      amount: record.Amount,
    };

    this.setState({ requestingRepeatTransaction: true });
    walletService.fundWallet(payload)
      .then((res) => {
        this.setState({ requestingRepeatTransaction: false });
        const { response } = res;
        if (res.status === appConstants.SUCCESS_RESPONSE) {
          this.getWalletActivities();
          this.setState({ openRepeatModal: false });
          notify(response.message, NOTIFICATION_SUCCESS);
        } else if (res.status === appConstants.ERROR_RESPONSE) {
          notify(response.message, NOTIFICATION_FAILURE);
          this.setState({ openRepeatModal: false });
        }
      });
  };

  render() {
    const {
      currentPage, pageSize, openClearModal,
      walletActivities, hoveredRow, openRepeatModal,
      requestingRepeatTransaction,
    } = this.state;

    const { requesting } = this.props;
    if (requesting) {
      return <PageLoader />;
    }

    return (
      <div>
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
              border={"1px solid rgba(16, 16, 16, 0.1)"}
            >
              {walletActivities.length === 0
              && (
                <div className="wallet-empty-record">
                  <EmptyRecordMessage
                    message="You have no transaction history"
                  />
                </div>
              )}
              {walletActivities.length > 0
              && (
              <TransactionHistoryTable
                data={walletActivities}
                pageSize={pageSize}
                sign={<span>&#8358;</span>}
                currentPage={currentPage}
                // tableHead={tableHead}
                fetchMore={this.handlePageChange}
                clearAll={this.clearAll}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                hoveredRow={hoveredRow}
                showRepeatModal={this.openRepeatModal}
              />
              )}
            </CardComponent>
            <ZeedasModal
              open={openClearModal}
              onClose={this.closeClearModal}
              title="Clear Transaction History"
              width="35%"
            >
              <ActionMessage
                question="Are you sure you want to clear transaction history ?"
                // info="This will delete everything in Landing Pages - Module 1 including 0 completed tasks and 3 incomplete tasks."
                proceedText="Clear History"
                btnProceedColor="zd-dark-pink"
                icon={<IconClearAll />}
                onClickProceed={this.clearTransactionHistory}
                onClickCancel={this.closeClearModal}
              />
            </ZeedasModal>
            <ZeedasModal
              open={openRepeatModal}
              onClose={this.closeRepeatModal}
              title="Repeat Transaction"
              width="35%"
            >
              <ActionMessage
                question="Are you sure you want to repeat this transaction ?"
                // info="This will delete everything in Landing Pages - Module 1 including 0 completed tasks and 3 incomplete tasks."
                proceedText="Repeat"
                cancelText="No"
                btnProceedColor="zd-green"
                icon={(
                  <IconCheck
                    fill="#fff"
                  />
                )}
                onClickProceed={this.repeatTransaction}
                onClickCancel={this.closeRepeatModal}
                requesting={requestingRepeatTransaction}
              />
            </ZeedasModal>
          </Col>
        </Row>
      </div>
    );
  }
}

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

export default connect(mapStateToProps)(TransactionHistory);
