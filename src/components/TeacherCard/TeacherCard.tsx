import React from "react";
import "./TeacherCard.css";
import Teacher from "../../interfaces/Teacher";

interface Props {
  teacher: Teacher;
}

function TeacherCard({ teacher }: Props) {
  return (
    <div className="card">
      <img src={teacher.photo} alt="Teacher" style={{ height: "100px" }} />
      <div>
        <p>{teacher.name}</p>
        <p>{teacher.email}</p>
        <p>{teacher.telephone}</p>
      </div>
    </div>
  );
}

export default TeacherCard;
