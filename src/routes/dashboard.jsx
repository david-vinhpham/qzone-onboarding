import DashboardIcon from "@material-ui/icons/Dashboard";
import {  Person,
          ContentPaste,
          BusinessCenter,
          Report,
          BubbleChart,
          LocationOn,
        } from "@material-ui/icons";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import Administration from "views/Administration/Administration.jsx";
import BusinessDetails from "views/BusinessDetails/BusinessDetails.jsx";
import BusinessEdit from "views/BusinessDetails/BusinessEdit.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import CustomerFlow from "views/CustomerFlow/CustomerFlow.jsx";
import ProviderDetails from "views/Provider/ProviderDetails.jsx";
import ProviderCreate from "views/Provider/ProviderCreate.jsx";
import ProviderEdit from "views/Provider/ProviderEdit.jsx";
import Reports from "views/Reports/Reports.jsx";
import ServicesList from "views/Services/ServicesList.jsx";
import ServiceCreate from "views/Services/ServiceCreate.jsx";


export const dashboardRoutes = [
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
  { redirect: true, path: "/", pathTo: "/login", name: "Login" }
];

export const otherRoutes=[
  {
    path: "/provider/create",
    name: "Provider Create",
    icon: Person,
    component: ProviderCreate
  },
  {
    path: "/provider/edit/:id",
    name: "Provider Edit",
    icon: Person,
    component: ProviderEdit
  },
  {
    path: "/business_details",
    name: "Update Business Details",
    icon: BusinessCenter,
    component: BusinessDetails
  },
  {
    path: "/services/list",
    name: "Manage Services",
    icon: ContentPaste,
    component: ServicesList
  },
  {
    path: "/services/create",
    name: "Create Services",
    icon: ContentPaste,
    component: ServiceCreate
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
  {
    path: "/business/edit",
    name: "Business Edit",
    icon: BusinessCenter,
    component: BusinessEdit
  },
]
