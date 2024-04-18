import { BrowserRouter, Routes } from 'react-router-dom';

import Footer from './components/Footer';

import { useAppSelector } from './redux/hooks';

import { selectLoggedIn } from './pages/Login/slices';

import userRoutes from './navigation/userRoutes.tsx';
import guestRoutes from './navigation/guestRoutes.tsx';

import styles from './App.module.css';

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
