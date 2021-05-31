import React from "react";
import "./index.scss"
import Pagination from "react-js-pagination";
import {FaCaretRight, FaCaretLeft } from 'react-icons/fa'

class ServerPaginatedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    handlePageChange(pageNumber, callback) {
        this.setState({activePage: pageNumber});
        callback(pageNumber);
    }

    render() {
        let { target, totalCount, pageSize, fetchMore, currentPage } = this.props;

        return (
            <div>
                {/*Display The responding table*/}

                {target}
                <Pagination
                    hideDisabled={true}
                    activePage={currentPage}
                    nextPageText={<FaCaretRight className={'caret'} size={'2em'} />}
                    prevPageText={<FaCaretLeft className={'caret'} size={'2em'}/>}
                    lastPageText={'Last'}
                    // firstPageText={'First'}
                    itemsCountPerPage={pageSize}
                    totalItemsCount={totalCount}
                    pageRangeDisplayed={7}
                    onChange={(pageNumber) => {
                        this.handlePageChange(pageNumber, fetchMore);
                    }}
                />
            </div>
        )
    }
}

export default ServerPaginatedTable;