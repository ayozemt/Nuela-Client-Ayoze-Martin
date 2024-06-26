import "./TeachersPage.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Teacher from "../../interfaces/Teacher";
import Subject from "../../interfaces/Subject";
import HoursCalculator from "../../components/HoursCalculator/HoursCalculator";
import { getTeachers } from "../../services/TeacherService";
import {
  getSubjectsByTeacher,
  deleteSubject,
} from "../../services/SubjectService";
import AddSubjectForm from "../../components/AddSubjectForm/AddSubjectForm";
import AddTeacherForm from "../../components/AddTeacherForm/AddTeacherForm";
import EditSubjectForm from "../../components/EditSubjectForm/EditSubjectForm";
import SubjectDetailModal from "../../components/SubjectDetailModal/SubjectDetailModal";
import { Modal } from "react-bootstrap";

function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<{ [key: string]: Subject[] }>({});
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );
  const [showSubjectDetailModal, setShowSubjectDetailModal] = useState(false);
  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [teachingHours, setTeachingHours] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowSubjectModal = () => setShowSubjectModal(true);
  const handleCloseSubjectModal = () => setShowSubjectModal(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (selectedTeacherId && subjects[selectedTeacherId]) {
      let total = 0;
      subjects[selectedTeacherId].forEach((subject) => {
        total += subject.hours;
      });
      setTeachingHours(total);
    }
  }, [selectedTeacherId, subjects]);

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
      setSelectedTeacherId(selectedTeacherId === teacherId ? null : teacherId);
      if (!subjects[teacherId]) {
        const fetchedSubjects = await getSubjectsByTeacher(teacherId);
        setSubjects({ ...subjects, [teacherId]: fetchedSubjects });
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleShowSubjectDetailModal = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setShowSubjectDetailModal(true);
  };

  const handleCloseSubjectDetailModal = () => {
    setSelectedSubjectId(null);
    setShowSubjectDetailModal(false);
  };

  const handleShowEditSubjectModal = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setShowEditSubjectModal(true);
  };

  const handleCloseEditSubjectModal = async () => {
    try {
      setSelectedSubjectId(null);
      setShowEditSubjectModal(false);

      if (selectedTeacherId) {
        const fetchedSubjects = await getSubjectsByTeacher(selectedTeacherId);
        setSubjects({ ...subjects, [selectedTeacherId]: fetchedSubjects });

        let total = 0;
        fetchedSubjects.forEach((subject) => {
          total += subject.hours;
        });
        setTeachingHours(total);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleShowConfirmationModal = (subject: Subject) => {
    setSubjectToDelete(subject);
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const confirmDelete = async () => {
    try {
      if (subjectToDelete) {
        await deleteSubject(subjectToDelete._id);
        setSubjects((prevSubjects) => {
          const updatedSubjects = { ...prevSubjects };
          Object.keys(updatedSubjects).forEach((teacherId) => {
            updatedSubjects[teacherId] = updatedSubjects[teacherId].filter(
              (subject) => subject._id !== subjectToDelete._id
            );
          });
          return updatedSubjects;
        });
        setSubjectToDelete(null);
        alert("Asignatura eliminada correctamente");
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Se produjo un error al eliminar la asignatura");
    } finally {
      setShowConfirmationModal(false);
    }
  };

  return (
    <div className="page-container bg-light">
      <div className="bg-light">
        <div className="mx-5 pt-4">
          <h2>Profesores</h2>
          <p className="text-secondary">Crea y gestiona los profesores</p>
        </div>
        <hr className="mx-4" />
        <div className="d-flex justify-content-end m-4">
          <button
            className="btn btn-primary"
            onClick={handleShowModal}
            disabled={selectedTeacherId !== null}
          >
            + Añadir Profesor
          </button>
        </div>
        <AddTeacherForm
          show={showModal}
          onHide={handleCloseModal}
          fetchTeachers={fetchTeachers}
        />

        {teachers.length === 0 && (
          <div className="d-flex justify-content-center mt-3">
            <p>Añada un profesor para empezar</p>
          </div>
        )}

        <div className="teacher-list-container">
          {teachers.map((teacher) => (
            <div key={teacher._id}>
              <TeacherCard
                teacher={teacher}
                onClick={() => handleTeacherClick(teacher._id)}
                isSelected={selectedTeacherId === teacher._id}
                setTeachers={setTeachers}
              />
              <hr className="mx-4" />
            </div>
          ))}
        </div>

        {selectedTeacherId ? (
          <HoursCalculator teachingHours={teachingHours} />
        ) : (
          <div className="d-flex justify-content-center m-4">
            <p>Haz clic en un profesor para ver su detalle</p>
          </div>
        )}
        <hr className="mx-4" />

        {selectedTeacherId && (
          <div>
            <ul className="nav nav-tabs m-4">
              <li className="nav-item">
                <Link className="nav-link active text-primary" to="#">
                  Horas lectivas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-secondary" to="#">
                  Horas complementarias
                </Link>
              </li>
            </ul>
            <div className="d-flex justify-content-end m-4">
              <button
                className="btn btn-primary mt-3"
                onClick={handleShowSubjectModal}
              >
                + Añadir Asignatura
              </button>
            </div>
            <AddSubjectForm
              show={showSubjectModal}
              onHide={handleCloseSubjectModal}
              teacherId={selectedTeacherId || ""}
              setSubjects={setSubjects}
            />
            {subjects[selectedTeacherId] &&
            subjects[selectedTeacherId].length > 0 ? (
              <div className="d-flex flex-column align-items-center">
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th className="text-secondary">Nombre</th>
                      <th className="text-secondary">Tipo</th>
                      <th className="text-secondary">Curso</th>
                      <th className="text-secondary">Grupo</th>
                      <th className="text-secondary">Horas semana</th>
                      <th className="text-secondary">Espacio regular</th>
                      <th className="text-secondary">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects[selectedTeacherId].map((subject: Subject) => (
                      <tr key={subject._id}>
                        <td className="text-secondary">{subject.name}</td>
                        <td className="text-secondary">{subject.type}</td>
                        <td className="text-secondary">{subject.grade}</td>
                        <td className="text-secondary">{subject.group}</td>
                        <td className="text-secondary">{subject.hours} h</td>
                        <td className="text-secondary">{subject.espacio}</td>
                        <td>
                          <Link
                            to="#"
                            className="px-2"
                            onClick={() =>
                              handleShowSubjectDetailModal(subject._id)
                            }
                          >
                            Ver
                          </Link>
                          <Link
                            to="#"
                            className="px-2"
                            onClick={() =>
                              handleShowEditSubjectModal(subject._id)
                            }
                          >
                            Editar
                          </Link>
                          <Link
                            to="#"
                            onClick={() => handleShowConfirmationModal(subject)}
                            className="px-2 text-danger"
                          >
                            Eliminar
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center pb-5">
                <p>No hay asignaturas asignadas a este profesor</p>
              </div>
            )}
          </div>
        )}

        {subjectToDelete && (
          <Modal
            show={showConfirmationModal}
            onHide={handleCloseConfirmationModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro de que deseas eliminar la asignatura{" "}
              {subjectToDelete.name}?
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Eliminar
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCloseConfirmationModal}
              >
                Cancelar
              </button>
            </Modal.Footer>
          </Modal>
        )}

        {selectedSubjectId && (
          <>
            <EditSubjectForm
              show={showEditSubjectModal}
              onHide={handleCloseEditSubjectModal}
              subjectId={selectedSubjectId}
              setSubjects={setSubjects}
            />
            <SubjectDetailModal
              show={showSubjectDetailModal}
              onHide={handleCloseSubjectDetailModal}
              subjectId={selectedSubjectId}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TeachersPage;
