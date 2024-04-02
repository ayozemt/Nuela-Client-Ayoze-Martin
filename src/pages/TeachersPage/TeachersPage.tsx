import React, { useState, useEffect } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Teacher from "../../interfaces/Teacher";
import { getTeachers } from "../../services/TeacherService";

function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const fetchedTeachers = await getTeachers();
      setTeachers(fetchedTeachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  return (
    <div>
      <h1>Profesores</h1>
      <h2>Crea y gestiona profesores</h2>

      {teachers.map((teacher) => (
        <TeacherCard key={teacher._id} teacher={teacher} />
      ))}
    </div>
  );
}

export default TeachersPage;
