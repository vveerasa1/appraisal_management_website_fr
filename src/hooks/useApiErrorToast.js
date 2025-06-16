import { useEffect } from 'react';
import { showErrorToast } from '../utils/toast';


export function useApiErrorToast(isError, error, defaultMessage) {
  useEffect(() => {
    if (isError) {
      const message =
        error?.data?.message || error?.message || defaultMessage;
      showErrorToast(message);
    }
  }, [isError, error, defaultMessage]);
}
