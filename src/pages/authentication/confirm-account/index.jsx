import React from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";

import { authActions } from "../../../state/redux/auth/actions";
import PageLoader from "../../../zeedas-components/page-loader";

class ConfirmAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { history } = this.props;
    const { search } = history.location;
    const query = new URLSearchParams(search);
    const token = query.get("confirmToken");
    this.props.dispatch(authActions.confirmAccount({ token }));
  }

  render() {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row className="text-center">
          {this.props.requesting && (
            <PageLoader message="Confirming your account. Please wait..." />
          )}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requesting } = state;
  return { requesting };
}

export default connect(mapStateToProps)(ConfirmAccount);
