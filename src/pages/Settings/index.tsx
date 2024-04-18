import { useNavigate } from 'react-router';

import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { logout, selectUser } from '../Login/slices';

import { removeToken } from '../../api';

import { ROUTES } from '../../constants/routes.ts';

import styles from './Settings.module.css';

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onLogoutCLick = () => {
    if (window.confirm('Are you are you want to logout?')) {
      dispatch(logout());
      removeToken();
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <div className={styles.settingsWrapper}>
      <h2>User Info</h2>
      <div className={styles.userInfoBox}>
        <div>
          <p>Username: {user?.username ?? ''}</p>
          <p>ID: {user?.id ?? ''}</p>
        </div>
      </div>
      <Button variant="outlined" onClick={onLogoutCLick}>
        Logout
      </Button>
    </div>
  );
};

export default SettingsPage;
