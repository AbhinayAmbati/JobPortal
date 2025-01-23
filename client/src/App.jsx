import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import { AppProvider } from "./contexts/AppContext";
import ProtectedLoginRoute from "./contexts/ProtectedLoginRoute";
import ProtectedRegisterRoute from "./contexts/ProtectedRegisterRoute";
import Home from "./components/Home";
import ProtectedRoute from "./contexts/ProtectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <ToastContainer/>
      <Routes>
        <Route path="/job-portal" element={<LandingPage />} />
        <Route path="/sign-in" element={
          <ProtectedLoginRoute>
            <SignIn />
            </ProtectedLoginRoute>
          } />
        <Route path="/sign-up" element={
          <ProtectedRegisterRoute><SignUp /></ProtectedRegisterRoute>
          } />
        <Route path="/forgot-password" element={
          <ProtectedLoginRoute><ForgotPassword /></ProtectedLoginRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/edit-profile" element={
            <ProtectedRoute><EditProfile /></ProtectedRoute>
          } />
      </Routes>
    </Router>
    </AppProvider>
  );
};

export default App;
