import { toast } from "react-toastify";

const showNotificationForOffline = () => {
  toast.error("No Internet connection !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const showNotificationForOnline = () => {
  toast.success("Internet Connected", {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    role: "signOut",
  });
};

const showNotificationForRegisterSuccess = (success) => {
  toast.success(success, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    role: "signOut",
  });
};

const showNotificationForRegisterError = (error) => {
  toast.error(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const showNotificationForLoginSuccess = (success) => {
  toast.success(success, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    role: "signOut",
  });
};

const showNotificationForLoginError = (error) => {
  toast.error(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const showNotificationForLogoutSuccess = (success) => {
  toast.success(success, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    role: "signOut",
  });
};

export {
  showNotificationForOffline,
  showNotificationForOnline,
  showNotificationForRegisterSuccess,
  showNotificationForRegisterError,
  showNotificationForLoginSuccess,
  showNotificationForLoginError,
  showNotificationForLogoutSuccess,
};
