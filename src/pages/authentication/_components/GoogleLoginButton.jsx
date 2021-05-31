import React from "react";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { GOOGLE_OAUTH_CLIENT_ID } from "../../../utils/constants";
import ButtonIconLeft from "../../../zeedas-components/button-icon-left";
import colors  from 'utils/colors';

const GoogleLoginButton = ({
  onGoogleLoginResponse,
  buttonText,
  company,
  noCompanyCallback,
}) => (
  <GoogleLogin
    clientId={GOOGLE_OAUTH_CLIENT_ID}
    buttonText={buttonText}
    onSuccess={onGoogleLoginResponse}
    onFailure={onGoogleLoginResponse}
    cookiePolicy="single_host_origin"
    prompt="consent"
    render={(renderProps) => (
      <ButtonIconLeft
        onClick={renderProps.onClick}
        // onClick={company === "" ? noCompanyCallback : renderProps.onClick}
        // disabled={renderProps.disabled}
        icon={<FcGoogle size={30} />}
        text={buttonText}
        fontColor={colors.ZEEDAS_BLUE_INVERSE}
        color="zd-white"
        width="100%"
        borderRadius={"5px"}
        boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
      />
    )}
  />
);

export default GoogleLoginButton;
