"use client";

import React, { useState } from "react";
import AttendanceTable from "@/components/PresenceTable/PresenceTable";
import AddObservationModal from "@/components/AddObservationModal/AddObservationModal";
import { fetchStudents, submitAttendance, Student } from "@/services/AttendanceService";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const Frequencia: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAddObservationModalOpen, setIsAddObservationModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch students"));
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const toggleStatus = (id: number) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              status:
                student.status === "P"
                  ? "F"
                  : student.status === "F"
                  ? "A"
                  : "P",
            }
          : student
      )
    );
  };

  const handleAddComment = (id: number) => {
    setSelectedStudentId(id); // Armazena o ID do aluno selecionado
    setIsAddObservationModalOpen(true); // Abre o modal
  };

  const handleCloseAddObservationModal = () => {
    setIsAddObservationModalOpen(false); // Fecha o modal
    setSelectedStudentId(null); // Reseta o ID do aluno selecionado
  };

  return (
    <ProtectedRoute>
      <div className="frequencia-screen">
        <h1 className="text-2xl font-bold">Frequência</h1>
        <AttendanceTable
          students={students}
          onToggleStatus={toggleStatus}
          onAddComment={handleAddComment}
          onSubmitAttendances={handleSubmitAttendances} // Passa a função para o AttendanceTable
          isSubmitting={isSubmitting}
        />
        <AddObservationModal
          isOpen={isAddObservationModalOpen}
          onClose={handleCloseAddObservationModal}
          onAddObservation={handleAddObservation}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Frequencia;
