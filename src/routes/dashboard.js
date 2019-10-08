import DashboardIcon from '@material-ui/icons/Dashboard';
import {
  BubbleChart, Email,
  FilterVintage, Star, Assignment, BarChart,
  Business, Navigation, Schedule,
  Category, BusinessCenter, People, Web, Person
} from '@material-ui/icons';
import Dashboard from '../views/Dashboard/Dashboard';
import Administration from '../views/Administration/Administration';
import OrganizationCreate from '../views/Organization/OrganizationCreate';
import OrganizationEdit from '../views/Organization/OrganizationEdit';
import OrganizationList from '../views/Organization/OrganizationList';
import ManageCalendar from '../views/Calendar/ManageCalendar';
import CustomerService from '../views/CustomerService/CustomerService';
import Profile from '../views/Profile/profile';

import ProviderList from '../views/Provider/ProviderList';
import ProviderCreate from '../views/Provider/ProviderCreate';
import ProviderEdit from '../views/Provider/ProviderEdit';

import ServicesList from '../views/Services/ServicesList';
import ServiceCreate from '../views/Services/ServiceCreate';
import ServiceEdit from '../views/Services/ServiceEdit';

import LocationList from '../views/Location/LocationList';
import LocationCreate from '../views/Location/LocationCreate';
import LocationEdit from '../views/Location/LocationEdit';

import RegisterPage from '../views/Auth/RegisterPage';

import EmailTemplates from '../views/EmailTemplates/EmailTemplates';
import EditEmailTemplate from '../views/EmailTemplates/EditEmailTemplate';
import CreateEmailTemplate from '../views/EmailTemplates/CreateEmailTemplate';
import TmpServicesList from '../views/TmpServices/TmpServicesList';
import BusinessCategoriesList from '../views/BusinessCategories/BusinessCategoriesList';
import ServiceCategoriesList from '../views/ServiceCategories/ServiceCategoriesList';
import AvailabilitySlotsList from '../views/AvailabilitySlots/AvailabilitySlotsList';
import ScheduleReportList from "../views/ScheduleReport/ScheduleReportList";
import CreateAssessment from 'views/Surveys/CreateAssessment';
import Assessments from 'views/Surveys/Assessments';
import ChartBoard from 'views/Chart/ChartBoard';
import Reports from 'views/Reports/Reports';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    dataTestId: 'dashboardNavLink',
  },
  { redirect: true, path: '/', pathTo: '/login', name: 'Login' }
];

const managementRoutes = [
  {
    path: '/organization/list',
    name: 'Organization',
    shortName: 'OL',
    component: OrganizationList,
    icon: BusinessCenter,
    iconColor: 'secondary',
    dataTestId: 'orgListNavLink',
  },
  {
    path: '/location/list',
    name: 'Locations',
    shortName: 'BL',
    component: LocationList,
    icon: Navigation,
    iconColor: 'secondary',
    dataTestId: 'locationListNavLink',
  },
  {
    path: '/services/list',
    name: 'Manage Services',
    shortName: 'MS',
    component: ServicesList,
    icon: Schedule,
    iconColor: 'secondary',
    dataTestId: 'serviceListNavLink',
  },
  {
    path: '/service-categories',
    name: 'Service Categories',
    shortName: 'SC',
    component: ServiceCategoriesList,
    icon: Category,
    iconColor: 'secondary',
    dataTestId: 'sCategoryNavLink',
  },
  {
    path: '/business-categories',
    name: 'Business Categories',
    shortName: 'BC',
    component: BusinessCategoriesList,
    icon: Business,
    iconColor: 'secondary',
    dataTestId: 'bCategoryNavLink',
  },
  {
    path: '/provider/list',
    name: 'Provider Details',
    shortName: 'PD',
    component: ProviderList,
    icon: People,
    iconColor: 'secondary',
    dataTestId: 'providerListNavLink',
  },
  {
    path: '/email-templates',
    name: 'Email Templates',
    shortName: 'ET',
    icon: Email,
    component: EmailTemplates,
    dataTestId: 'emailTemplatesNavLink',
    iconColor: 'secondary',
  },
  {
    path: '/assessments',
    name: 'Assessments',
    shortName: 'AS',
    icon: Assignment,
    component: Assessments,
    dataTestId: 'assessmentsNavLink',
    iconColor: 'secondary'
  },
];

