import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./user/SignupPage";
import ResetPasswordEmail from "./user/resetPassword/ResetPasswordEmail";
import ResetPassword from "./user/resetPassword/ResetPassword";
import UserChangePassword from "./user/UserChangePassword";
import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import UserPage from "./admin/UserPage";
import AdminChangePassword from "./admin/AdminChangePassword";
import AdminPage from "./user/AdminPage";
import LoginPage from "./user/LoginPage";
import AdminResetPassword from "./admin/AdminResetPassword";
import AdminResetPasswordEmail from "./admin/AdminResetPasswordEmail";
import EmailVerificationMessage from "./user/EmailVerificationMessage";
import AdminEmailVerificationMessage from "./admin/AdminEmailVerificationMessage";
import AboutUs from "./utils/AboutUs";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/reset_password" element={<ResetPasswordEmail />}></Route>
        <Route path="/home" element={<UserPage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route
          path="/reset_password/email_verification"
          element={<ResetPassword />}
        ></Route>
        <Route
            path="/registration/email_verification"
            element={<EmailVerificationMessage />}
        ></Route>
        <Route path="/change_password" element={<UserChangePassword />}></Route>







        <Route path="/admin/signup" element={<AdminSignup />}></Route>
        <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/admin/home" element={<AdminPage />}></Route>
        <Route
          path="/admin/change_password"
          element={<AdminChangePassword />}
        ></Route>
        <Route
          path="admin/reset_password"
          element={<AdminResetPasswordEmail />}
        ></Route>
        <Route
            path="/admin/reset_password/email_verification"
            element={<AdminResetPassword />}
        ></Route>
        <Route
            path="/registration/admin/email_verification"
            element={<AdminEmailVerificationMessage />}
        ></Route>


      </Routes>
    </div>
  );
}

export default App;
