"use client";
import React, { useState } from "react";
import EvaluationHeader from "@/components/EvaluationHeader/EvaluationHeader";
import FilterAndSearch from "@/components/FilterAndSearch/FilterAndSearch";
import EvaluationCard from "@/components/EvaluationCard/EvaluationCard";
import CreateEvaluationButton from "@/components/CreateEvaluationButton/CreateEvaluationButton";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { fetchEvaluations, EvaluationData, submitEvaluations } from "@/services/evaluationService";

export default function Home() {  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([
    { id: 1, avaliado: "Felipe Camargo", avaliador: "Rodney Rick", data: "05/11/2024" },
    { id: 2, avaliado: "Erick Cassoli", avaliador: "Rodney Rick", data: "28/10/2024" },
    { id: 3, avaliado: "Vinicius Lino", avaliador: "Thiago Kaijyama", data: "24/09/2024" },
    { id: 4, avaliado: "Vinicius Lino", avaliador: "Thiago Kaijyama", data: "24/09/2024" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    const loadEvaluations = async () => {
      try {
        const data = await fetchEvaluations();
        setEvaluations(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch evaluations"));
      } finally {
        setLoading(false);
      }
    };

    loadEvaluations();
  }, []);

  const handleSubmitEvaluations = async () => {
    setIsSubmitting(true);
    const currentDate = new Date().toISOString();

    for (const evaluation of evaluations) {

      try {
        await submitEvaluations({
          id: evaluation.id,
          avaliado: evaluation.avaliado,
          avaliador: evaluation.avaliador,
          data: currentDate,
        });
      } catch (error) {
        console.error("Erro ao enviar presença:", error);
      }
    }

    setIsSubmitting(false);
  };

  // Função para adicionar uma nova avaliação
  const addEvaluation = (newEvaluation: Omit<EvaluationData, "id">) => {
    setEvaluations((prev) => [
      ...prev,
      { id: prev.length + 1, ...newEvaluation }, // Adiciona com um ID incremental
    ]);
  };

  return (
    <ProtectedRoute>
    <div className="p-8">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-bold">Avaliações</h1>
      </div>

      {/* Header com Botões */}
      <EvaluationHeader />

      {/* Filtro e Barra de Pesquisa */}
      <FilterAndSearch />

      {/* Lista de Cards de Avaliação */}
      <div>
        {evaluations.map((evaluation) => (
          <EvaluationCard
            key={evaluation.id}
            id={evaluation.id}
            avaliado={evaluation.avaliado}
            avaliador={evaluation.avaliador}
            data={evaluation.data}
            onClick={(id) => console.log("Card clicado com ID: ", id)}
          />
        ))}
      </div>

      {/* Botão de Criar Avaliação */}
      <CreateEvaluationButton onCreate={handleSubmitEvaluations} />
    </div>
    </ProtectedRoute>
  );
}
