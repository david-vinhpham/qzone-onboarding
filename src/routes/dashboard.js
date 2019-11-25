import { lazy } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {
  BubbleChart, Email,
  FilterVintage, Star, Assignment, BarChart,
  Business, Navigation, Schedule,
  Category, BusinessCenter, People, Web, Person
} from '@material-ui/icons';
import Dashboard from '../views/Dashboard/Dashboard';

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
    component: lazy(() => import('../views/Organization/OrganizationList')),
    icon: BusinessCenter,
    iconColor: 'secondary',
    dataTestId: 'orgListNavLink',
  },
  {
    path: '/location/list',
    name: 'Locations',
    shortName: 'BL',
    component: lazy(() => import('../views/Location/LocationList')),
    icon: Navigation,
    iconColor: 'secondary',
    dataTestId: 'locationListNavLink',
  },
  {
    path: '/services/list',
    name: 'Manage Services',
    shortName: 'MS',
    component: lazy(() => import('../views/Services/ServicesList')),
    icon: Schedule,
    iconColor: 'secondary',
    dataTestId: 'serviceListNavLink',
  },
  {
    path: '/service-categories',
    name: 'Service Categories',
    shortName: 'SC',
    component: lazy(() => import('../views/ServiceCategories/ServiceCategoriesList')),
    icon: Category,
    iconColor: 'secondary',
    dataTestId: 'sCategoryNavLink',
  },
  {
    path: '/business-categories',
    name: 'Business Categories',
    shortName: 'BC',
    component: lazy(() => import('../views/BusinessCategories/BusinessCategoriesList')),
    icon: Business,
    iconColor: 'secondary',
    dataTestId: 'bCategoryNavLink',
  },
  {
    path: '/provider/list',
    name: 'Provider Details',
    shortName: 'PD',
    component: lazy(() => import('../views/Provider/ProviderList')),
    icon: People,
    iconColor: 'secondary',
    dataTestId: 'providerListNavLink',
  },
  {
    path: '/email-templates',
    name: 'Email Templates',
    shortName: 'ET',
    icon: Email,
    component: lazy(() => import('../views/EmailTemplates/EmailTemplates')),
    dataTestId: 'emailTemplatesNavLink',
    iconColor: 'secondary',
  },
  {
    path: '/assessments',
    name: 'Assessments',
    shortName: 'AS',
    icon: Assignment,
    component: lazy(() => import('views/Surveys/Assessments')),
    dataTestId: 'assessmentsNavLink',
    iconColor: 'secondary'
  },
  {
    path: '/business-admin/list',
    name: 'Business admin',
    shortName: 'BA',
    component: lazy(() => import('../views/BusinessAdmins/BusinessAdminList')),
    icon: BusinessCenter,
    iconColor: 'secondary',
    dataTestId: 'businessAdminListNavLink',
  },
];

const operationRoutes = [
  {
    path: '/customer-service',
    name: 'Customer Service',
    shortName: 'PD',
    icon: FilterVintage,
    component: lazy(() => import('../views/CustomerService/CustomerService')),
    dataTestId: 'customerServiceNavLink',
    iconColor: 'primary',
  },
  {
    path: '/calendar',
    name: 'Manage Calendar',
    shortName: 'MC',
    icon: BubbleChart,
    component: lazy(() => import('../views/Calendar/ManageCalendar')),
    dataTestId: 'calendarNavLink',
    iconColor: 'primary',
  },
  {
    path: '/tmp-services',
    name: 'Temporary Services',
    shortName: 'TS',
    icon: Star,
    component: lazy(() => import('../views/TmpServices/TmpServicesList')),
    dataTestId: 'tmpServicesNavLink',
    iconColor: 'primary',
  },
  {
    path: '/chart',
    name: 'Chart',
    shortName: 'CH',
    icon: BarChart,
    component: lazy(() => import('views/Chart/ChartBoard')),
    dataTestId: 'chartNavLink',
    iconColor: 'primary',
  },
  {
    path: '/reports',
    name: 'Reports',
    shortName: 'RP',
    icon: Web,
    component: lazy(() => import('views/Reports/Reports')),
    dataTestId: 'reportsNavLink',
    iconColor: 'primary',
  },
]

const otherRoutes = [
  {
    path: '/location/edit/:id',
    name: 'Location Edit',
    component: lazy(() => import('../views/Location/LocationEdit')),
  },
  {
    path: '/location/create',
    name: 'Location Create',
    component: lazy(() => import('../views/Location/LocationCreate')),
  },
  {
    path: '/provider/create',
    name: 'Provider Create',
    component: lazy(() => import('../views/Provider/ProviderCreate')),
  },
  {
    path: '/provider/edit/:id',
    name: 'Provider Edit',
    component: lazy(() => import('../views/Provider/ProviderEdit')),
  },
  {
    path: '/organization/create',
    name: 'Create Organization',
    component: lazy(() => import('../views/Organization/OrganizationCreate')),
  },
  {
    path: '/organization/edit/:id',
    name: 'Organization Edit',
    component: lazy(() => import('../views/Organization/OrganizationEdit.jsx')),
  },
  {
    path: '/services/create',
    name: 'Create Services',
    component: lazy(() => import('../views/Services/ServiceCreate')),
  },
  {
    path: '/service/edit/:id',
    name: 'Service Edit',
    component: lazy(() => import('../views/Services/ServiceEdit')),
  },
  {
    path: '/register',
    name: 'Register Page',
    shortName: 'Register',
    mini: 'RP',
    component: lazy(() => import('../views/Auth/RegisterPage')),
  },
  {
    path: '/email-templates/edit/:id',
    name: 'Edit Email Template',
    shortName: 'Edit Email Template',
    component: lazy(() => import('../views/EmailTemplates/EditEmailTemplate')),
  },
  {
    path: '/email-templates/create',
    name: 'Create Email Template',
    shortName: 'Create Template',
    component: lazy(() => import('../views/EmailTemplates/CreateEmailTemplate')),
  },
  {
    path: '/availability/detail/:id',
    name: 'Availability Detail',
    shortName: 'Availability Detail',
    component: lazy(() => import('../views/AvailabilitySlots/AvailabilitySlotsList')),
  },
  {
    path: '/schedule-report/detail/:id',
    name: 'Schedule Report Detail',
    shortName: 'Schedule Report Detail',
    component: lazy(() => import('../views/ScheduleReport/ScheduleReportList')),
  },
  {
    path: '/assessments/new',
    name: 'Create new assessment',
    shortName: 'Create new assignment',
    component: lazy(() => import('views/Surveys/CreateAssessment')),
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
  component: lazy(() => import('../views/Profile/profile')),
  icon: Person,
  iconColor: 'error',
  dataTestId: 'profileNavLink',
};

const adminRoutes = [
  '/business-admin/list'
]

export {
  dashboardRoutes, otherRoutes, providerRoutes,
  profileRouteComponent, managementRoutes, operationRoutes, adminRoutes
};
