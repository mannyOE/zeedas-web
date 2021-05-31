import React from 'react';
import PropTypes from 'prop-types';
import { Table } from "reactstrap";
import moment from 'moment';
import TransactionBadge from "../../../../zeedas-components/transaction-badge";
import img1 from "../../../../zeedas-assets/images/profile/lady.jpg";
import IconTransactionRecieved from "../../../../zeedas-components/icon-transaction-recieved";
import IconTransactionWithdrawn from "../../../../zeedas-components/icon-transaction-withdrawn";
import ClientSidePagination from "../../../../zeedas-components/client-side-pagination";
import Colors from "../../../../utils/colors";
import IconClearAll from "../../../../zeedas-assets/icons/icon-clear-all";
import { walletHelpers } from "../../_helper";
import { appHelpers } from "../../../../helpers/app.helpers";

const tableHead = ["Transaction", "Amount", "Source/Recipient", "Date Performed", "Status"];
const SortBy = ["Transaction", "Amount", "Date Performed", "Status"];

const capitalizeKeys = (obj) => {
  const isObject = (o) => Object.prototype.toString.apply(o) === '[object Object]';
  const isArray = (o) => Object.prototype.toString.apply(o) === '[object Array]';

  const transformedObj = isArray(obj) ? [] : {};

  for (const key in obj) {
    // replace the following with any transform function
    const transformedKey = key.replace(/^\w/, (c, _) => c.toUpperCase());

    if (isObject(obj[key]) || isArray(obj[key])) {
      transformedObj[transformedKey] = capitalizeKeys(obj[key]);
    } else {
      transformedObj[transformedKey] = obj[key];
    }
  }
  return transformedObj;
};

const SelectField = ({ tableFilter, requestSort }) => {
// const {selectValue, setSelectValue} = React.useState(tableHead[0])
  const changeSelect = (e) => {
    // setSelectValue(e.target.value)
    requestSort(e.target.value);
  };
  return (
    <select
      onChange={(e) => changeSelect(e)}
      className="select"
    >
      {/* eslint-disable-next-line react/no-array-index-key */}
      {tableFilter.map((item, i) => <option value={item} key={i}>{item}</option>)}
    </select>
  );
};

SelectField.defaultProps = {
  tableFilter: [],
  requestSort: () => {
    // your logic here...
  },
};

