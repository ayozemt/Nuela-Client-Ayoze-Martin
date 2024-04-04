import React, { useState } from "react";
import Teacher from "../../interfaces/Teacher";
import { createTeacher } from "../../services/TeacherService";
import { Modal } from "react-bootstrap";

interface AddTeacherFormProps {
  show: boolean;
  onHide: () => void;
}

function AddTeacherForm({ show, onHide }: AddTeacherFormProps) {
  const [teacherData, setTeacherData] = useState<Teacher>({
    _id: "",
    name: "",
    email: "",
    telephone: "",
    photo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTeacher(teacherData);

      setTeacherData({
        _id: "",
        name: "",
        email: "",
        telephone: "",
        photo: "",
      });
      alert("Profesor añadido correctamente");
      onHide();
    } catch (error) {
      alert("Se produjo un error al agregar al profesor");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir profesor</Modal.Title>
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
              value={teacherData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={teacherData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="telephone" className="form-label">
              Teléfono:
            </label>
            <input
              type="tel"
              name="telephone"
              value={teacherData.telephone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 px-4">
            <label htmlFor="photo" className="form-label">
              Foto URL:
            </label>
            <input
              type="text"
              name="photo"
              value={teacherData.photo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="d-flex justify-content-end m-4">
            <button type="submit" className="btn btn-primary mt-2">
              Añadir Profesor
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTeacherForm;
