import React, { useState, useEffect } from "react";
import "./TeacherCard.css";
import Teacher from "../../interfaces/Teacher";
import { Link } from "react-router-dom";
import EditTeacherForm from "../EditTeacherForm/EditTeacherForm";

interface Props {
  teacher: Teacher;
  onClick: () => void;
  isSelected: boolean;
}

function TeacherCard({ teacher, onClick, isSelected }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className={`cardo ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <img src={teacher.photo} alt="Teacher" style={{ height: "100px" }} />
      <div>
        <p>{teacher.name}</p>
        <p>{teacher.email}</p>
        <p>{teacher.telephone}</p>
      </div>
      <div>
        <Link to="#" onClick={() => handleShowEditModal()}>
          Editar
        </Link>
        <EditTeacherForm
          show={showEditModal}
          onHide={handleCloseEditModal}
          teacherId={teacher._id}
        />
      </div>
    </div>
  );
}

export default TeacherCard;
