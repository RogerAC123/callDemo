import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Bolivia from "./pages/Bolivia";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/bolivia" element={<Bolivia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
