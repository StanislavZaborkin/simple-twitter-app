import FooterTab from '../FooterTab';

import { ROUTES } from '../../constants/routes.ts';

import styles from './Footer.module.css';

const TABS = [
  {
    label: 'Home',
    path: ROUTES.HOME,
  },
  {
    label: 'Settings',
    path: ROUTES.SETTINGS,
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {TABS.map((tab) => (
        <FooterTab key={tab.label} {...tab} />
      ))}
    </footer>
  );
};

export default Footer;
