import HomePage from "./components/Home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenCookie } from "./Context/CookieGet";
import SignupPage from "./components/SignUp/SignupPage";
import Navbar from "./components/NavBar/Navbar";
import LoginPage from "./components/Login/LoginPage";
import Footer from "./components/NavBar/Footer";
import SendOTP from "./components/SendOtp/OtpSend";
import OtpVerification from "./components/VerifyOtp/verifyOtp";
import UserDetailsUpdate from "./components/UserUpdate/UpdateDetails";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;
function App() {
  // const user = localStorage.getItem("token");
  const user = getTokenCookie();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route
              index
              path="/"
              element={user ? <HomePage /> : <LoginPage />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <HomePage />}
            />
            <Route
              path="/register"
              element={!user ? <SignupPage /> : <HomePage />}
            />
            <Route
              path="/send-otp"
              element={!user ? <SendOTP /> : <HomePage />}
            />
            <Route
              path="/verify-otp"
              element={!user ? <OtpVerification /> : <HomePage />}
            />
            <Route path="/update-details"
              element={user ? <UserDetailsUpdate /> : <LoginPage />}
            />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
