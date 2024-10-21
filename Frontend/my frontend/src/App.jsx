import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";

import Home from "./pages/Home.jsx";
import MainLayout from "./layouts/MainLayouts.jsx";
import LoginForm from "./components/LoginForm.jsx";
import ForgotPassowrd from "./components/ForgotPassword.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/forgot-password" element={<ForgotPassowrd />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