SelectField.propTypes = {
  tableFilter: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  requestSort: PropTypes.func,
};

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig
      && sortConfig.key === key
      && sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    // setSelectValue(key)
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const TableStructure = ({
  data, onMouseEnter, onMouseLeave, hoveredRow, clearAll,
  showRepeatModal,
}) => {
  // Changed the first character of the keys in the data
  // object to capital letter so as to accommodate the sort function.
  const newData = capitalizeKeys(data);
  const { items, requestSort, sortConfig } = useSortableData(newData);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div>
      <div className="float-left">
        <div onClick={clearAll} className="clear-table">
          <IconClearAll fill="#FF7070" />
          <span className="ml-2 mt-1">Clear All</span>
        </div>
      </div>
      <div className="float-right">
        <p className="float-left sort mr-2">Sort By: </p>
        <SelectField
          tableFilter={SortBy}
          getClassNamesFor={getClassNamesFor}
          requestSort={requestSort}
        />

      </div>

      <Table className="table transaction-history" responsive>
        <thead>
          <tr>
            {tableHead.map((item, i) => (
              <th key={i}>
                {item}
              </th>
            ))}

          </tr>
        </thead>
        {items.map((item, i) => (
          <tbody key={i} className="section section-step">
            <tr
              key={item._id}
              onMouseEnter={() => onMouseEnter(item)}
              onMouseLeave={() => onMouseLeave(item)}
            >
              <td>
                {
                  (item.TransactionType).toLowerCase() === "credit"
                  && (
                  <>
                    <IconTransactionRecieved
                      bgColor={Colors.TRANSACTION_LIGHT_GREEN}
                      color={Colors.TRANSACTION_GREEN}
                    />
                    {'  '}
                    <span className="ml-2">
                      Wallet Funded
                    </span>
                  </>
                  )
                }
                {
                  (item.TransactionType).toLowerCase() === "debit"
                  && (
                  <>
                    <IconTransactionWithdrawn
                      bgColor={Colors.TRANSACTION_LIGHT_RED}
                      color={Colors.TRANSACTION_RED}
                    />
                    {'  '}
                    <span className="ml-2">
                      Funds Transferred
                    </span>
                  </>
                  )
                }
              </td>
              <td>
                {
                  (item.TransactionType).toLowerCase() === "credit"
              && (
                <>
                  <span className="wallet-funded">
                    {walletHelpers.sign(item.TransactionType)}
                    {walletHelpers.currencySign(item.Currency)}
                    {item.Amount && appHelpers.numberWithCommas(item.Amount)}
                  </span>
                </>
              )
            }

                {
                // item.Transaction === "Funds Transferred"
                  (item.TransactionType).toLowerCase() === "debit"
                && (
                <span className="funds-transferred">
                  {walletHelpers.sign(item.TransactionType)}
                  {walletHelpers.currencySign(item.Currency)}
                  {item.Amount && appHelpers.numberWithCommas(item.Amount)}
                </span>
                )
              }
              </td>
              <td>
                {
                  (item.TransactionType).toLowerCase() === "credit"
                && (
                <div>
                  <span className="float-left mr-3 pt-2">
                    {/* <MasterCard /> */}
                    {walletHelpers.creditCard(item.Source.Brand, false, false, "#000")}
                  </span>
                  <p className=" pt-2">
                    **
                    {item.Source.Last4}
                    <span style={{ display: "block" }}>
                      {item.Source.HolderName}
                      {/* {item.Name} */}
                      {item.Name}
                    </span>
                  </p>

                </div>
                )
              }
                {
                item.Transaction === "Funds Transferred"
                && (
                <div>
                  <span className="float-left mr-2 pt-2">
                    <img src={img1} className="rounded-circle" width="35" alt="" />
                  </span>
                  <p className=" pt-2">
                    {item.Name}
                    <span style={{ display: "block" }}>
                      {item.Source}
                    </span>
                  </p>
                </div>
                )
              }
              </td>
              <td>{moment(item.CreatedAt).format("DD MMM YYYY h:mm a")}</td>
              <td>
                {
                  hoveredRow !== item._id && (item.Status).toLowerCase() === "complete"
              && (
              <TransactionBadge
                status="Completed"
                bgColor={Colors.TRANSACTION_LIGHT_GREEN}
                color={Colors.TRANSACTION_GREEN}
              />
              )

            }
                {
                  hoveredRow !== item._id && (item.Status).toLowerCase() === "Failed"
                && (
                <TransactionBadge
                  status="Failed"
                  bgColor={Colors.TRANSACTION_LIGHT_RED}
                  color={Colors.TRANSACTION_RED}
                />
                )

              }
                {
                  hoveredRow === item._id
                    && (
                    <div className={hoveredRow === item._id ? "hovered-row" : "not-hovered"}>
                      <span onClick={() => showRepeatModal(item)} className="repeat-transaction">Repeat Transaction</span>
                    </div>
                    )

              }
              </td>
            </tr>
          </tbody>
        ))}
        {/* </tbody> */}
      </Table>
    </div>
  );
};

TableStructure.defaultProps = {
  data: [],
  // icon: <></>,
  sign: <></>,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  showRepeatModal: () => {},
  hoveredRow: -1,
};

TableStructure.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
  // icon: PropTypes.element,
  sign: PropTypes.element,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  showRepeatModal: PropTypes.func,
  hoveredRow: PropTypes.number,
};

export default function TransactionHistoryTable({
  data, sign, fetchMore, currentPage, pageSize, clearAll,
  onMouseEnter, onMouseLeave, hoveredRow, showRepeatModal,
}) {
  // Logic for displaying current data
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const currentData = data.slice(firstIndex, lastIndex);

  return (
    <div className="text-center">
      <ClientSidePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={data.length}
        fetchMore={fetchMore}
        target={(
          <TableStructure
            data={currentData}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            hoveredRow={hoveredRow}
            showRepeatModal={showRepeatModal}
            sign={sign}
            clearAll={clearAll}
          />
        )}
      />
    </div>
  );
}

TransactionHistoryTable.defaultProps = {
  data: [],
  sign: <></>,
  fetchMore: () => {
    // your logic here...
  },
  currentPage: 1,
  pageSize: 10,
  clearAll: () => {
    // your logic here...
  },
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  showRepeatModal: () => {},
  hoveredRow: -1,
};

TransactionHistoryTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
  sign: PropTypes.element,
  fetchMore: PropTypes.func,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  clearAll: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  showRepeatModal: PropTypes.func,
  hoveredRow: PropTypes.number,
};
