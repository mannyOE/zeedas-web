import CompanySignUp from "../pages/authentication/company-signup/index";
import Login from "../pages/authentication/login/index";
import CompanyName from "../pages/authentication/company-name/index";
import CompanySubdomain from "../pages/authentication/company-subdomain/index";
import EmailVerification from "../pages/authentication/email-verification/index";
import UserSignUp from "../pages/authentication/user-signup/index";
import ForgotPassword from "../pages/authentication/forgot-password/index";
import ResetPassword from "../pages/authentication/reset-password/index";
import ConfirmAccount from "../pages/authentication/confirm-account/index";
import DesktopAppDownload from "../pages/authentication/desktop-app-download/index";
import SlackAuth from "../pages/authentication/slack-auth/index";
import DownloadDesktopApp from "../pages/authentication/download-desktop-app/index";

const authRoutes = [
  {
    path: "/authentication/login",
    pathTo: "/authentication/company-name",
    name: "No Company Redirect",
    redirect: true,
  },
  {
    path: "/authentication/company-signup",
    name: "Company Sign Up",
    icon: "mdi mdi-account-key",
    component: CompanySignUp,
  },
  {
    path: "/authentication/company-name",
    name: "Company Name",
    icon: "mdi mdi-account-key",
    // component: CompanyName,
    component: CompanySubdomain,
    verifySubdomain: true,
  },
  {
    path: "/:company_name/authentication/login",
    name: "Login",
    icon: "mdi mdi-account-key",
    component: Login,
  },
  {
    path: "/authentication/confirm-account",
    name: "Login",
    icon: "mdi mdi-account-key",
    component: ConfirmAccount,
  },
  {
    path: "/authentication/email-verification",
    name: "Email Verification",
    icon: "mdi mdi-account-key",
    component: EmailVerification,
  },
  {
    path: "/authentication/:team_name/user-signup",
    name: "User Signup",
    icon: "mdi mdi-account-key",
    component: UserSignUp,
  },
  {
    path: "/authentication/forgot-password",
    name: "Forgot Password",
    icon: "mdi mdi-account-key",
    component: ForgotPassword,
  },
  {
    path: "/authentication/reset-password",
    name: "Reset Password",
    icon: "mdi mdi-account-key",
    component: ResetPassword,
  },
  {
    path: "/authentication/confirm-invite/",
    name: "Confirm Invite",
    icon: "mdi mdi-account-key",
    component: UserSignUp,
  },
  {
    path: "/authentication/download-desktop-app/",
    name: "Download Desktop App",
    icon: "mdi mdi-account-key",
    component: DesktopAppDownload,
  },
  {
    path: "/authentication/slack-auth",
    name: "Authenticate with Slack",
    icon: "mdi mdi-account-key",
    component: SlackAuth,
  },
  {
    path: "/authentication/download-desktop-app",
    name: "Download Desktop App",
    icon: "mdi mdi-account-key",
    component: DownloadDesktopApp,
  },
];

export default authRoutes;
