import React from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import "./style.scss";

import { Link } from "react-router-dom";
import ButtonIconLeft from "../../../zeedas-components/button-icon-left";
import WindowsOSIcon from "../../../zeedas-assets/icons/icon-windows-os";
import LinuxOSIcon from "../../../zeedas-assets/icons/icon-linux-os";
import MacOSIcon from "../../../zeedas-assets/icons/icon-mac-os";
import downloadIllustration from "../../../zeedas-assets/images/profile/download-desktop-app-image.png";
import { authActions } from "../../../state/redux/auth/actions";
import colors from "../../../utils/colors";

class DesktopAppDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  componentDidMount() {
    this.setState({ email: this.props.location.email });
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.dispatch(authActions.logout());
  }

  resendEmail = () => {
    const payload = {
      email: this.state.email,
    };
    this.props.dispatch(authActions.resendEmailVerification(payload));
  };

  render() {
    return (
      <div className="desktop-download">
        <Row>
          <Col
            md="12"
            className="login-pointer d-flex justify-content-end align-items-center"
          >
            {/*<p className="pr-2 mb-0">Don't have an account? &nbsp;</p>*/}
            <Link
              className="font-bold font-18"
              // to="/authentication/login"
              to=""
              onClick={this.handleLogout}
            >
              Logout
            </Link>
          </Col>
        </Row>

        <Row className="desktop-download-content text-center">
          <Col md="3" className="p-0">
            <div className="desktop-download-content__illustration">
              <img src={downloadIllustration} alt="" />
            </div>
          </Col>
          <Col md="9">
            <h2 className="desktop-download-title">
              Download Zeedas Desktop App
            </h2>
            <p className="desktop-download-description">
              Use zeedas at ease with our desktop application for both Mac &
              Windows OS
            </p>

            <Row className="desktop-download-buttons">
              <Col md="4" className="text-center">
                <a href="/#">
                  <ButtonIconLeft
                    className="w-100"
                    text="Windows OS"
                    icon={<WindowsOSIcon />}
                    color="zd-white"
                    fontColor={colors.ZEEDAS_DARK_BLUE}
                  />
                </a>
              </Col>

              <Col md="4" className="text-center">
                <a href="/#">
                  <ButtonIconLeft
                    className="w-100"
                    text="Linux OS"
                    icon={<LinuxOSIcon />}
                    color="zd-white"
                    fontColor={colors.ZEEDAS_DARK_BLUE}
                  />
                </a>
              </Col>
              <Col md="4" className="text-center">
                <a href="/#">
                  <ButtonIconLeft
                    className="w-100"
                    text="Mac OS"
                    icon={<MacOSIcon />}
                    color="zd-white"
                    fontColor={colors.ZEEDAS_DARK_BLUE}
                  />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { requests } = state;
  return {
    requesting: requests.requesting,
  };
}
export default connect(mapStateToProps)(DesktopAppDownload);
