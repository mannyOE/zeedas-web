import React from "react";
import {
  Row, Col, FormGroup, Label, Input,
} from "reactstrap";
import { connect } from "react-redux";
import IconChangePic from "../../../../zeedas-assets/icons/icon-change-pic";
import ZeedasInput from "../../../../zeedas-components/input";
import Selector from "../../_components/select";
import colors from "../../../../utils/colors";
import ButtonLoadingIcon from "../../../../zeedas-assets/icons/icon-button-loader";
import DefaultButton from "../../../../zeedas-components/default-button";
import { usersActions } from "../../../../state/redux/users/actions";
import AccountAvatar from "../_components/account-avatar";
import { COUNTRY_OPTIONS } from "../../../../utils/constants";
import SelectOption from '../../../app/_components/select-option';
import "../_styles/index.scss"


class TeamProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      billingPhoneNumber: "",
      billingEmail: "",
      country: "",
      teamLogoFile: "",
      countryOptions:[]
    };
  }

  componentDidMount() {
    this.initCountries();
    const { accountInfo } = this.props;
    this.setState({
      companyName: accountInfo.user.account.companyName ? accountInfo.user.account.companyName : "",
      billingEmail: accountInfo.user.account.email ? accountInfo.user.account.email : "",
      billingPhoneNumber: accountInfo.user.account.phone ? accountInfo.user.account.phone : "",
      country: accountInfo.user.account.country
        ? { label: accountInfo.user.account.country, value: accountInfo.user.account.country }
        : { label: "", value: "" },
    });
  }

  initCountries = () => {
    const { accountInfo, countries } = this.props;
    const countryOptions = countries.map((country) => {
      return {
        value: country.name,
        label: (
          <div className="d-flex align-items-center">
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className="mr-2"
              height="10px"
            />
            <span>{country.name}</span>
          </div>
        ),
      };
    });
    this.setState({
      countryOptions
    }, () => {
      const userCountry = countryOptions.find(
        (country) => country.value === accountInfo.user.country
      );
      this.setState({
        country: accountInfo.user.country
          ?  userCountry
          : { label: '', value: '' },
      });
    })    
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSelectCountryChange = (country) => {
    this.setState({ country });
  };

  onKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.changePassword();
    }
  };

  updateTeamProfile = () => {
    const {
      billingPhoneNumber, billingEmail, country, companyName,
    } = this.state;

    const payload = {
      update: {
        phone: billingPhoneNumber,
        email: billingEmail,
        country: country.value,
        companyName,
      },
    };

    this.props.dispatch(usersActions.updateCompanyInfo(payload));
  };

  onUploadImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      this.setState({ teamLogoFile: file });

      const data = new FormData();
      data.append("avatar", file);
      this.props.dispatch(usersActions.updateCompanyAvatar(data));
    }
  };

  render() {
    const {
      companyName,
      billingEmail,
      billingPhoneNumber,
      country,
      countryOptions
    } = this.state;
    const { requesting, accountInfo } = this.props;
    return (
      <div className="profile-update">
        <div className="profile_update--heading">
          <h3 className="profile_update--title">Team Profile</h3>
          <p className="profile_update_text">
            Update and edit your team information.
          </p>
        </div>
        <div className="profile_update_picture d-flex align-items-center">
          <AccountAvatar
            source={accountInfo.user.account.avatar}
            backgroundColor={accountInfo.user.avatarColor}
            name={accountInfo.user.account.companyName}
            dimension={86}
            borderRadius={20}
            fontSize={32}
          />

          <div>
            <p className="profile_update-avatar">Team Logo</p>
            <div className="profile_update-changeImg profile-upload-input">
              <span>
                <IconChangePic />
              </span>
              <Input
                type="file"
                name="file"
                onChange={this.onUploadImage}
                id="teamLogoFile"
              />
              Change Pic
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Row>
            <Col lg={5}>
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Team Name"
                  placeholder="Team Name"
                  type="text"
                  name="companyName"
                  value={companyName}
                  onChange={this.onInputChange}
                />
              </FormGroup>
            </Col>
            <Col lg={5}>
              <FormGroup className="py-1" >
                <ZeedasInput
                  label="Billing Email"
                  placeholder="email@companyname.com"
                  type="email"
                  name="billingEmail"
                  value={billingEmail}
                  onChange={this.onInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Billing Phone Number"
                  placeholder="+(000) 811 0000 000"
                  type="text"
                  name="billingPhoneNumber"
                  value={billingPhoneNumber}
                  onChange={this.onInputChange}
                />
              </FormGroup>
            </Col>
            <Col lg={5}>
              <FormGroup className="py-1">
                <Label className="default-input-label">Select Country</Label>
                <SelectOption
                  label="country"
                  value={country}
                  name="country"
                  selectedOption={country}
                  options={countryOptions}
                  onChange={this.onSelectCountryChange}
                  placeholder="Select country"
                  bgColor={colors.ZEEDAS_INPUT_GREY}
                  border={"#e8e9ed"}
                  placeholderColor={colors.ZEEDAS_INPUT_GREY}
                  isClearable={false}
                />
              
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <DefaultButton
                style={{ marginTop: "30px", paddingLeft: "30px", paddingRight: "30px", width: "162px" }}
                onClick={this.updateTeamProfile}
                color="zd-blue"
                disabled={requesting}
              >
                {requesting ? <ButtonLoadingIcon /> : `Update`}
              </DefaultButton>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { requests, users, shared } = state;
  return { requesting: requests.requesting, accountInfo: users.accountInfo, countries: shared.countriesList  };
}

export default connect(mapStateToProps)(TeamProfile);
