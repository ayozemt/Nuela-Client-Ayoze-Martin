import React, { useState, Dispatch, SetStateAction } from "react";
import Teacher from "../../interfaces/Teacher";
import { Link } from "react-router-dom";
import EditTeacherForm from "../EditTeacherForm/EditTeacherForm";
import { updateTeacher } from "../../services/TeacherService";

interface Props {
  teacher: Teacher;
  onClick: () => void;
  isSelected: boolean;
  setTeachers: Dispatch<SetStateAction<Teacher[]>>;
}

function TeacherCard({ teacher, onClick, isSelected, setTeachers }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSubmit = async (updatedTeacher: Teacher) => {
    try {
      await updateTeacher(teacher._id, updatedTeacher);
      setTeachers((prevTeachers: Teacher[]) =>
        prevTeachers.map((t: Teacher) =>
          t._id === teacher._id ? updatedTeacher : t
        )
      );
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Error al actualizar el profesor");
    }
  };

  return (
    <div
      className={`px-4 d-flex flex-row align-items-center justify-content-between ${
        isSelected ? "bg-white mx-4 rounded border" : ""
      }`}
      onClick={onClick}
      style={{ cursor: "pointer", lineHeight: "200%" }}
      title="Click para ver detalle de profesor"
    >
      <div className="d-flex flex-row mx-2">
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
          <a
            href={`tel:${teacher.telephone}`}
            className="text-secondary"
            style={{ textDecoration: "none" }}
          >
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
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default TeacherCard;
