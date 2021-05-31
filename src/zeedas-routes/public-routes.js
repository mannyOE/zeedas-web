import Authlayout from "../zeedas-layouts/auth-layout";

const publicRoutes = [
  { path: "/authentication", name: "Authentication", component: Authlayout },
  { path: "/:company_name/authentication", name: "Authentication", component: Authlayout },
];

export default publicRoutes;
