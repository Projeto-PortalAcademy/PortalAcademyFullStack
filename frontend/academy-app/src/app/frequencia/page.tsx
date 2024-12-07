"use client";

import React, { useState, useEffect } from "react";
import AttendanceTable from "@/components/PresenceTable/PresenceTable";
import AddObservationModal from "@/components/AddObservationModal/AddObservationModal";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

interface Student {
  id: number;
  name: string;
  status: "P" | "F" | "A";
}

const Frequencia = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Camila Yukari Yatabe", status: "P" },
    { id: 2, name: "Vinicius de Morais Lino", status: "F" },
    { id: 3, name: "Vinicius Antunes", status: "A" },
    { id: 4, name: "Thiago Tavares Silva", status: "P" },
    { id: 5, name: "Guilherme Martins", status: "F" },
    { id: 6, name: "Matheus Pajé da Mata", status: "A" },
    { id: 7, name: "Thiago Tavares Silva", status: "P" },
    { id: 8, name: "Felipe Camargo", status: "F" },
    { id: 9, name: "Sérgio Nascimento", status: "A" },
  ]);

  const [isAddObservationModalOpen, setIsAddObservationModalOpen] =
    useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );

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
    <div>
      <h1 className="text-2xl font-bold">Frequência</h1>
      <AttendanceTable
        students={students}
        onToggleStatus={toggleStatus}
        onAddComment={handleAddComment}
      />
      <AddObservationModal
        isOpen={isAddObservationModalOpen}
        onClose={handleCloseAddObservationModal}
      />
    </div>
    </ProtectedRoute>
  );
};

export default Frequencia;