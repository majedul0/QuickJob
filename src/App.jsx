import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JobProvider } from "./context/JobContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import JobDetailPage from "./pages/JobDetailPage/JobDetailPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";

function App() {
  return (
    <AuthProvider>
    <JobProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </JobProvider>
    </AuthProvider>
  );
}

export default App;
