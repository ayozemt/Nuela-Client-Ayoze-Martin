import React, { useState, useEffect } from "react";
import { getSubjectDetail, updateSubject } from "../../services/SubjectService";
import Subject from "../../interfaces/Subject";
import { Modal } from "react-bootstrap";

interface EditSubjectFormProps {
  show: boolean;
  onHide: () => void;
  subjectId: string;
  setSubjects: React.Dispatch<
    React.SetStateAction<{ [key: string]: Subject[] }>
  >;
}

function EditSubjectForm({
  show,
  onHide,
  subjectId,
  setSubjects,
}: EditSubjectFormProps) {
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
      onHide();
      if (subject.teacher !== undefined) {
        setSubjects((prevSubjects) => {
          const updatedSubjects = { ...prevSubjects };
          const teacherId = subject.teacher as string; // Utilizar una conversión de tipo para asegurar que subject.teacher sea string
          if (updatedSubjects.hasOwnProperty(teacherId)) {
            const index = updatedSubjects[teacherId].findIndex(
              (subj) => subj._id === subjectId
            );
            if (index !== -1) {
              updatedSubjects[teacherId][index] = updatedSubject;
            }
          }
          return updatedSubjects;
        });
      }
    } catch (error) {
      alert("Se produjo un error al actualizar la asignatura");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar asignatura</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="mt-4 mb-4">
          <div className="mb-3 px-4">
            <label htmlFor="name" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              value={subject.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="type" className="form-label">
              Tipo:
            </label>
            <select
              name="type"
              value={subject.type}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Obligatoria">Obligatoria</option>
              <option value="Optativa">Optativa</option>
            </select>
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="grade" className="form-label">
              Curso:
            </label>
            <select
              name="grade"
              value={subject.grade}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="1 de ESO">1 de ESO</option>
              <option value="2 de ESO">2 de ESO</option>
              <option value="3 de ESO">3 de ESO</option>
              <option value="4 de ESO">4 de ESO</option>
              <option value="1 de Bachillerato">1 de Bachillerato</option>
              <option value="2 de Bachillerato">2 de Bachillerato</option>
            </select>
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="group" className="form-label">
              Grupo:
            </label>
            <select
              name="group"
              value={subject.group}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="hours" className="form-label">
              Horas:
            </label>
            <input
              type="number"
              name="hours"
              min="1"
              value={subject.hours}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="d-flex justify-content-end m-4">
            <button type="submit" className="btn btn-primary mt-2">
              Actualizar Asignatura
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditSubjectForm;
