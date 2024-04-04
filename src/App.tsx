import React from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import TeachersPage from "./pages/TeachersPage/TeachersPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TeachersPage />} />
      </Routes>
    </div>
  );
}

export default App;
