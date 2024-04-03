import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { createSubject } from "../../services/SubjectService";
import Subject from "../../interfaces/Subject";
import { Modal } from "react-bootstrap";

interface AddSubjectFormProps {
  show: boolean;
  onHide: () => void;
  teacherId: string;
}

function AddSubjectForm({ show, onHide, teacherId }: AddSubjectFormProps) {
  // const { teacherId } = useParams<{ teacherId: string }>();
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
      onHide();
    } catch (error) {
      alert("Se produjo un error al agregar la asignatura");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir asignatura</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="mt-4 mb-4">
          {/* <h2 className="mb-5">Añadir asignatura</h2> */}
          <div className="mb-3 px-5">
            <label htmlFor="name" className="form-label">
              Selecciona la asignatura:
            </label>
            <select
              name="name"
              value={subjectData.name}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Matemáticas">Matemáticas</option>
              <option value="Lengua">Lengua</option>
              <option value="Inglés">Inglés</option>
              <option value="Sociales">Sociales</option>
              <option value="Naturales">Naturales</option>
              <option value="Plástica">Plástica</option>
              <option value="Gimnasia">Gimnasia</option>
            </select>
          </div>
          <div className="mb-3 px-5">
            <label htmlFor="type" className="form-label">
              Tipo de asignatura:
            </label>
            <select
              name="type"
              value={subjectData.type}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Obligatoria">Obligatoria</option>
              <option value="Optativa">Optativa</option>
            </select>
          </div>
          <div className="mb-3 px-5">
            <label htmlFor="grade" className="form-label">
              Curso:
            </label>
            <select
              name="grade"
              value={subjectData.grade}
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
          <div className="mb-3 px-5">
            <label htmlFor="group" className="form-label">
              Grupo:
            </label>
            <select
              name="group"
              value={subjectData.group}
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
          <div className="mb-3 px-5">
            <label htmlFor="hours" className="form-label">
              Horas:
            </label>
            <input
              type="number"
              name="hours"
              value={subjectData.hours}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Añadir Asignatura
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddSubjectForm;
