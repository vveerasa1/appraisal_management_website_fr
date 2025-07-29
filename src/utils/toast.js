import { toast } from 'react-toastify';

export const showSuccessToast = (message) => {
  console.log(message,'message')
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast.info(message);
};

export const showWarningToast = (message) => {
  toast.warning(message);
};
