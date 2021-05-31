import React from "react";
import { LOCAL_STORE_REDIRECT_URL } from "../../../utils/constants";
import PageLoader from "../../../zeedas-components/page-loader";

class SlackAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (window.location.search) {
      const redirectTo = `${window.localStorage.getItem(
        LOCAL_STORE_REDIRECT_URL
      )}${window.location.search}`;

      window.location.href = redirectTo;
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <PageLoader message="please wait while we authenticate using your Slack details..." />
      </div>
    );
  }
}

export default SlackAuth;
