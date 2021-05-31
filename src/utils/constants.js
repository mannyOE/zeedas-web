import { appConstants } from "../constants/app.constants";
import activityCompletedIcon from "../zeedas-assets/icons/icon-activity-completed.svg";

export const APP_DOMAIN = "https://qa.zeedas.com";

// API SERVICES CONSTANTS
export const USER_MGT = "user-management";
export const KANBAN_WORKS = "kanban-work";
export const PROJECT = "project-service";

// API ENDPOINTS CONSTANTS
export const AUTH_BASE_URL = process.env.REACT_APP_BASE_URL;

export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/zeedas/upload";
export const CLOUDINARY_RES_URL = "https://res.cloudinary.com/zeedas";

export const AUTH_LOGIN = "/auth/login";
export const AUTH_SIGNUP = "/auth/signup";
export const AUTH_FORGOT_PASSWORD = "/auth/forgot-password";
export const AUTH_RESET_PASSWORD = "/auth/reset-password";
export const AUTH_VERIFY_ACCOUNT = "/auth/verify-account";
export const AUTH_VERIFY_COMPANY = "/auth/verify-company";
export const AUTH_GOOGLE_LOGIN = "/auth/login-with-google";
export const AUTH_GOOGLE_SIGNUP = "/auth/register-with-google";
export const AUTH_SLACK_LOGIN = "/auth/login-with-slack";
export const AUTH_SLACK_SIGNUP = "/auth/register-with-slack";
export const AUTH_RESEND_VERIFICATION = "/auth/resend-verification";
export const AUTH_RECOVER_TEAMS = "/auth/recover-teams";

export const USERS_SEND_INVITE = `/${USER_MGT}/invites/send-invite`;
export const USERS_CONFIRM_INVITE = `/${USER_MGT}/invites/confirm-invite`;
export const USERS_ACCEPT_INVITE = `/${USER_MGT}/invites/accept-invite`;
export const USERS_GET_INVITES = `/${USER_MGT}/invites/list-invites`;
export const USERS_GET_ROLES = `/${USER_MGT}/invites/list-member-roles`;
export const USERS_GET_TEAM_MEMBER_DETAILS = `/${USER_MGT}/user/team-member`;
export const USERS_GET_ACCOUNT_DETAILS = `/${USER_MGT}/user/me`;
export const USERS_ENABLE_TEAM_MEMBER = `/${USER_MGT}/user/enable`;
export const USERS_DISABLE_TEAM_MEMBER = `/${USER_MGT}/user/disable`;
export const USERS_DELETE_TEAM_MEMBER = `/${USER_MGT}/user/delete`;
export const USERS_GET_TEAM_MEMBERS = `/${USER_MGT}/user/list-team`;
export const USERS_UPDATE_PASSWORD = `/${USER_MGT}/user/update-password`;
export const USERS_SET_SOCIAL_PASSWORD = `/${USER_MGT}/user/set-password`;
export const USERS_UPDATE_USER = `/${USER_MGT}/user/update`;
export const USERS_UPDATE_AVATAR = `/${USER_MGT}/user/update-avatar`;
export const USERS_SKIP_INVITES = `/${USER_MGT}/user/skip-invites`;
export const USERS_FINISH_ACCOUNT_SETUP = `/${USER_MGT}/user/finish-account`;
export const USERS_UPDATE_COMPANY_INFO = `/${USER_MGT}/user/update-company-info`;
export const USERS_UPDATE_COMPANY_AVATAR = `/${USER_MGT}/user/update-company-avatar`;
export const USERS_SET_FIREBASE_TOKEN = `/${USER_MGT}/user/set-firebase-token`;

export const PROJECT_SERVICE = "/project-service/project";
export const MODULE_LIST = `${AUTH_BASE_URL}/${KANBAN_WORKS}/module/fetch`;
export const MODULE_CREATE = `${AUTH_BASE_URL}/${KANBAN_WORKS}/module/new`;
export const MODULE_UPDATE = `${AUTH_BASE_URL}/${KANBAN_WORKS}/module/update`;
export const MODULE_DELETE = `${AUTH_BASE_URL}/${KANBAN_WORKS}/module/delete`;
export const MODULE_STATS = `${AUTH_BASE_URL}/${KANBAN_WORKS}/module/stats`;
export const MODULE_PUBLISH = `${AUTH_BASE_URL}/${KANBAN_WORKS}/module/publish`;

