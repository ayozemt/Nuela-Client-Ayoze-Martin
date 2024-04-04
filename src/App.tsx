import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
// import AddTeacherForm from "./components/AddTeacherForm/AddTeacherForm";
// import AddSubjectForm from "./components/AddSubjectForm/AddSubjectForm";
// import EditTeacherForm from "./components/EditTeacherForm/EditTeacherForm";
// import EditSubjectForm from "./components/EditSubjectForm/EditSubjectForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TeachersPage />} />
        {/* <Route path="/create-teacher" element={<AddTeacherForm />} /> */}
        {/* <Route path="/editar-profesor/:teacherId" element={<EditTeacherForm />} /> */}
        {/* <Route path="/teacher/:teacherId/add-subject" element={<AddSubjectForm />} /> */}
        {/* <Route path="/editar-asignatura/:subjectId" element={<EditSubjectForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;
