import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';
import DetailPage from './pages/Detail';
import Footer from './components/Footer';

import { useAppSelector } from './redux/hooks';

import { selectLoggedIn } from './pages/Login/slices';

import { ROUTES } from './constants/routes.ts';

import styles from './App.module.css';

const guestRoutes = (
  <>
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route path="*" element={<LoginPage />} />
  </>
);

const userRoutes = (
  <>
    <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={`${ROUTES.DETAIL}/:id`} element={<DetailPage />} />
    <Route path="*" element={<HomePage />} />
  </>
);

function App() {
  const loggedIn = useAppSelector(selectLoggedIn);

  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <Routes>{loggedIn ? userRoutes : guestRoutes}</Routes>
        {loggedIn && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
