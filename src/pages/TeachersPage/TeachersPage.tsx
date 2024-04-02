import React, { useState, useEffect } from "react";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Teacher from "../../interfaces/Teacher";
import Subject from "../../interfaces/Subject";
import { getTeachers } from "../../services/TeacherService";
import { getSubjectsByTeacher } from "../../services/SubjectService";

function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<{ [key: string]: Subject[] }>({});
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null
  );

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

  const handleTeacherClick = async (teacherId: string) => {
    try {
      if (selectedTeacherId === teacherId) {
        setSelectedTeacherId(null);
      } else {
        setSelectedTeacherId(teacherId);
        if (!subjects[teacherId]) {
          const fetchedSubjects = await getSubjectsByTeacher(teacherId);
          setSubjects({ ...subjects, [teacherId]: fetchedSubjects });
        }
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  return (
    <div>
      <h1>Profesores</h1>
      <h2>Crea y gestiona profesores</h2>

      {teachers.map((teacher) => (
        <div key={teacher._id}>
          <TeacherCard
            teacher={teacher}
            onClick={() => handleTeacherClick(teacher._id)}
            isSelected={selectedTeacherId === teacher._id}
          />
        </div>
      ))}

      {selectedTeacherId &&
        (subjects[selectedTeacherId] &&
        subjects[selectedTeacherId].length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Curso</th>
                <th>Grupo</th>
                <th>Horas</th>
                <th>Espacio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subjects[selectedTeacherId].map((subject: Subject) => (
                <tr key={subject._id}>
                  <td>{subject.name}</td>
                  <td>{subject.type}</td>
                  <td>{subject.grade}</td>
                  <td>{subject.group}</td>
                  <td>{subject.hours}</td>
                  <td>{subject.espacio}</td>
                  <td>
                    <button>Ver</button>
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay asignaturas asignadas a este profesor</p>
        ))}
    </div>
  );
}

export default TeachersPage;
