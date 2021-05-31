import React from "react";
import { Row, Col } from "reactstrap";
import { FcGoogle } from "react-icons/fc";
import { FaAngleRight } from "react-icons/fa";
import { MdFilterNone } from "react-icons/md";
import List from "../list";
import CardComponent from "../card";
import TimelineList from "../timeline-list";
import DefaultButton from "../default-button";
import ButtonIconLeft from "../button-icon-left";
import ButtonIconArrow from "../button-icon-arrow";
import BlockLevelButton from "../block-level-button";
// eslint-disable-next-line max-len
// import TransactionHistoryTable from "../../pages/Wallet/transaction-history/transaction-history-table.jsx";
import IconTransactionRecieved from "../icon-transaction-recieved";
import IconTransactionWithdrawn from "../icon-transaction-withdrawn";
// import {Fc} from  'react-icons/fc'
import MasterCard from "../../zeedas-assets/icons/master-card";
import TransactionBadge from "../transaction-badge";
import img1 from "../../zeedas-assets/images/profile/lady.jpg";
import ZeedasTable from "../table";
import Colors from "../../utils/colors";
import Chips from "../chips";

const data = [
  {
    transaction: "Adam - 08125378900 withdrew fund sent #12,000",
    time: "20 mins ago",
    status: "warning",
  },
  {
    transaction: "James - 08125378900 withdrew fund sent #10,000",
    time: "45 mins ago",
    status: "warning",
  },
  {
    transaction: "You sent #12,000 to 2 recipents",
    time: "1 hour ago",
    status: "success",
  },
  {
    transaction: "You sent #10,000 to James - 08125378900",
    time: "2 hours ago",
    status: "success",
  },
  {
    transaction: "You funded you wallet with #50,000",
    time: "1 day ago",
    status: "success",
  },
];

const modifiedData = data.map((item) => {
  if (item.status === "success") {
    // eslint-disable-next-line no-param-reassign
    item.icon = <i className="ti-server" />;
    // eslint-disable-next-line no-param-reassign
    item.color = "bg-light-success";
  }
  if (item.status === "warning") {
    // eslint-disable-next-line no-param-reassign
    item.icon = <i className="far fa-bell" />;
    // eslint-disable-next-line no-param-reassign
    item.color = "bg-light-info";
  }
  return item;
});

const modifiedTimeLineListData = data.map((item) => {
  if (item.status === "success") {
    // eslint-disable-next-line no-param-reassign
    item.color = "rgba(77, 189, 152, 1)";
    // eslint-disable-next-line no-param-reassign
    item.boxShadow = "0 0 0 10px rgba(77, 189, 152, 0.2)";
  }
  if (item.status === "warning") {
    // eslint-disable-next-line no-param-reassign
    item.color = "rgba(35, 179, 232, 1)";
    // eslint-disable-next-line no-param-reassign
    item.boxShadow = "0 0 0 10px rgba(35, 179, 232, 0.2)";
  }
  return item;
});

const tableHead = ["name", "price", "stock"];

const products = [
  {
    id: 1, name: "Cheese", price: 4.9, stock: 20,
  },
  {
    id: 2, name: "Milk", price: 1.9, stock: 32,
  },
  {
    id: 3, name: "Yoghurt", price: 2.4, stock: 12,
  },
  {
    id: 4, name: "Heavy Cream", price: 3.9, stock: 9,
  },
  {
    id: 5, name: "Butter", price: 0.9, stock: 99,
  },
  {
    id: 6, name: "Sour Cream ", price: 2.9, stock: 86,
  },
  {
    id: 7, name: "Fancy French Cheese 🇫🇷", price: 99, stock: 12,
  },
];

// const transactionHistory2 = [
//   {
//     Transaction: "Wallet Funded",
//     Amount: 12500,
//     Source: 8210,
//     Name: "Jane Foster",
//     DatePerformed: "4, Oct 2018, 1:30am",
//     status: "completed",
//   },
//   {
//     Transaction: "Funds Transferred",
//     Amount: 15000,
//     Source: "09099999999",
//     Name: "Jane Foster",
//     // DatePerformed: "4, oct 2018, 1:30am",
//     status: "Repeat Transaction",
//   },
//   {
//     Transaction: "Wallet Funded",
//     Amount: 12500,
//     Source: 8210,
//     Name: "Jane Foster",
//     DatePerformed: "4, Oct 2018, 1:30am",
//     status: "completed",
//   },
//   {
//     Transaction: "Wallet Funded",
//     Amount: 12500,
//     Source: 8210,
//     Name: "Jane Foster",
//     DatePerformed: "3, Oct 2018, 1:30am",
//     status: "completed",
//   },
//   {
//     Transaction: "Funds Transferred",
//     Amount: 15000,
//     Source: "09099999999",
//     Name: "Terrence Po",
//     DatePerformed: "5, Oct 2018, 1:30am",
//     status: "Failed",
//   },
//   {
//     Transaction: "Wallet Funded",
//     Amount: 12500,
//     Source: 8210,
//     Name: "Jane Foster",
//     DatePerformed: "4, Oct 2018, 1:30am",
//     status: "completed",
//   },
//   {
//     Transaction: "Wallet Funded",
//     Amount: 12500,
//     Source: 8210,
//     Name: "Jane Foster",
//     DatePerformed: "4, Oct 2018, 1:30am",
//     status: "completed",
//   },
//   {
//     Transaction: "Wallet Funded",
//     Amount: 12500,
//     Source: 8210,
//     Name: "Jane Foster",
//     DatePerformed: "3, Oct 2018, 1:30am",
//     status: "completed",
//   },
//   {
//     Transaction: "Funds Transferred",
//     Amount: 15000,
//     Source: "09099999999",
//     Name: "Terrence Po",
//     DatePerformed: "5, Oct 2018, 1:30am",
//     status: "Failed",
//   },
//   {
//     Transaction: "Wallet Funded",
//     Amount: 12500,
//     Source: 8210,
//     Name: "Jane Foster",
//     DatePerformed: "4, Oct 2018, 1:30am",
//     status: "completed",
//   },
//   {
//     Transaction: "Funds Transferred",
//     Amount: 15000,
//     Source: "09099999999",
//     Name: "Jane Foster",
//     // DatePerformed: "4, oct 2018, 1:30am",
//     status: "Repeat Transaction",
//   },
//   {
//     Transaction: "Wallet Funded",
//     Amount: 12500,
//     Source: 8210,
//     Name: "Jane Foster",
//     DatePerformed: "4, Oct 2018, 1:30am",
//     status: "completed",
//   },
// ];

class JulietsComponentsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 3,
      chipsText: ["juliet.onyekaoha@test.com", "hello"],
    };
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  deleteChip = (index) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const remainingChips = this.state.chipsText.filter((chip, i) => i !== index);
    this.setState({ chipsText: remainingChips });
  }

  render() {
    const { currentPage, pageSize, chipsText } = this.state;
    return (
      <div>
        <Row>
          <Col lg={6}>
            <h4>List Component</h4>
            <CardComponent>
              <List data={modifiedData} />
            </CardComponent>
          </Col>
          <Col lg={6}>
            <h4>Card Component</h4>
            <CardComponent>
              <div>
                Hello
              </div>
            </CardComponent>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <h4>Timeline-list Component</h4>
            <CardComponent>
              <TimelineList timelineData={modifiedTimeLineListData} />
            </CardComponent>

          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <h4>Default Button Component</h4>
            <DefaultButton color="zd-blue"><span>Confirm Email</span></DefaultButton>
          </Col>
          <Col lg={3}>
            <h4>Button Left Icon Component</h4>
            <ButtonIconLeft
              color="white"
              icon={<FcGoogle size={30} />}
              text="Sign up with slack"
            />
          </Col>
          <Col lg={3}>
            <h4>Button Icon Arrow</h4>
            <ButtonIconArrow
              color="zd-blue-inverse"
              icon={<MdFilterNone size={25} />}
              arrow={<FaAngleRight />}
              text="Sign up with slack"
            />
          </Col>
          <Col lg={3}>
            <h4>Block Level Button</h4>
            <BlockLevelButton color="zd-blue">
              Block Level Button
            </BlockLevelButton>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <h4>Generic Table</h4>
            <CardComponent bgColor={Colors.ZEEDAS_ORANGE}>
              <ZeedasTable
                currentPage={currentPage}
                pageSize={pageSize}
                data={products}
                tableHead={tableHead}
                fetchMore={this.handlePageChange}
              />
            </CardComponent>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <h4>Transaction History Table</h4>
            <CardComponent>
              {/* <TransactionHistoryTable */}
              {/*  data={transactionHistory2} */}
              {/*  sign={<span>&#8358;</span>} */}
              {/*  currentPage={currentPage} */}
              {/*  tableHead={tableHead} */}
              {/*  fetchMore={this.handlePageChange} */}
              {/* /> */}
            </CardComponent>
          </Col>
        </Row>
        <CardComponent>
          <Row>
            <Col sm="2">
              <IconTransactionRecieved
                bgColor={Colors.TRANSACTION_LIGHT_GREEN}
                color={Colors.TRANSACTION_GREEN}
              />
            </Col>
            <Col sm="2">
              <IconTransactionWithdrawn
                bgColor={Colors.TRANSACTION_LIGHT_RED}
                color={Colors.TRANSACTION_RED}
              />
            </Col>
            <Col sm="2">
              <MasterCard />
            </Col>
            <Col sm="2">
              <TransactionBadge
                status="Failed"
                bgColor={Colors.TRANSACTION_LIGHT_RED}
                color={Colors.TRANSACTION_RED}
              />
            </Col>
            <Col sm="2">
              <TransactionBadge
                status="Completed"
                bgColor={Colors.TRANSACTION_LIGHT_GREEN}
                color={Colors.TRANSACTION_GREEN}
              />
            </Col>
            <Col sm="2">
              <img src={img1} className="rounded-circle" width="50" alt="" />
            </Col>
          </Row>
          <Row>
            {chipsText.map((text, i) => (
              <Col key={i} style={{ marginLeft: "0" }} sm={{ size: "auto", offset: 1 }}>
                <Chips text={text} deleteChip={() => this.deleteChip(i)} />
              </Col>
            ))}

          </Row>

        </CardComponent>
      </div>
    );
  }
}

export default JulietsComponentsDemo;
