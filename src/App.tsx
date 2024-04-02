import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import AddTeacherForm from "./components/AddTeacherForm/AddTeacherForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TeachersPage />} />
        <Route path="/create-teacher" element={<AddTeacherForm />} />
      </Routes>
    </div>
  );
}

export default App;
