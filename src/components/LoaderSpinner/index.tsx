import { CircularProgress } from '@mui/material';

import styles from './LoaderSpinner.module.css';

interface LoaderSpinnerProps {
  show: boolean;
}

const LoaderSpinner = ({ show }: LoaderSpinnerProps) =>
  show ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : null;

export default LoaderSpinner;
