import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { AuthLogin, loginRequest, selectLoading } from './slices';

import loginValidationSchema from './schemas/loginValidationSchema.ts';

import { ROUTES } from '../../constants/routes.ts';

import styles from './Login.module.css';

const initialValues: AuthLogin = { username: '', password: '' };

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoading);

  const onSubmit = (v: AuthLogin) => {
    dispatch(
      loginRequest({
        ...v,
        callback: () => {
          navigate(ROUTES.HOME);
        },
      }),
    );
  };

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema: loginValidationSchema,
  });

  return (
    <div className={styles.formWrapper}>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          onBlur={formik.handleBlur}
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Password"
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <LoadingButton variant="outlined" type="submit" loading={loading}>
          Login
        </LoadingButton>
      </form>
    </div>
  );
};

export default LoginPage;
