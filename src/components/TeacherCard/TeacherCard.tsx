import React, { useState } from "react";
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
    <div
      className={`px-4 d-flex flex-row align-items-center justify-content-between ${
        isSelected ? "bg-white mx-4 rounded border" : ""
      }`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex flex-row m-2">
        <img
          src={teacher.photo}
          alt="Teacher"
          style={{ height: "100px" }}
          className="border border-dark rounded m-3"
        />
        <div className="m-3">
          <h2 className="">{teacher.name}</h2>
          <a href={`mailto:${teacher.email}`} className="text-secondary">
            {teacher.email}
          </a>
          <br />
          <a href={`tel:${teacher.telephone}`} className="text-secondary">
            {teacher.telephone}
          </a>
        </div>
      </div>
      <div className="mx-5">
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
