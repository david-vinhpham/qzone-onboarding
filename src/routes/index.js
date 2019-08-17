import Dashboard from '../layouts/Dashboard.jsx';
import Auth from '../layouts/Auth.jsx';

const indexRoutes = [
  { path: '/login', name: 'Auth', component: Auth },
  { path: '/register', name: 'Auth', component: Auth },
  { path: '/', name: 'Home', component: Dashboard },
];

export default indexRoutes;
