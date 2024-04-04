import React, { useState, useEffect } from "react";
import Subject from "../../interfaces/Subject";
import { getSubjectDetail } from "../../services/SubjectService";
import { Modal } from "react-bootstrap";

interface SubjectDetailModalProps {
  show: boolean;
  onHide: () => void;
  subjectId: string;
}

function SubjectDetailModal({
  show,
  onHide,
  subjectId,
}: SubjectDetailModalProps) {
  const [subject, setSubject] = useState<Subject | null>(null);

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

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Asignatura</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {subject && (
          <div>
            <p>
              <strong>Nombre:</strong> {subject.name}
            </p>
            <p>
              <strong>Tipo:</strong> {subject.type}
            </p>
            <p>
              <strong>Curso:</strong> {subject.grade}
            </p>
            <p>
              <strong>Grupo:</strong> {subject.group}
            </p>
            <p>
              <strong>Horas:</strong> {subject.hours}
            </p>
            <p>
              <strong>Espacio:</strong> {subject.espacio}
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SubjectDetailModal;
