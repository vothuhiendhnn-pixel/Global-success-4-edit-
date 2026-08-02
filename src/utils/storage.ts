import { UserProfile } from '../types';

const STORAGE_KEY = 'easy_english_ms_hien_v1';

export const DEFAULT_PROFILE: UserProfile = {
  name: "Nguyễn Văn A",
  className: "Lớp 4A",
  avatar: "student_boy_1",
  stars: 50, // Initial bonus stars
  masteredWords: [],
  completedUnits: [],
  lastAccessedUnit: 1,
  dailyTasksCompleted: {},
  soundEnabled: true
};

export function loadProfile(): UserProfile {
  let profile = DEFAULT_PROFILE;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        profile = { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
      }
    } catch {
      profile = DEFAULT_PROFILE;
    }

    // Parse URL query parameters if student name / class provided in URL link
    try {
      const params = new URLSearchParams(window.location.search);
      const urlName = params.get('name') || params.get('student') || params.get('studentName');
      const urlClass = params.get('class') || params.get('className') || params.get('studentClass');
      if (urlName) {
        profile = { ...profile, name: decodeURIComponent(urlName) };
      }
      if (urlClass) {
        profile = { ...profile, className: decodeURIComponent(urlClass) };
      }
    } catch {
      // URL parsing fallback
    }
  }
  return profile;
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Storage quota or error
  }
}

export function resetProfileData(): UserProfile {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_PROFILE;
}
