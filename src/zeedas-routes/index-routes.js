import InviteTeamMembers from "pages/users/invite-team-members";
import PersonalAccountSetup from "pages/users/setup-personal-account";
import Authlayout from "../zeedas-layouts/auth-layout";
// eslint-disable-next-line import/no-cycle
import AppLayout from "../zeedas-layouts/app-layout";
import AppAlternativeLayout from "../zeedas-layouts/app-alt-layout/index";
import { APP_ROLES } from "utils/constants";

const indexRoutes = [
  { path: "/authentication", name: "Sign Up", component: Authlayout },
  { path: "/account-setup", name: "First Steps", component: AppAlternativeLayout },
  { path: "/", name: "Overview", component: AppLayout },
];

const accountSetupRoutes = [
  {
    path: "/account-setup/setup-personal-account",
    name: "Setup Personal Account",
    authorisedRoles: [APP_ROLES.OWNER],
    component: PersonalAccountSetup,
  },
  {
    path: "/account-setup/invite-team-members",
    name: "Invite Team Members",
    authorisedRoles: [APP_ROLES.OWNER],
    component: InviteTeamMembers,
  },
];

export { indexRoutes, accountSetupRoutes };

export default indexRoutes;