export const TEST_CASES_LIST = `${AUTH_BASE_URL}/${KANBAN_WORKS}/test-case/fetch`;
export const TEST_CASE_CREATE = `${AUTH_BASE_URL}/${KANBAN_WORKS}/test-case/add`;
export const TEST_CASE_UPDATE = `${AUTH_BASE_URL}/${KANBAN_WORKS}/test-case/update`;
export const TEST_CASE_DELETE = `${AUTH_BASE_URL}/${KANBAN_WORKS}/test-case/delete`;
export const TEST_CASES_PUBLISH = `${AUTH_BASE_URL}/${KANBAN_WORKS}/test-case/publish`;
export const TEST_CASES_STATS = `${AUTH_BASE_URL}/${KANBAN_WORKS}/test-case/stats`;

export const APP_SERVICE = "/project-service/apps";

export const APP_LIST = `${AUTH_BASE_URL}/${PROJECT}/apps`;

// GOOGLE_OAUTH_CLIENT_ID
export const GOOGLE_OAUTH_CLIENT_ID = "886451937670-igsufdtjp410k9au43s62evfqtc7gqpq.apps.googleusercontent.com";

export const SLACK_AUTH_URL = `https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email,identity.avatar&client_id=1196780566800.1166217898806&redirect_uri=${window.location.origin}/authentication/slack-auth`;
// SESSION CONSTANTS
export const APP_USER_SESSION_EXPIRED_MESSAGE = "Your session has expired!";
export const APP_INTERNET_CONNECTION_MESSAGE = "Please Check your internet connectivity";

// RESPONSE CONSTANTS
export const SUCCESS_RESPONSE = 1;
export const ERROR_RESPONSE = 2;

// variables in local storage
export const LOCAL_STORE_COMPANY = "local_storage_company";
export const LOCAL_STORE_TEMP_PAYLOAD = "local_storage_temp_payload";
export const LOCAL_STORE_REDIRECT_URL = "local_storage_redirect_url";

export const NO_COMPANY_MESSAGE_SLACK = "Enter your company name before signing up with Slack";
export const NO_COMPANY_MESSAGE_GOOGLE = "Enter your company name before signing up with Google";

export const EMAIL_NOT_CONFIRMED_RESPONSE = "Your account has not been confirmed. Please check your mail inbox";

export const APP_ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  QUALITY_ASSURANCE: "qa",
  ENTERPRISE_ARCHITECT: "ea",
  SOFTWARE_DEVELOPER: "sd",
  PROJECT_MANAGER: "pm",
};

export const PAGES_WITH_ROLES = {
  ROLES_OVERVIEW: [APP_ROLES.OWNER, APP_ROLES.ADMIN],
  ROLES_WALLET: [APP_ROLES.OWNER, APP_ROLES.ADMIN],
  ROLES_TEAM_PROFILE: [APP_ROLES.OWNER],
  ROLES_SETUP_PERSONAL_ACCOUNT: [APP_ROLES.OWNER],
};

export const PAGE_PATH = {
  PATH_OVERVIEW: "overview",
  PATH_WALLET: "wallet",
  PATH_PROJECTS: "projects",
  PATH_TEAM_PROFILE: "team-profile",
  PATH_SETUP_PERSONAL_ACCOUNT: "setup-personal-account",
};

// Config Constants
export const GITHUB_AUTH_LINK = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&response_type=code`;
export const BITBUCKET_AUTH_LINK = `https://bitbucket.org/site/oauth2/authorize?client_id=${process.env.REACT_APP_BITBUCKET_CLIENT_ID}&response_type=code`;
export const GITLAB_AUTH_LINK = `https://gitlab.com/oauth/authorize?client_id=${process.env.REACT_APP_GITLAB_CLIENT_ID}&redirect_uri=https://qa.zeedas.com/app&response_type=code`;
export const APP_NEED_OPTIONS = {
  repo: "repositories",
  server: "server config",
};
export const GIT_PROVIDER_REDIRECT_URI = `${APP_DOMAIN}/app`;

export const COUNTRIES_API = "https://restcountries.eu/rest/v2/all";

export const GENDER_OPTIONS = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
];

export const COUNTRY_OPTIONS = [
  { label: "Nigeria", value: "Nigeria" },
  { label: "Germany", value: "Germany" },
];

export const MODULE_STATUS = {
  in_progress: {
    title: "Planning",
    color: "",
    value: "in_progress",
  },
  backlog: {
    title: "Backlog",
    color: "",
    value: "backlog",
    status: "backlog",
    stage: "pending",
  },
  assigned: {
    title: "Assigned",
    color: "",
    value: "assigned",
    status: "assigned",
    stage: "pending",
  },
  development: {
    title: "Development",
    color: "",
    value: "development",
  },
  in_review: {
    title: "In Review",
    color: "",
    value: "in_review",
  },
  done: {
    title: "Done",
    color: "",
    value: "done",
  },
};

