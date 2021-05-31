// icons
import OverviewIcon from "../zeedas-assets/images/nav-icons/overview.svg";
import ProjectsIcon from "../zeedas-assets/images/nav-icons/projects.svg";
// import TasksIcon from "../zeedas-assets/images/nav-icons/tasks.svg";
import WalletIcon from "../zeedas-assets/images/nav-icons/wallet.svg";

// pages
import Overview from "../pages/overview/index";
import Projects from "../pages/projects/index";
import Wallet from "../pages/wallet/index";
import TransactionHistory from "../pages/wallet/transaction-history/index";
import AddCard2 from "../pages/wallet/_components/add-card2";
import AllCards from "../pages/wallet/all-cards/index";
// import JulietsComponentsDemo from "../zeedas-components/Juliets-components-demo";
import TeamMemberProfile from "../pages/users/team-member-profile/index";
// import Kanban from "../pages/project/index2";
import Project from "../pages/project/index";
import ProjectMemberProfile from "../pages/project-teams/_components/project-member-profile";
import TeamsComponent from "../pages/users/teams/index";
import UserProfile from "../pages/users/user-profile/index";
import { APP_ROLES } from "../utils/constants";
import App from "../pages/app/index";

import DesktopAppDownload from "../pages/authentication/desktop-app-download";
import PersonalAccountSetup from "../pages/users/setup-personal-account";
import InviteTeamMembers from "../pages/users/invite-team-members";

const AppRoutes = [
  {
    path: "/overview",
    name: "Overview",
    icon: OverviewIcon,
    authorisedRoles: [APP_ROLES.OWNER, APP_ROLES.ADMIN],
    component: Overview,
  },

  {
    path: "/projects",
    name: "Projects",
    icon: ProjectsIcon,
    // component: Overview,
    component: Projects,
  },

  // {
  //   path: "/tasks",
  //   name: "Tasks",
  //   icon: TasksIcon,
  //   component: Overview,
  // },
  {
    path: "/wallet",
    name: "Wallet",
    icon: WalletIcon,
    authorisedRoles: [APP_ROLES.OWNER, APP_ROLES.ADMIN],
    component: Wallet,
  },
  {
    path: "/",
    pathTo: "/overview",
    name: "Overview",
    redirect: true,
  },
];

const OtherRoutes = [
  {
    path: "/team-member-profile/:accountId",
    name: "Team Member Profile",
    component: TeamMemberProfile,
  },
  {
    path: "/project-member-profile/:accountId",
    name: "Project Member Profile",
    component: ProjectMemberProfile,
  },
  {
    path: "/project/:projectId/:tab/:userRole?/:moduleId?",
    name: "Project",
    icon: ProjectsIcon,
    component: Project,
  },

  {
    path: "/app",
    name: "App",
    component: App,
  },

  {
    path: "/teams",
    name: "Teams",
    component: TeamsComponent,
  },
  {
    path: "/all-cards",
    name: "All Cards",
    component: AllCards,
  },
  {
    path: "/add-card",
    name: "Add Card",
    component: AddCard2,
  },
  {
    path: "/transaction-history",
    name: "Transaction History",
    component: TransactionHistory,
  },
  {
    path: "/user-profile",
    name: "Profile",
    component: UserProfile,
  },
  // {
  //   path: "/profile-update",
  //   name: "Profile Update",
  //   component: ProfileUpdates,
  // },
];


export { AppRoutes, OtherRoutes };
