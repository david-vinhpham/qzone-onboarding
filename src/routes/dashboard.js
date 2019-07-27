import DashboardIcon from '@material-ui/icons/Dashboard';
import {
  BubbleChart, BusinessCenter, Email, LocationOn, Person, PersonAdd, Report,
  // Assignment,
} from '@material-ui/icons';
import Dashboard from '../views/Dashboard/Dashboard';
import Profile from '../views/Profile/profile';
import Administration from '../views/Administration/Administration';
import OrganizationCreate from '../views/Organization/OrganizationCreate';
import OrganizationEdit from '../views/Organization/OrganizationEdit';
import OrganizationList from '../views/Organization/OrganizationList';
import ManageCalendar from '../views/Calendar/ManageCalendar';
import CustomerService from '../views/CustomerService/CustomerService';

import ProviderList from '../views/Provider/ProviderList';
import ProviderCreate from '../views/Provider/ProviderCreate';
import ProviderEdit from '../views/Provider/ProviderEdit';

import Reports from '../views/Reports/Reports';

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
import ServiceCategoriesList from '../views/ServiceCategories/ServiceCategoriesList';
import BusinessCategoriesList from '../views/BusinessCategories/BusinessCategoriesList';
import TmpServicesDetail from '../views/TmpServices/TmpServicesDetail';
import AvailabilitySlotsList from '../views/AvailabilitySlots/AvailabilitySlotsList';
// import Assessments from '../views/Surveys/Assessments';
// import CreateAssessment from '../views/Surveys/CreateAssessment';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: DashboardIcon,
    component: Profile
  },
  {
    path: '/customer-service',
    name: 'Customer service',
    icon: DashboardIcon,
    component: CustomerService
  },
  {
    path: '/reports',
    name: 'Reports',
    icon: Report,
    component: Reports
  },
  {
    path: '/calendar',
    name: 'Manage Calendar',
    icon: BubbleChart,
    component: ManageCalendar
  },
  {
    path: '/email-templates',
    name: 'Email Templates',
    icon: Email,
    guarded: true,
    component: EmailTemplates
  },
  { redirect: true, path: '/', pathTo: '/login', name: 'Login' }
];

const otherRoutes = [
  {
    path: '/location/edit/:id',
    name: 'Location Edit',
    icon: Person,
    component: LocationEdit
  },
  {
    path: '/location/create',
    name: 'Location Create',
    icon: LocationOn,
    component: LocationCreate
  },
  {
    path: '/location/list',
    name: 'Location List',
    icon: LocationOn,
    component: LocationList
  },
  {
    path: '/provider/create',
    name: 'Provider Create',
    icon: Person,
    component: ProviderCreate
  },
  {
    path: '/provider/edit/:id',
    name: 'Provider Edit',
    icon: Person,
    component: ProviderEdit
  },
  {
    path: '/organization/create',
    name: 'Create Organization',
    icon: BusinessCenter,
    component: OrganizationCreate
  },
  {
    path: '/organization/edit/:id',
    name: 'Organization Edit',
    icon: BusinessCenter,
    component: OrganizationEdit
  },
  {
    path: '/organization/list',
    name: 'Organization List',
    icon: BusinessCenter,
    component: OrganizationList
  },
  {
    path: '/services/list',
    name: 'Manage Services',
    icon: BusinessCenter,
    component: ServicesList
  },
  {
    path: '/services/create',
    name: 'Create Services',
    icon: BusinessCenter,
    component: ServiceCreate
  },
  {
    path: '/service/edit/:id',
    name: 'Service Edit',
    icon: BusinessCenter,
    component: ServiceEdit
  },
  {
    path: '/administration',
    name: 'Administration',
    icon: LocationOn,
    component: Administration
  },
  // {
  //   path: '/assessments/new',
  //   name: 'Create New Assessment',
  //   icon: Assignment,
  //   component: CreateAssessment,
  // },
  // {
  //   path: '/assessments',
  //   name: 'Assessments',
  //   icon: Assignment,
  //   component: Assessments,
  // },
  {
    path: '/provider/list',
    name: 'Provider Details',
    icon: Person,
    component: ProviderList
  },
  {
    path: '/provider/card',
    name: 'Provider Card',
    icon: Person,
    component: ProviderList
  },
  {
    path: '/organization/edit',
    name: 'Business Edit',
    icon: BusinessCenter,
    component: OrganizationEdit
  },
  {
    path: '/register',
    name: 'Register Page',
    short: 'Register',
    mini: 'RP',
    icon: PersonAdd,
    component: RegisterPage
  },
  {
    path: '/email-templates/edit/:id',
    name: 'Edit Email Template',
    short: 'Edit Email Template',
    component: EditEmailTemplate
  },
  {
    path: '/email-templates/create',
    name: 'Create Email Template',
    short: 'Create Template',
    component: CreateEmailTemplate
  },
  {
    path: '/tmp-services',
    name: 'Temporary Services',
    short: 'Temporary Services',
    component: TmpServicesList
  },
  {
    path: '/service-categories',
    name: 'List Service Categories',
    short: 'List Service Categories',
    component: ServiceCategoriesList
  },
  {
    path: '/business-categories',
    name: 'List Business Categories',
    short: 'List Business Categories',
    component: BusinessCategoriesList
  },
  {
    path: '/tmp-service/detail/:id',
    name: 'Temporary Service Detail',
    short: 'Temporary Service Detail',
    component: TmpServicesDetail
  },
  {
    path: '/availability',
    name: 'Availability',
    short: 'Availability',
    component: AvailabilitySlotsList
  }
];

const providerRoutes = ['/calendar', '/profile'];

export { dashboardRoutes, otherRoutes, providerRoutes };