export const MODULE_PHASES = {
  backlog: {
    status: "backlog", // backlog, assigned, ea_review, qa_review, in_progress, done
    stage: "pending",
    state: [null, "no-test", "has-test"],
  },
  assigned: {
    status: "assigned",
    stage: "pending",
    state: "has-test",
  },
  planning: {
    status: "in_progress",
    stage: "planning",
    state: "has-test",
  },
  development: {
    status: "in_progress",
    stage: "development",
    state: "has-test",
  },
  ea_review: {
    status: "ea_review",
    stage: "in_review",
    state: "ea-review",
  },
  qa_review: {
    status: "qa_review",
    stage: "in_review",
    state: "qa-review",
  },
  done: {
    status: "done",
    stage: "done",
    state: "done",
  },
};

export const MODULE_TEST_STATES = {
  backlog: {
    name: "Backlog",
    value: "no-test",
    color: "#A5A4A4",
  },
  published: {
    name: "Published",
    value: "has-test",
    color: "#e9b713",
  },
  review: {
    name: "Review",
    value: "qa-review",
    color: "#4DBD98",
  },
};

export const BASE_REFERRAL_LINK_URL = "https://qa.zeedas.com/ref?ref=";

export const PAGE_TITLES = {
  overview: "Overview",
  project: "Projects",
  wallet: "Wallet",
  team: "Teams",
};

export const KANBAN_FILTER_TYPE = {
  app: "app",
  user: "user",
};

export const COMMENT_TYPES = {
  dependency: "dependency",
  method: "method",
  complexity: "complexity",
  testCase: "test-case",
  class: "class",
  module: "module",
  codeFragment: "code-fragment",
};

export const COMPLEXITY_RATINGS = Array.from(
  { length: 10 }, (_, complexityIndex) => (
    {
      label: complexityIndex + 1,
      value: complexityIndex + 1,
    }
  ),
);

/*export const COMPLEXITY_RATINGS = [
  {
    label: 1,
    value: 1,
  },
  {
    label: 2,
    value: 2,
  },
  {
    label: 3,
    value: 3,
  },
  {
    label: 4,
    value: 4,
  },
  {
    label: 5,
    value: 5,
  },
  {
    label: 6,
    value: 6,
  },
  {
    label: 7,
    value: 7,
  },
  {
    label: 8,
    value: 8,
  },
  {
    label: 9,
    value: 9,
  },
  {
    label: 10,
    value: 10,
  },
];*/

export const DATA_TYPES = {
  int: "int",
  double: "double",
  float: "float",
  string: "string",
  array: "array",
  list: "list",
  object: "object",
};

export const PROJECT_FILTER_OPTIONS = [
  { label: "Date Created", value: "date_created" },
  { label: "Timeline", value: "timeline" },
  { label: "Team Members", value: "team_members" },
  { label: "Skills", value: "skills" },
];

export const PROJECT_SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export const ACTIVITY_ACTION_TYPES = {
  // comment: {
  //   icon: "",
  //   action: "Commented on",
  //   nextAction: "",
  // },
  "setup-complete": {
    icon: activityCompletedIcon,
    action: "Completed setup on the module",
    nextAction: "Complete setup",
  },
  "add-tests": {
    icon: activityCompletedIcon,
    action: "Added tests to the module",
    nextAction: "Add test cases",
  },
  "start-task": {
    icon: activityCompletedIcon,
    action: "Started the module",
    nextAction: "Start the task",
  },
  "submit-task": {
    icon: activityCompletedIcon,
    action: "Submitted the module",
    nextAction: "Submit the task",
  },
  "reject-task": {
    icon: activityCompletedIcon,
    action: "Rejected the module",
    nextAction: "Reject the task",
  },
  "accept-task": {
    icon: activityCompletedIcon,
    action: "Accepted the module",
    nextAction: "Accept the task",
  },
  "start-test": {
    icon: activityCompletedIcon,
    action: "Started tests on the module",
    nextAction: "Start testing",
  },
  "start-review": {
    icon: activityCompletedIcon,
    action: "Started review on the module",
    nextAction: "Start reviewing",
  },
  "finish-task": {
    icon: activityCompletedIcon,
    action: "Finished the module",
    nextAction: "Finish the task",
  },
  "assign-task": {
    icon: activityCompletedIcon,
    action: "Assigned the module to",
    nextAction: "Assign to developer",
  },
  unassigned: {
    icon: activityCompletedIcon,
    // action: "Unassigned the module from",
    action: "Unassigned the module",
    nextAction: "Unassign the module",
  },
  "started-development": {
    icon: activityCompletedIcon,
    action: "Started development on the module",
    nextAction: "Start development",
  },
  "started-planning": {
    icon: activityCompletedIcon,
    action: "Started planning on the module",
    nextAction: "Start planning",
  },
};
