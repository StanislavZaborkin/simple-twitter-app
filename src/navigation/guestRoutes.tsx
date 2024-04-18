import { Route } from 'react-router-dom';

import LoginPage from '../pages/Login';

import { ROUTES } from '../constants/routes.ts';

export default (
  <>
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route path="*" element={<LoginPage />} />
  </>
);
