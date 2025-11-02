import { toast, Bounce, ToastPosition } from "react-toastify";
import { ToastType } from "../ui/layout/MainLayout";

export const toastConfig = (toastData: ToastType) => {
  const { toastMessage, toastType } = toastData;

  const options = {
    position: "top-right" as ToastPosition,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  switch (toastType) {
    case "success":
      return toast.success(toastMessage, options);
    case "error":
      return toast.error(toastMessage, options);
    case "warn":
      return toast.warn(toastMessage, options);
    default:
      return toast.info(toastMessage, options);
  }
};