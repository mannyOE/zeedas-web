import React, { Component } from "react";
import Pagination from "react-js-pagination";
import PropTypes from "prop-types";

class ClientSidePagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // activePage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handlePageChange(pageNumber, callback) {
    // this.setState({ activePage: pageNumber });
    callback(pageNumber);
  }

  render() {
    const {
      target, totalCount, pageSize, fetchMore, currentPage,
    } = this.props;

    return (
      <div>
        {target}
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={totalCount}
          prevPageText="Previous"
          nextPageText="Next"
          pageRangeDisplayed={5}
          onChange={(pageNumber) => {
            this.handlePageChange(pageNumber, fetchMore);
          }}
        />
      </div>
    );
  }
}

export default ClientSidePagination;

ClientSidePagination.defaultProps = {
  target: <></>,
  totalCount: 10,
  fetchMore: () => {
    // your logic here...
  },
  currentPage: 1,
  pageSize: 10,
};

ClientSidePagination.propTypes = {
  target: PropTypes.element,
  totalCount: PropTypes.number,
  fetchMore: PropTypes.func,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
};
