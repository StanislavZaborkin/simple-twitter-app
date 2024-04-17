import { Slide, toast } from 'react-toastify';

interface TProps {
  text?: string;
  endless?: boolean;
  type?: 'error' | 'success' | 'warning';
}

export default ({ text, type, endless }: TProps) => {
  toast.dismiss();
  toast[type ?? 'success'](text, {
    draggable: true,
    transition: Slide,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: true,
    position: 'top-center',
    closeButton: !!endless,
    autoClose: !endless ? 2500 : false,
  });
};
