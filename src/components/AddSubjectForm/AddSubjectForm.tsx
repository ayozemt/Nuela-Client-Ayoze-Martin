import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createSubject } from "../../services/SubjectService";
import Subject from "../../interfaces/Subject";

function AddSubjectForm() {
  const { teacherId } = useParams<{ teacherId: string }>();
  const [subjectData, setSubjectData] = useState<Subject>({
    _id: "",
    name: "",
    type: "Obligatoria",
    grade: "1 de ESO",
    group: "A",
    hours: 0,
    teacher: teacherId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (teacherId) {
        await createSubject(subjectData, teacherId);
        setSubjectData({
          _id: "",
          name: "",
          type: "Obligatoria",
          grade: "1 de ESO",
          group: "A",
          hours: 0,
          teacher: teacherId,
        });
        alert("Asignatura añadida correctamente");
      } else {
        alert("No se pudo obtener el ID del profesor");
      }
    } catch (error) {
      alert("Se produjo un error al agregar la asignatura");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={subjectData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tipo:
        <select
          name="type"
          value={subjectData.type}
          onChange={handleChange}
          required
        >
          <option value="Obligatoria">Obligatoria</option>
          <option value="Optativa">Optativa</option>
        </select>
      </label>
      <label>
        Curso:
        <select
          name="grade"
          value={subjectData.grade}
          onChange={handleChange}
          required
        >
          <option value="1 de ESO">1 de ESO</option>
          <option value="2 de ESO">2 de ESO</option>
          <option value="3 de ESO">3 de ESO</option>
          <option value="4 de ESO">4 de ESO</option>
          <option value="1 de Bachillerato">1 de Bachillerato</option>
          <option value="2 de Bachillerato">2 de Bachillerato</option>
        </select>
      </label>
      <label>
        Grupo:
        <select
          name="group"
          value={subjectData.group}
          onChange={handleChange}
          required
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </label>
      <label>
        Horas:
        <input
          type="number"
          name="hours"
          value={subjectData.hours}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Añadir Asignatura</button>
    </form>
  );
}

export default AddSubjectForm;
