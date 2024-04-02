import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSubjectDetail, updateSubject } from "../../services/SubjectService";
import Subject from "../../interfaces/Subject";

function EditSubjectForm() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [subject, setSubject] = useState<Subject>({
    _id: "",
    name: "",
    type: "Obligatoria",
    grade: "1 de ESO",
    group: "A",
    hours: 0,
    espacio: "",
  });

  useEffect(() => {
    const fetchSubject = async () => {
      if (!subjectId) return;
      try {
        const fetchedSubject = await getSubjectDetail(subjectId);
        setSubject(fetchedSubject);
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    };
    fetchSubject();
  }, [subjectId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSubject((prevSubject) => ({
      ...prevSubject,
      [name]: value,
    }));
  };

  const buildEspacio = () => {
    return `${subject.grade} - Grupo ${subject.group}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subjectId) {
      alert("No se pudo obtener el ID de la asignatura");
      return;
    }
    try {
      const updatedSubject = { ...subject, espacio: buildEspacio() };
      await updateSubject(subjectId, updatedSubject);
      alert("Asignatura actualizada correctamente");
    } catch (error) {
      alert("Se produjo un error al actualizar la asignatura");
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
          value={subject.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tipo:
        <select name="type" value={subject.type} onChange={handleChange}>
          <option value="Obligatoria">Obligatoria</option>
          <option value="Optativa">Optativa</option>
        </select>
      </label>
      <label>
        Curso:
        <select name="grade" value={subject.grade} onChange={handleChange}>
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
        <select name="group" value={subject.group} onChange={handleChange}>
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
          value={subject.hours}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" className="btn btn-primary">
        Actualizar Asignatura
      </button>
      <a className="btn btn-danger" href="/" role="button">
        Cancelar
      </a>
    </form>
  );
}

export default EditSubjectForm;
