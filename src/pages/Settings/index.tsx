import styles from './Settings.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectUser } from '../Login/slices';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes.ts';
import { Button } from '@mui/material';

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onLogoutCLick = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
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
