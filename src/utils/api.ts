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

export interface GoogleSheetSubmissionPayload {
  studentName: string;
  studentClass: string;
  unitTitle: string;
  score: string | number;
  correctAnswers: string | number;
  skippedAnswers?: string | number;
  wrongAnswers?: string | number;
}

export async function submitToGoogleSheetApi(payload: GoogleSheetSubmissionPayload): Promise<boolean> {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxG-0FzIwJK4wwwdKjPjpST2OuCsqW8JMBBvAxQS3tVrnE49iJABHxW7yi3t_J2U38o/exec';
  const jsonBody = JSON.stringify({
    studentName: payload.studentName,
    studentClass: payload.studentClass,
    unitTitle: payload.unitTitle,
    score: payload.score,
    correctAnswers: payload.correctAnswers,
    skippedAnswers: payload.skippedAnswers ?? 0,
    wrongAnswers: payload.wrongAnswers ?? 0
  });

  try {
    // Standard POST fetch
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonBody,
      mode: 'no-cors'
    });
    return true;
  } catch (err) {
    console.warn('Google Script fetch error, retrying without no-cors mode:', err);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonBody
      });
      return true;
    } catch (err2) {
      console.error('Failed to submit to Google Script:', err2);
      return false;
    }
  }
}
