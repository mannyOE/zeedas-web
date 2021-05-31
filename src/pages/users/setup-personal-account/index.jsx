import React from "react";
import { Row, FormGroup, Form } from "reactstrap";
import { connect } from "react-redux";
import ZeedasInput from "../../../zeedas-components/input";
import validators from "../../../utils/validators";
import BlockLevelButton from "../../../zeedas-components/block-level-button";
import { usersActions } from "../../../state/redux/users/actions";
import ButtonLoadingIcon from "../../../zeedas-assets/icons/icon-button-loader";
import AccountAvatar from "../user-profile/_components/account-avatar";
import PageLoader from "../../../zeedas-components/page-loader";
import ZeedasPhoneInput from "../../../zeedas-components/phone-number-input";

class PersonalAccountSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      billingEmail: "",
      phoneNumberHasError: false,
    };
    this.validators = validators;
  }

  componentDidMount() {}

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onPhoneInputChange = (phoneNumber) => {
    this.setState({
      phoneNumber,
    });
  };

  setPhoneNumberError = (val) => {
    this.setState({ phoneNumberHasError: val });
  };

  setupPersonalAccount = async (event) => {
    event.preventDefault();
    const { fullName, billingEmail, phoneNumber } = this.state;

    const payload = {
      update: {
        phone: phoneNumber,
        name: fullName,
      },
    };
    if (billingEmail !== "") {
      payload.update.email = billingEmail;
    }

    await this.props.dispatch(usersActions.finishAccountSetup(payload));
  };

  render() {
    const {
      billingEmail, fullName, phoneNumber, phoneNumberHasError,
    } = this.state;
    const { requesting, fullPageRequesting, accountInfo } = this.props;
    const canSubmit = billingEmail && fullName && phoneNumber && !phoneNumberHasError;

    if (fullPageRequesting) {
      return <PageLoader />;
    }
    return (
      <>
        <Row>
          <div className="col-md-6 m-auto">
            <div className="invite-right-container mt-5">
              <div className="text-center invite-header">
                <div className="my-4">
                  <AccountAvatar
                    source={accountInfo.user.avatar}
                    backgroundColor={accountInfo.user.avatarColor}
                    name={accountInfo.user.name}
                    dimension={100}
                    borderRadius={50}
                    fontSize={12}
                  />
                </div>

                <h2 className="invite-header-title">
                  Welcome,
                  {" "}
                  {accountInfo && accountInfo.user.name}
                </h2>
                <p className="invite-header-description">
                  You can now setup your account by updating your personal profile
                  and inviting your team members, Team members must have a domain
                  email
                </p>
              </div>

              <Form
                className="forms invite-team-form"
                onSubmit={this.setupPersonalAccount}
              >
                <FormGroup className="py-1">
                  <ZeedasInput
                    label="Full Name"
                    placeholder="e.g: Chioma Davis"
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={this.onInputChange}
                  />
                </FormGroup>
                <FormGroup className="py-1">
                  <ZeedasPhoneInput
                    label="Phone Number"
                    placeholder="+(000) 811 0000 000"
                    type="text"
                    name="phone"
                    value={phoneNumber}
                    handleError={this.setPhoneNumberError}
                    onChange={this.onPhoneInputChange}
                  />
                </FormGroup>
                <FormGroup className="py-1">
                  <ZeedasInput
                    label="Billing Email"
                    placeholder="e.g: John@zeedas.com"
                    type="billingEmail"
                    name="billingEmail"
                    value={billingEmail}
                    onChange={this.onInputChange}
                  />
                </FormGroup>

                <FormGroup style={{ marginTop: "44px" }}>
                  <BlockLevelButton
                    disabled={requesting || !canSubmit}
                    color="zd-blue"
                    onClick={this.setupPersonalAccount}
                    type="submit"
                  >
                    {requesting ? <ButtonLoadingIcon /> : "Next"}
                  </BlockLevelButton>
                </FormGroup>
              </Form>
            </div>
          </div>
        </Row>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { requests, users, auth } = state;
  return {
    requesting: requests.requesting,
    fullPageRequesting: requests.fullPageRequesting,
    user: auth.userData,
    accountInfo: users.accountInfo,
  };
}

export default connect(mapStateToProps)(PersonalAccountSetup);
