// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Landing from "./pages/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import WorkspaceSelector from "./users/WorkspaceSelector";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Toaster
          position="top-right"
          richColors
          expand={false}
          closeButton
          toastOptions={{
            duration: 3000,
            style: {
              padding: "16px",
              gap: "12px",
            },
            classNames: {
              toast: "flex items-start gap-3 shadow-lg border",
              title: "text-sm font-semibold",
              description: "text-sm",
              success: "border-green-200 bg-green-50",
              error: "border-red-200 bg-red-50",
              warning: "border-amber-200 bg-amber-50",
              info: "border-blue-200 bg-blue-50",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<WorkspaceSelector />} />
          <Route path="/selector" element={<WorkspaceSelector />} />
        </Routes>
      </div>
    </Router>
  );
}
