import { useLocation, useNavigate } from 'react-router';

import styles from './FooterTab.module.css';

interface FooterTabProps {
  label: string;
  path: string;
}

const FooterTab = ({ label, path }: FooterTabProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.footerTab} ${location.pathname.includes(path) ? `${styles.activeTab}` : ''}`}>
      <h4>{label}</h4>
    </div>
  );
};

export default FooterTab;
