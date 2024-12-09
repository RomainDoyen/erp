import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export function showToastSuccess(message: string) {
  toast.success(message, toastConfig);
}

export function showToastError(message: string) {
  toast.error(message, toastConfig);
}

export const toastErrorConfig: ToastOptions = {
  ...toastConfig,
  type: "error",
};

export const toastSuccessConfig: ToastOptions = {
  ...toastConfig,
  type: "success",
};

export const toastWarningConfig: ToastOptions = {
  ...toastConfig,
  type: "warning",
};