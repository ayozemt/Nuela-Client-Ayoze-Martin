import React from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import VerticalNavbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-3">
            <VerticalNavbar />
          </div>
          <div className="col-md-9 col-lg-9">
            <div className="content">
              <Routes>
                <Route path="/" element={<TeachersPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
