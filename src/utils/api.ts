import { UserProfile, StudentRecord, TeacherConfig } from '../types';

export async function syncStudentProgressApi(profile: UserProfile): Promise<{
  studentId?: string;
  students?: StudentRecord[];
  config?: TeacherConfig;
} | null> {
  try {
    const res = await fetch('/api/students/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Sync student API call failed, falling back to local:', err);
    return null;
  }
}

export async function fetchStudentsApi(): Promise<{ students: StudentRecord[]; config: TeacherConfig } | null> {
  try {
    const res = await fetch('/api/students');
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Fetch students API failed:', err);
    return null;
  }
}

export async function saveTeacherConfigApi(config: TeacherConfig): Promise<boolean> {
  try {
    const res = await fetch('/api/teacher/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function rewardStudentApi(studentId: string, starsCount: number, note: string): Promise<StudentRecord[] | null> {
  try {
    const res = await fetch('/api/teacher/reward', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, starsCount, note })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.students || null;
  } catch {
    return null;
  }
}

export async function updateStudentsApi(students: StudentRecord[]): Promise<boolean> {
  try {
    const res = await fetch('/api/teacher/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ students })
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const DEFAULT_GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw4UVH6PyH58NDPZkWYXuGVuOuuq9mO-QCT48lqJLkkCvcPTFZbEcEnsixiXZ76Hq8Gqw/exec";

export interface GoogleSheetSubmissionPayload {
  studentName: string;
  studentClass?: string;
  unitTitle: string;
  score: string | number;
  correctAnswers?: string | number;
  skippedAnswers?: string | number;
  wrongAnswers?: string | number;
  apiUrl?: string;
}

export async function submitToGoogleSheetApi(payload: GoogleSheetSubmissionPayload): Promise<boolean> {
  const targetUrl = payload.apiUrl || DEFAULT_GOOGLE_APPS_SCRIPT_URL;

  // Format timestamp: YYYY-MM-DD HH:mm:ss
  const now = new Date();
  const pad = (n: number) => (n < 10 ? '0' + n : n.toString());
  const formattedTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  // Format student name with class if available
  const fullName = payload.studentClass 
    ? `${payload.studentName} (${payload.studentClass})`
    : payload.studentName;

  // Build requested exact JSON payload
  const jsonBody = JSON.stringify({
    time: formattedTime,
    name: fullName,
    units: payload.unitTitle,
    score: typeof payload.score === 'number' ? `${payload.score}` : payload.score,
    // Extra fields if script accepts them
    correctAnswers: payload.correctAnswers,
    skippedAnswers: payload.skippedAnswers ?? 0,
    wrongAnswers: payload.wrongAnswers ?? 0
  });

  try {
    // Background async POST request
    fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonBody,
      mode: 'no-cors'
    }).catch((e) => console.warn('Background submission note:', e));

    return true;
  } catch (err) {
    console.warn('Background Google Sheet fetch error:', err);
    return false;
  }
}
