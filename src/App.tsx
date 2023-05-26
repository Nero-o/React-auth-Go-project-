import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AppRoutes from "./router/routers";

function App() {
  return (
    <div className="div">
      <AppRoutes />
    </div>
  );
}

export default App;
