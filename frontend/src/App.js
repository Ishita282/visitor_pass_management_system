import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitor";
import Appointments from "./pages/Appoinment";
import Auth from "./utils/Auth";
import Pass from "./pages/Pass";
import Scanner from "./pages/Scanner";
import ProtectedLayout from "./pages/ProtectedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>
          }
        />
        <Route path="/login" element={<Login />} />

        {/* Private */}
        <Route
          path="/dashboard"
          element={
            <Auth>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </Auth>
          }
        />
        <Route
          path="/visitors"
          element={
            <Auth>
              <ProtectedLayout>
                <Visitors />
              </ProtectedLayout>
            </Auth>
          }
        />
        <Route
          path="/appointments"
          element={
            <Auth>
              <ProtectedLayout>
                <Appointments />
              </ProtectedLayout>
            </Auth>
          }
        />
        <Route
          path="/pass"
          element={
            <Auth>
              <ProtectedLayout>
                <Pass />
              </ProtectedLayout>
            </Auth>
          }
        />
        <Route
          path="/scanner"
          element={
            <Auth>
              <ProtectedLayout>
                <Scanner />
              </ProtectedLayout>
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
