import { AuthLogin, loginRequest, selectLoading } from './slices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.css';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const initialValues: AuthLogin = { username: '', password: '' };

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

  const onSubmit = (v: AuthLogin) => {
    dispatch(loginRequest(v));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
          Submit
        </LoadingButton>
      </form>
    </div>
  );
};

export default LoginPage;
