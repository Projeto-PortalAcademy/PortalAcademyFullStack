import React, { useState } from "react";
import IconButton from "../IconButton/button";
import PresenceStatus from "./PresenceStatus";
import { FaHistory, FaCommentAlt } from "react-icons/fa";

type Student = {
  id: number;
  name: string;
  status: "P" | "F";
};

type AttendanceTableProps = {
  students: Student[];
  onToggleStatus: (id: number) => void;
  onAddComment: (id: number) => void;
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  students,
  onToggleStatus,
  onAddComment,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSendAllAttendance = async () => {
    const requests = students.map((student) => {
      const payload = {
        user_id: student.id.toString(),
        date: selectedDate,
        is_present: student.status === "P",
        comment: "",
      };
  
      // Log do JSON antes de enviar
      console.log("Enviando payload para o aluno:", payload);
  
      return fetch("http://localhost:8080/attendances/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    });
  
    try {
      const responses = await Promise.all(requests);
      const failed = responses.filter((res) => !res.ok);
  
      if (failed.length === 0) {
        alert("Presença enviada para todos os alunos com sucesso!");
      } else {
        alert(`${failed.length} envios falharam.`);
      }
    } catch (error) {
      console.error("Error sending attendance:", error);
      alert("Erro ao enviar presença para todos os alunos.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6 space-x-2">
        <div>
          <span className="text-lg font-bold mr-4">Registrar dia:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-white px-4 py-2 rounded-md shadow-md border border-gray-300"
          />
        </div>
        <button
          onClick={handleSendAllAttendance}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Enviar Presença de Todos
        </button>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">Alunos</th>
            <th className="px-4 py-2 text-center">Presença</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-4 py-2 text-center flex justify-center items-center">
                {student.name}
              </td>
              <td className="px-4 py-2 text-center">
                <PresenceStatus
                  status={student.status}
                  onClick={() => onToggleStatus(student.id)}
                />
              </td>
              <td className="px-4 py-2 text-center flex justify-center items-center"></td>
              <td className="px-4 py-2 items-center">
                <IconButton
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  }}
                  texto=""
                  Icone={FaCommentAlt}
                  disableHover={true}
                  onClick={() => onAddComment(student.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
