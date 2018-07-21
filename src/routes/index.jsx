import Dashboard from "layouts/Dashboard.jsx";
import Pages from "layouts/Pages.jsx";

var indexRoutes = [
  { path: '/login', name: "Pages", component: Pages },
  { path: '/register', name: "Pages", component: Pages },
  { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;
