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

const App = () => {
  return (
    <AppProvider>
      <Router>
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
      </Routes>
    </Router>
    </AppProvider>
  );
};

export default App;
