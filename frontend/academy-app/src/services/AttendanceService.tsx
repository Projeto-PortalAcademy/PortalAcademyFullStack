import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export interface Student {
  id: string;
  name: string;
  status: "P" | "F";
  user_id: string;
  observation?: string;
}

export interface Attendance {
  user_id: string;
  date: string;
  is_present: boolean;
  comment: string;
}

export async function fetchStudents(): Promise<Student[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      params: { limit: 100, offset: 0 },
      headers: {
        accept: 'application/json',
      },
    });

    const data = response.data;
    return data
      .filter((user: any) => user.roles === 'student')
      .map((student: any) => ({
        id: student.id,
        name: student.name,
        status: 'P',
        user_id: student.id,
      }));
  } catch (error) {
    throw new Error(`Failed to fetch students: ${error}`);
  }
}

export async function submitAttendance(attendance: Attendance): Promise<void> {
  try {
    await axios.post(`${API_BASE_URL}/attendances`, attendance, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to submit attendance: ${JSON.stringify(error.response?.data || error)}`);
  }
}
