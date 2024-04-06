import React, { useState } from "react";
import Teacher from "../../interfaces/Teacher";
import { createTeacher } from "../../services/TeacherService";
import { Modal } from "react-bootstrap";

interface AddTeacherFormProps {
  show: boolean;
  onHide: () => void;
  fetchTeachers: () => Promise<void>;
}

function AddTeacherForm({ show, onHide, fetchTeachers }: AddTeacherFormProps) {
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

  const generatePlaceholderImage = (name: string) => {
    return `https://via.placeholder.com/150x150/e7e6fe/5c37eb?text=${name
      .split(" ")
      .map((namePart) => namePart.charAt(0))
      .join("")}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const teacherPhotoUrl = teacherData.photo
        ? teacherData.photo
        : generatePlaceholderImage(teacherData.name);

      const newTeacher = {
        _id: teacherData._id,
        name: teacherData.name,
        email: teacherData.email,
        telephone: teacherData.telephone,
        photo: teacherPhotoUrl,
      };

      await createTeacher(newTeacher);

      setTeacherData({
        _id: "",
        name: "",
        email: "",
        telephone: "",
        photo: "",
      });
      alert("Profesor añadido correctamente");
      fetchTeachers();
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
