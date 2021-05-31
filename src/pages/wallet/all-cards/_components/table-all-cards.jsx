import React from 'react';
import PropTypes from 'prop-types';
import { Table } from "reactstrap";
import TransactionBadge from "../../../../zeedas-components/transaction-badge";
import Colors from "../../../../utils/colors";
import IconDelete from "../../../../zeedas-assets/icons/icon-delete";
import IconCheck from "../../../../zeedas-assets/icons/icon-check";
import { walletHelpers } from "../../_helper";
import { appHelpers } from "../../../../helpers/app.helpers";

const tableHead = ["*", "Expires", "Card Holder", "Last Debited", "Total Trans"];

const TableAllCards = ({
  data, onMouseEnter, onMouseLeave, hoveredRow, deleteCard, setDefaultCard,
}) => (
  <div>
    <Table className="table table-all-cards" responsive>
      <thead>
        <tr className="table-all-cards-hover">
          {tableHead.map((item, i) => (
            <th key={i}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      {data.map((item, i) => (
        <tbody key={i} className="section section-step">
          <tr
            key={item._id}
            onMouseEnter={() => onMouseEnter(item)}
            onMouseLeave={() => onMouseLeave(item)}
          >
            <td>
              <span>{walletHelpers.creditCard(item.brand, false, false, "#000")}</span>
              <span className={"pl-2"}>{item.last4}</span>
              {/* { */}
              {/*  item.cardType === "visa" */}
              {/*  && ( */}
              {/*    <> */}
              {/*      <span> */}
              {/*        <IconVisa */}
              {/*          fill="#000" */}
              {/*          width1={50} */}
              {/*          height1={21} */}
              {/*          height2={21} */}
              {/*        /> */}
              {/*      </span> */}
              {/*      <span className="ml-2 dark-text"> */}
              {/*        {item.cardNumber} */}
              {/*      </span> */}
              {/*    </> */}
              {/*  ) */}
              {/* } */}
              {/* { */}
              {/*  item.cardType === "mastercard" */}
              {/*  && ( */}
              {/*    <> */}
              {/*      <span> */}
              {/*        <IconMasterCardBordered */}
              {/*          width1={50} */}
              {/*        /> */}
              {/*      </span> */}
              {/*      <span className="ml-2 dark-text"> */}
              {/*        {item.cardNumber} */}
              {/*      </span> */}
              {/*    </> */}
              {/*  ) */}
              {/* } */}
            </td>
            <td>
              {`${item.expMonth}/${item.expYear}`}
            </td>
            <td>
              {item.holderName}
            </td>
            <td>
              {item.lastDebitAmount
              && (
              <span className="funds-transferred">
                -
                {walletHelpers.currencySign(item.currency)}
                {appHelpers.numberWithCommas(item.lastDebitAmount)}
                {/* {!item.lastDebitAmount && 0} */}
              </span>
              )}
              {!item.lastDebitAmount
              && (
              <span className="wallet-funded">
                0
              </span>
              )}

            </td>
            <td>
              {
                item.default && hoveredRow !== item._id
                && (
                <div>
                  <span className="mr-2">
                    {item.transactions}
                  </span>
                  <TransactionBadge

                    status="Default"
                    bgColor={Colors.TRANSACTION_LIGHT_GREEN}
                    color={Colors.TRANSACTION_GREEN}
                  />
                  <span className="ml-4" onClick={() => deleteCard(item)}>
                    <IconDelete
                      height={22}
                      width={18}
                    />
                  </span>
                </div>
                )
              }
              {
                item.default && hoveredRow === item._id
                && (
                  <div>
                    <span className="mr-2">
                      {item.transactions}
                    </span>
                    <TransactionBadge

                      status="Default"
                      bgColor={Colors.TRANSACTION_LIGHT_GREEN}
                      color={Colors.TRANSACTION_GREEN}
                    />
                    <span className="ml-4" onClick={() => deleteCard(item)}>
                      <IconDelete
                        height={22}
                        width={18}
                      />
                    </span>
                  </div>
                )
              }
              {
                !item.default && hoveredRow !== item._id
                && (
                <>
                  <span>
                    {item.transactions}
                    {' '}
                    Transactions
                  </span>
                  <span className="ml-4" onClick={() => deleteCard(item)}>
                    <IconDelete
                      height={24}
                      width={18}
                    />
                  </span>
                </>
                )
              }
              {
                hoveredRow === item._id && !item.default
                  && (
                  <div className={hoveredRow === item._id ? "hovered-row" : "not-hovered"}>
                    <span className="mr-2">
                      <IconCheck
                        height={17}
                        width={17}
                      />
                    </span>
                    <span className={"set-default"} onClick={() => setDefaultCard(item)}>
                      Set as default
                    </span>
                    <span className="ml-4" onClick={() => deleteCard(item)}>
                      <IconDelete
                        height={22}
                        width={18}
                      />
                    </span>
                  </div>
                  )
              }
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  </div>
);

export default TableAllCards;

TableAllCards.defaultProps = {
  data: [],
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  deleteCard: () => {},
  setDefaultCard: () => {},
  hoveredRow: -1,
};

TableAllCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  deleteCard: PropTypes.func,
  setDefaultCard: PropTypes.func,
  hoveredRow: PropTypes.number,
};
