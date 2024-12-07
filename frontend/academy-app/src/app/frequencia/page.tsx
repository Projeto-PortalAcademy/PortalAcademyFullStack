"use client";

import React, { useState, useEffect } from "react";
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

  const toggleStatus = (id: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? { ...student, status: student.status === "P" ? "F" : "P" }
          : student
      )
    );
  };

  const handleAddComment = (id: string) => {
    setSelectedStudentId(id);
    setIsAddObservationModalOpen(true);
  };

  const handleCloseAddObservationModal = () => {
    setIsAddObservationModalOpen(false);
    setSelectedStudentId(null);
  };

  const handleAddObservation = (observation: string) => {
    if (selectedStudentId) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudentId ? { ...student, observation } : student
        )
      );
    }
    handleCloseAddObservationModal();
  };

  const handleSubmitAttendances = async () => {
    setIsSubmitting(true);
    const currentDate = new Date().toISOString();

    for (const student of students) {
      const sanitizedComment = typeof student.observation === "string" ? student.observation : "";

      try {
        await submitAttendance({
          user_id: student.user_id,
          date: currentDate,
          is_present: student.status === "P",
          comment: sanitizedComment,
        });
      } catch (error) {
        console.error("Erro ao enviar presença:", error);
      }
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar estudantes: {error.message}</div>;
  }

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