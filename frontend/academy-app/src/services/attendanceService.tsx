// services/attendanceService.ts

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
  const response = await fetch(`${API_BASE_URL}/users?limit=100&offset=0`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch students: ${response.status}`);
  }

  const data = await response.json();
  return data
    .filter((user: any) => user.roles === 'student')
    .map((student: any) => ({
      id: student.id,
      name: student.name,
      status: 'P',
      user_id: student.id,
    }));
}

export async function submitAttendance(attendance: Attendance): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/attendances`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(attendance),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to submit attendance: ${JSON.stringify(errorData)}`);
  }
}
