import React from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";
import IconChangePic from "../../../../zeedas-assets/icons/icon-change-pic";
import ZeedasInput from "../../../../zeedas-components/input";
import colors from "../../../../utils/colors";
import ButtonLoadingIcon from "../../../../zeedas-assets/icons/icon-button-loader";
import DefaultButton from "../../../../zeedas-components/default-button";
import { usersActions } from "../../../../state/redux/users/actions";
import AccountAvatar from "../_components/account-avatar";
import { GENDER_OPTIONS } from "../../../../utils/constants";
import SelectOption from "../../../app/_components/select-option";
import ZeedasPhoneInput from "../../../../zeedas-components/phone-number-input";

class ProfileUpdates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      address: "",
      gender: "",
      country: "",
      imageFile: "",
      hey: "",
      countryOptions: [],
      phoneNumberHasError: false,
    };
  }

  componentDidMount() {
    this.initCountries();
    const { accountInfo } = this.props;
    this.setState({
      name: accountInfo.user.name ? accountInfo.user.name : "",
      email: accountInfo.user.email ? accountInfo.user.email : "",
      phone: accountInfo.user.phone ? accountInfo.user.phone : "",
      gender: accountInfo.user.gender
        ? { label: accountInfo.user.gender, value: accountInfo.user.gender }
        : { label: "", value: "" },
      address: accountInfo.user.address ? accountInfo.user.address : "",
      dateOfBirth: accountInfo.user.dateOfBirth
        ? moment(accountInfo.user.dateOfBirth).format("YYYY-MM-DD")
        : "",
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
    this.setState(
      {
        countryOptions,
      },
      () => {
        const userCountry = countryOptions.find(
          (country) => country.value === accountInfo.user.country
        );
        this.setState({
          country: accountInfo.user.country
            ? userCountry
            : { label: "", value: "" },
        });
      }
    );
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onPhoneInputChange = (phone) => {
    this.setState({
      phone,
    });
  };

  setPhoneNumberError = (val) => {
    this.setState({ phoneNumberHasError: val });
  };

  onSelectGenderChange = (gender) => {
    this.setState({ gender });
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

  updateProfile = () => {
    const {
      phone,
      gender,
      email,
      address,
      country,
      name,
      dateOfBirth,
    } = this.state;

    const payload = {
      update: {
        phone,
        gender: gender.value,
        email,
        address,
        country: country.value,
        name,
        dateOfBirth: moment(dateOfBirth, "YYYY-MM-DD").isValid()
          ? moment(dateOfBirth).format("YYYY-MM-DD")
          : "",
      },
    };

    this.props.dispatch(usersActions.updateAccountInfo(payload));
  };

  onUploadImage = (event) => {
    const [file] = event.target.files;
    if (file) {
      this.setState({ imageFile: file });

      const data = new FormData();
      data.append("avatar", file);
      this.props.dispatch(usersActions.updateAvatar(data));
    }
  };

  render() {
    const {
      name,
      email,
      gender,
      phone,
      country,
      dateOfBirth,
      address,
      countryOptions,
      phoneNumberHasError
    } = this.state;
    const { requesting, accountInfo, fetchingCountries } = this.props;
    return (
      <div className="profile-update">
        <div className="profile_update--heading">
          <h3 className="profile_update--title">Profile Updates</h3>
          <p className="profile_update_text">
            Update and edit your profile information.
          </p>
        </div>
        <div className="profile_update_picture d-flex align-items-center">
          <AccountAvatar
            source={accountInfo.user.avatar}
            backgroundColor={accountInfo.user.avatarColor}
            name={accountInfo.user.name}
            dimension={86}
            borderRadius={20}
            fontSize={32}
          />

          <div>
            <p className="profile_update-avatar">Your Avatar</p>
            <div className="profile_update-changeImg profile-upload-input">
              <span>
                <IconChangePic />
              </span>
              <Input
                type="file"
                name="file"
                onChange={this.onUploadImage}
                id="imageFile"
                accept="image/*"
              />
              Change Pic
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Row>
            <Col lg={10}>
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Full Name"
                  placeholder="Full Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <FormGroup className="py-1">
                <ZeedasPhoneInput
                  label="Phone Number"
                  placeholder="+(000) 811 0000 000"
                  type="text"
                  name="phone"
                  value={phone}
                  handleError={this.setPhoneNumberError}
                  onChange={this.onPhoneInputChange}
                />
              </FormGroup>
            </Col>
            <Col lg={5}>
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Email"
                  placeholder="email@companyname.com"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.onInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Date of Birth"
                  placeholder="03, May, 1896"
                  type="date"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={this.onInputChange}
                />
              </FormGroup>
            </Col>
            <Col lg={5}>
              <FormGroup className="py-1">
                <ZeedasInput
                  label="Address"
                  placeholder="57, Mike st, "
                  type="text"
                  name="address"
                  value={address}
                  onChange={this.onInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <FormGroup className="py-1">
                <Label className="default-input-label">Select Gender</Label>
                <SelectOption
                  label="gender"
                  value={gender}
                  name="gender"
                  options={GENDER_OPTIONS}
                  onChange={this.onSelectGenderChange}
                  placeholder="Select gender"
                  bgColor={colors.ZEEDAS_INPUT_GREY}
                  border={colors.ZEEDAS_INPUT_GREY}
                  placeholderColor={colors.ZEEDAS_INPUT_GREY}
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
                  isLoading={fetchingCountries}
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
                style={{
                  marginTop: "30px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  width: "162px",
                }}
                onClick={this.updateProfile}
                color="zd-blue"
                disabled={requesting || phoneNumberHasError}
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
  return {
    requesting: requests.requesting,
    accountInfo: users.accountInfo,
    countries: shared.countriesList,
    fetchingCountries: shared.fetchingCountries,
  };
}

export default connect(mapStateToProps)(ProfileUpdates);
