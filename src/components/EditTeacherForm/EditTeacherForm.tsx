import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTeacherDetail, updateTeacher } from "../../services/TeacherService";
import Teacher from "../../interfaces/Teacher";

function EditTeacherForm() {
  const { teacherId } = useParams<{ teacherId: string }>();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teacherId) {
      alert("No se pudo obtener el ID del profesor");
      return;
    }
    try {
      await updateTeacher(teacherId, teacher);
      alert("Profesor actualizado correctamente");
    } catch (error) {
      alert("Se produjo un error al actualizar el profesor");
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
          value={teacher.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={teacher.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          name="telephone"
          value={teacher.telephone}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Foto URL:
        <input
          type="text"
          name="photo"
          value={teacher.photo}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" className="btn btn-primary">
        Actualizar Profesor
      </button>
      <a className="btn btn-danger" href="/" role="button">
        Cancelar
      </a>
    </form>
  );
}

export default EditTeacherForm;
