import React from "react";
import "./TeacherCard.css";
import Teacher from "../../interfaces/Teacher";

interface Props {
  teacher: Teacher;
  onClick: () => void;
  isSelected: boolean;
}

function TeacherCard({ teacher, onClick, isSelected }: Props) {
  return (
    <div className={`cardo ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <img src={teacher.photo} alt="Teacher" style={{ height: "100px" }} />
      <div>
        <p>{teacher.name}</p>
        <p>{teacher.email}</p>
        <p>{teacher.telephone}</p>
      </div>
      <div>
        <a href={`/editar/${teacher._id}`}>Editar</a>
      </div>
    </div>
  );
}

export default TeacherCard;
