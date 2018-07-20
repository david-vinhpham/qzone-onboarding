// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ContentPaste from "@material-ui/icons/ContentPaste";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Report from "@material-ui/icons/Report";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import Dashboard from "views/Dashboard/Dashboard.jsx";
import Administration from "views/Administration/Administration.jsx";
import BusinessDetails from "views/BusinessDetails/BusinessDetails.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import CustomerFlow from "views/CustomerFlow/CustomerFlow.jsx";
import ProviderDetails from "views/Provider/ProviderDetails.jsx";
import Reports from "views/Reports/Reports.jsx";
import Services from "views/Services/Services.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard    
  },
  {
    path: "/customer_flow",
    name: "Manage Customer Flow",
    icon: DashboardIcon,
    component: CustomerFlow    
  },
  {
    path: "/business_details",
    name: "Update Business Details",
    icon: BusinessCenter,
    component: BusinessDetails
  },
  {
    path: "/services",
    name: "Manage Services",
    icon: ContentPaste,
    component: Services
  },
  {
    path: "/reports",
    name: "Reports",
    icon: Report,
    component: Reports
  },
  {
    path: "/calendar",
    name: "Manage Calendar",
    icon: BubbleChart,
    component: Calendar
  },
  {
    path: "/administration",
    name: "Administration",
    icon: LocationOn,
    component: Administration

  },
  {
    path: "/provider/list",
    name: "Provider Details",
    icon: Person,
    component: ProviderDetails
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
  
];

export default dashboardRoutes;
