import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export interface EvaluationData {
  id: number;
  avaliado: string;
  avaliador: string;
  data: string;
}

export async function fetchEvaluations(): Promise<EvaluationData[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/forms`, {
      params: { limit: 100, offset: 0 },
      headers: {
        accept: 'application/json',
      },
    });

    const data = response.data;
    return data
      .map((evaluation: any) => ({
        id: evaluation.id,
        avaliado: evaluation.avaliado,
        avaliador: evaluation.avaliador,
        data: evaluation.data,
      }));
  } catch (error) {
    throw new Error(`Failed to fetch evaluation: ${error}`);
  }
}

export async function submitEvaluations(evaluations: EvaluationData): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/forms`, evaluations, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to submit attendance: ${JSON.stringify(error.response?.data || error)}`);
  }
}
