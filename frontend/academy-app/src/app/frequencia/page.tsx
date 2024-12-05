"use client";

import React, { useEffect, useState } from "react";
import AttendanceTable from "@/components/PresenceTable/PresenceTable";
import AddObservationModal from "@/components/AddObservationModal/AddObservationModal";

interface Student {
  id: number;
  name: string;
  status: "P" | "F";
}

const Frequencia = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isAddObservationModalOpen, setIsAddObservationModalOpen] =
    useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  // Função para buscar dados dos estudantes
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/users/");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Student[] = await response.json();
      setStudents(data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  useEffect(() => {
    fetchStudents(); // Chama a função ao carregar o componente
  }, []);

  const toggleStatus = (id: number) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "P" ? "F" : "P",
            }
          : student
      )
    );
  };

  const handleAddComment = (id: number, comment: string) => {
    console.log(`Comentário para o aluno ${id}: ${comment}`);
    // Você pode adicionar lógica para salvar os comentários no banco ou manipular conforme necessário
  };

  const handleCloseAddObservationModal = () => {
    setIsAddObservationModalOpen(false); // Fecha o modal
    setSelectedStudentId(null); // Reseta o ID do aluno selecionado
  };

  return (
    <div>
    <h1 className="text-2xl font-bold">Frequência</h1>
    <AttendanceTable
      students={students}
      onToggleStatus={toggleStatus}
      onAddComment={handleAddComment} // Passa a função para adicionar comentários
    />
    <AddObservationModal
      isOpen={isAddObservationModalOpen}
      onClose={handleCloseAddObservationModal}
      onAddObservation={(observation) => {
        console.log(observation);
        // Lógica para lidar com a adição da observação
      }}
    />
  </div>
  );
};

export default Frequencia;