const operationRoutes = [
  {
    path: '/customer-service',
    name: 'Customer Service',
    shortName: 'PD',
    icon: FilterVintage,
    component: CustomerService,
    dataTestId: 'customerServiceNavLink',
    iconColor: 'primary',
  },
  {
    path: '/calendar',
    name: 'Manage Calendar',
    shortName: 'MC',
    icon: BubbleChart,
    component: ManageCalendar,
    dataTestId: 'calendarNavLink',
    iconColor: 'primary',
  },
  {
    path: '/tmp-services',
    name: 'Temporary Services',
    shortName: 'TS',
    icon: Star,
    component: TmpServicesList,
    dataTestId: 'tmpServicesNavLink',
    iconColor: 'primary',
  },
  {
    path: '/chart',
    name: 'Chart',
    shortName: 'CH',
    icon: BarChart,
    component: ChartBoard,
    dataTestId: 'chartNavLink',
    iconColor: 'primary',
  },
  {
    path: '/reports',
    name: 'Reports',
    shortName: 'RP',
    icon: Web,
    component: Reports,
    dataTestId: 'reportsNavLink',
    iconColor: 'primary',
  },
]

const otherRoutes = [
  {
    path: '/location/edit/:id',
    name: 'Location Edit',
    component: LocationEdit
  },
  {
    path: '/location/create',
    name: 'Location Create',
    component: LocationCreate
  },
  {
    path: '/provider/create',
    name: 'Provider Create',
    component: ProviderCreate
  },
  {
    path: '/provider/edit/:id',
    name: 'Provider Edit',
    component: ProviderEdit
  },
  {
    path: '/organization/create',
    name: 'Create Organization',
    component: OrganizationCreate
  },
  {
    path: '/organization/edit/:id',
    name: 'Organization Edit',
    component: OrganizationEdit
  },
  {
    path: '/services/create',
    name: 'Create Services',
    component: ServiceCreate
  },
  {
    path: '/service/edit/:id',
    name: 'Service Edit',
    component: ServiceEdit
  },
  {
    path: '/administration',
    name: 'Administration',
    component: Administration
  },
  {
    path: '/provider/card',
    name: 'Provider Card',
    component: ProviderList
  },
  {
    path: '/organization/edit',
    name: 'Business Edit',
    component: OrganizationEdit
  },
  {
    path: '/register',
    name: 'Register Page',
    shortName: 'Register',
    mini: 'RP',
    component: RegisterPage
  },
  {
    path: '/email-templates/edit/:id',
    name: 'Edit Email Template',
    shortName: 'Edit Email Template',
    component: EditEmailTemplate
  },
  {
    path: '/email-templates/create',
    name: 'Create Email Template',
    shortName: 'Create Template',
    component: CreateEmailTemplate
  },
  {
    path: '/tmp-services',
    name: 'Temporary Services',
    shortName: 'Temporary Services',
    component: TmpServicesList
  },
  {
    path: '/availability/detail/:id',
    name: 'Availability Detail',
    shortName: 'Availability Detail',
    component: AvailabilitySlotsList
  },
  {
    path: '/schedule-report/detail/:id',
    name: 'Schedule Report Detail',
    shortName: 'Schedule Report Detail',
    component: ScheduleReportList
  },
  {
    path: '/assessments/new',
    name: 'Create new assessment',
    shortName: 'Create new assignment',
    component: CreateAssessment,
  },
];

const providerRoutes = [
  '/calendar', '/profile', '/dashboard',
  '/tmp-services', '/availability/detail/:id', '/schedule-report/detail/:id',
  '/customer-service'
];

const profileRouteComponent = {
  path: '/profile',
  name: 'Profile',
  component: Profile,
  icon: Person,
  iconColor: 'error',
  dataTestId: 'profileNavLink',
};

export {
  dashboardRoutes, otherRoutes, providerRoutes,
  profileRouteComponent, managementRoutes, operationRoutes
};
