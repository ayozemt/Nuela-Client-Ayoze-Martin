import React, { useState, useEffect } from "react";
import { getTeacherDetail, updateTeacher } from "../../services/TeacherService";
import Teacher from "../../interfaces/Teacher";
import { Modal } from "react-bootstrap";

interface EditTeacherFormProps {
  show: boolean;
  onHide: () => void;
  teacherId: string;
  handleSubmit: (updatedTeacher: Teacher) => void;
}

function EditTeacherForm({
  show,
  onHide,
  teacherId,
  handleSubmit,
}: EditTeacherFormProps) {
  const [teacher, setTeacher] = useState<Teacher>({
    _id: "",
    name: "",
    email: "",
    telephone: "",
    photo: "",
  });

  useEffect(() => {
    const fetchTeacher = async () => {
      if (!teacherId) return;
      try {
        const fetchedTeacher = await getTeacherDetail(teacherId);
        setTeacher(fetchedTeacher);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };
    fetchTeacher();
  }, [teacherId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teacherId) {
      alert("No se pudo obtener el ID del profesor");
      return;
    }
    try {
      await updateTeacher(teacherId, teacher);
      handleSubmit(teacher);
      alert("Profesor actualizado correctamente");
      onHide();
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Error al actualizar el profesor");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar profesor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmit} className="mt-4 mb-4">
          <div className="mb-3 px-4">
            <label htmlFor="name" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              value={teacher.name}
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
              value={teacher.email}
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
              value={teacher.telephone}
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
              value={teacher.photo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="d-flex justify-content-end m-4">
            <button type="submit" className="btn btn-primary mt-2">
              Actualizar Profesor
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTeacherForm;
