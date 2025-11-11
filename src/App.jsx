import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import PaidQuestion from "./pages/PaidQuestion";
import { Toaster } from "react-hot-toast";
import Thanks from "./pages/Thanks";
import "./App.css";

export default function App() {
  return (
    <div>
       <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/paid" element={<PaidQuestion />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </div>
  );
}
