"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import AttendanceTable from "@/components/PresenceTable/PresenceTable";
import AddObservationModal from "@/components/AddObservationModal/AddObservationModal";

interface Student {
  id: number;
  name: string;
  status: "P" | "F";
  user_id: string;
  observation?: string; // Campo opcional para o comentário
}

const Frequencia = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Camila Yukari Yatabe", status: "P", user_id: "fd187c35-eddf-4c44-8a88-7dea7928d2c1" },
    { id: 2, name: "Vinicius de Morais Lino", status: "P", user_id: "fd187c35-eddf-4c44-8a88-7dea7928d2c2" },
    { id: 3, name: "Vinicius Antunes", status: "P", user_id: "fd187c35-eddf-4c44-8a88-7dea7928d2c3" },
    { id: 4, name: "Thiago Tavares Silva", status: "P", user_id: "fd187c35-eddf-4c44-8a88-7dea7928d2c4" },
    { id: 5, name: "Guilherme Martins", status: "P", user_id: "fd187c35-eddf-4c44-8a88-7dea7928d2c5" },
    { id: 6, name: "Matheus Pajé da Mata", status: "P", user_id: "fd187c35-eddf-4c44-8a88-7dea7928d2c6" },
    { id: 7, name: "Thiago Tavares Silva", status: "P", user_id: "fd187c35-eddf-4c44-8a88-7dea7928d2c7" },
    { id: 8, name: "Felipe Camargo", status: "P", user_id: "fd187c35-eddf-4c44-8a88-7dea7928d2c8" },
    { id: 9, name: "Sérgio Nascimento", status: "P", user_id: "fd187c35-eddf-4c44-8a88-7dea7928d2c9" },
  ]);

  const [isAddObservationModalOpen, setIsAddObservationModalOpen] =
    useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controle de envio

  const currentDate = new Date().toISOString().split("T")[0]; // Data no formato YYYY-MM-DD

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

  const handleAddComment = (id: number) => {
    setSelectedStudentId(id); // Armazena o ID do aluno selecionado
    setIsAddObservationModalOpen(true); // Abre o modal
  };

  const handleCloseAddObservationModal = () => {
    setIsAddObservationModalOpen(false); // Fecha o modal
    setSelectedStudentId(null); // Reseta o ID do aluno selecionado
    setComment(""); // Reseta o comentário
  };

  const handleAddObservation = (observation: string) => {
    if (selectedStudentId !== null) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudentId
            ? { ...student, observation: observation }
            : student
        )
      );
    }
    handleCloseAddObservationModal(); // Fecha o modal após salvar
  };

  const handleSubmitAttendances = async () => {
    setIsSubmitting(true); // Começa o envio

    const attendanceData = students.map((student) => ({
      user_id: student.user_id,
      date: currentDate,
      is_present: student.status === "P" ? "true" : "false",
      comment: student.observation || "", // Se não houver comentário, envia string vazia
    }));

    try {
      const response = await fetch("http://localhost:8080/attendances", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceData),
      });

      if (response.ok) {
        console.log("Presenças enviadas com sucesso!");
        // Limpar observações ou outros estados se necessário
      } else {
        console.error("Erro ao enviar as presenças:", response.status);
      }
    } catch (error) {
      console.error("Erro ao enviar as presenças:", error);
    } finally {
      setIsSubmitting(false); // Termina o envio
    }
  };

  return (
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
        onAddObservation={handleAddObservation}
      />
      <div className="container mx-auto flex justify-end">
        <Button className="m-auto mt-4 mb-4"  
          variant="contained"
          color="primary"
          onClick={handleSubmitAttendances}
          disabled={isSubmitting} // Desabilita o botão enquanto estiver enviando
        >
          {isSubmitting ? "Enviando..." : "Enviar Presenças"}
        </Button>
      </div>
    </div>
  );
};

export default Frequencia;
