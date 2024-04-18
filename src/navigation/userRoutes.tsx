import { Route } from 'react-router-dom';

import HomePage from '../pages/Home';
import DetailPage from '../pages/Detail';
import SettingsPage from '../pages/Settings';

import { ROUTES } from '../constants/routes.ts';

export default (
  <>
    <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={`${ROUTES.DETAIL}/:id`} element={<DetailPage />} />
    <Route path="*" element={<HomePage />} />
  </>
);
