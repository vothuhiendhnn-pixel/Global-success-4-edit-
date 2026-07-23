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
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
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
