import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './pages/Login/index.tsx';
import HomePage from './pages/Home/index.tsx';
import SettingsPage from './pages/Settings/index.tsx';
import { useAppSelector } from './redux/hooks';
import { selectLoggedIn } from './pages/Login/slices';

const guestRouter = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <LoginPage />,
  },
]);

const userRouter = createBrowserRouter([
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <HomePage />,
  },
]);

function App() {
  const loggedIn = useAppSelector(selectLoggedIn);
  return <RouterProvider router={loggedIn ? userRouter : guestRouter} />;
}

export default App;
