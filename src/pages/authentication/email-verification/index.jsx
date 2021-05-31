import React from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import ButtonIconLeft from "../../../zeedas-components/button-icon-left";
import GmailIcon from "../../../zeedas-assets/icons/icon-gmail";
import YahooIcon from "../../../zeedas-assets/icons/icon-yahoo";
import OutlookIcon from "../../../zeedas-assets/icons/icon-outlook";
import { authActions } from "../../../state/redux/auth/actions";
import colors from "../../../utils/colors";
import "./style.scss";

class EmailVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      resendingEmail: false,
    };
  }

  componentDidMount() {
    this.setState({ email: this.props.location.email });
  }

  resendEmail = () => {
    const payload = {
      email: this.state.email,
    };
    this.setState({ resendingEmail: true });
    this.props
      .dispatch(authActions.resendEmailVerification(payload))
      .then(() => {
        this.setState({ resendingEmail: false });
      })
      .catch(() => this.setState({ resendingEmail: false }));
  };

  render() {
    return (
      <>
        <Row>
          <Col
            md="12"
            className="login-pointer d-flex justify-content-end align-items-center"
          >
            <p className="pr-2 mb-0">Already have an account? &nbsp;</p>
            <Link className="font-bold font-18" to="/authentication/login">
              Log in
            </Link>
          </Col>
        </Row>
        <div className="email-verification-content d-flex justify-content-center text-center">
          <div>

            <h1 className="email-verification-title">
              Please verify your email
            </h1>
            <p className="email-verification-description">
              We sent an email to
              {" "}
              <strong>{this.state.email}</strong>
            </p>
            <p className="email-verification-description">
              Once you verify your email address, you and your team can get
              started with your Zeedas Premium plan!
            </p>

            <Row className="email-verification-buttons">
              <Col md="4" className="text-center">
                <a href="https://gmail.com/" target="_blank">
                  <ButtonIconLeft
                    on
                    text="Open Gmail"
                    icon={<GmailIcon />}
                    color="zd-white"
                    borderRadius="5px"
                    boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
                    fontColor={colors.ZEEDAS_DARK_BLUE}
                  />
                </a>
              </Col>

              <Col md="4" className="text-center">
                <a href="https://login.yahoo.com/" target="_blank">
                  <ButtonIconLeft
                    text="Open Yahoo!"
                    icon={<YahooIcon />}
                    color="zd-white"
                    borderRadius="5px"
                    boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
                    fontColor={colors.ZEEDAS_DARK_BLUE}
                  />
                </a>
              </Col>
              <Col md="4" className="text-center">
                <a href="https://outlook.live.com/" target="_blank">
                  <ButtonIconLeft
                    text="Open Outlook"
                    icon={<OutlookIcon />}
                    color="zd-white"
                    borderRadius="5px"
                    boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
                    fontColor={colors.ZEEDAS_DARK_BLUE}
                  />
                </a>
              </Col>
            </Row>

            <p className="email-verification-resend">
              Didn’t receive email? &nbsp;
              <a className="resend-email font-bold" onClick={this.resendEmail}>
                Resend email
              </a>
            </p>
            {this.state.resendingEmail && (
              <div className="text-center">
                <span>
                  Just a moment...
                  <span className="loading" />
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  const { requests } = state;
  return {
    requesting: requests.requesting,
  };
}
export default connect(mapStateToProps)(EmailVerification);
