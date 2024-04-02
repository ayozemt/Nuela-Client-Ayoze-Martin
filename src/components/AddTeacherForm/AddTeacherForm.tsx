import React, { useState } from "react";
import Teacher from "../../interfaces/Teacher";
import { createTeacher } from "../../services/TeacherService";

function AddTeacherForm() {
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
    } catch (error) {
      alert("Se produjo un error al agregar al profesor");
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
          value={teacherData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={teacherData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          name="telephone"
          value={teacherData.telephone}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Foto URL:
        <input
          type="text"
          name="photo"
          value={teacherData.photo}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Añadir Profesor</button>
    </form>
  );
}

export default AddTeacherForm;
