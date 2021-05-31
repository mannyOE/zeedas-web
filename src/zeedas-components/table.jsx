import React from 'react';
import PropTypes from "prop-types";
import ClientSidePagination from "./client-side-pagination";


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

const Table = ({
  data, tableHead,
}) => {
  const { items, requestSort, sortConfig } = useSortableData(data);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div>
      <div className="float-left">
        <p className="clear-table">
          <i className="fa fa-align-right" />
          {' '}
          Clear All
        </p>
      </div>
      <div className="float-right">
        <p className="float-left mr-2">Sort By: </p>
        <SelectField
          tableFilter={tableHead}
          getClassNamesFor={getClassNamesFor}
          requestSort={requestSort}
        />

      </div>


      <table className="table">
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
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                $
                <span>{item.price}</span>
              </td>
             <td> <span>{item.stock}</span></td>
            </tr>
          </tbody>
        ))}
        {/* </tbody> */}
      </table>
    </div>
  );
};

Table.defaultProps = {
  data: [],
  icon: <></>,
  sign: <></>,
  tableHead: [],
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
  icon: PropTypes.element,
  sign: PropTypes.element,
  tableHead: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
};


export default function ZeedasTable({
  fetchMore, data, tableHead, currentPage, pageSize,
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
          <Table
            data={currentData}
            tableHead={tableHead}
          />
        )}
      />
    </div>
  );
}

ZeedasTable.defaultProps = {
  data: [],
  tableHead: [],
  fetchMore: () => {
    // your logic here...
  },
  currentPage: 1,
  pageSize: 10,
};

ZeedasTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
  tableHead: PropTypes.arrayOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string, PropTypes.object],
  )),
  fetchMore: PropTypes.func,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
};
