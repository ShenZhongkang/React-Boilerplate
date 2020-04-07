import HomePage from 'containers/homepage/loadable';
import NotFound from 'containers/notFound/loadable';
import FeaturePage from 'containers/feature/loadable';
import FeatureCreate from 'containers/feature/create/loadable';
import FeatureEdit from 'containers/feature/edit/loadable';

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage,
    exact: true
  },
  {
    path: '/feature',
    name: 'feature',
    component: FeaturePage,
    exact: true
  },
  {
    path: '/feature/create',
    name: 'create-feature',
    component: FeatureCreate
  },
  {
    path: '/feature/edit',
    name: 'edit-feature',
    component: FeatureEdit
  },
  {
    name: 'not-found',
    component: NotFound
  }
];

export default routes;
