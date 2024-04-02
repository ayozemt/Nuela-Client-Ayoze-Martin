import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import AddTeacherForm from "./components/AddTeacherForm/AddTeacherForm";
import AddSubjectForm from "./components/AddSubjectForm/AddSubjectForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TeachersPage />} />
        <Route path="/create-teacher" element={<AddTeacherForm />} />
        <Route path="/teacher/:teacherId/add-subject" element={<AddSubjectForm />} />
      </Routes>
    </div>
  );
}

export default App;
