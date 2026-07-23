export interface Word {
  w: string;       // Word in English
  ipa: string;     // IPA pronunciation
  m: string;       // Vietnamese meaning
  example?: string; // Example sentence in Grade 4 context
}

export interface Unit {
  unit: number;
  topic: string;
  semester: 1 | 2;
  words: Word[];
}

export interface UserProfile {
  name: string;
  className: string;
  avatar: string;
  stars: number;
  masteredWords: string[]; // List of word keys e.g. "u1_America"
  completedUnits: number[]; // Unit numbers completed
  lastAccessedUnit: number;
  dailyTasksCompleted: { [dateKey: string]: string[] }; // task IDs completed on date
  soundEnabled: boolean;
  teacherCommendations?: { id: string; date: string; note: string; starsAwarded: number }[];
}

export interface DailyTask {
  id: string;
  title: string;
  desc: string;
  rewardStars: number;
  actionType: 'flashcard' | 'pronounce' | 'quiz';
  targetCount: number;
}

export interface SentenceExercise {
  id: string;
  unit: number;
  vietnamese: string;
  englishTokens: string[]; // Correct ordered words
  scrambledTokens: string[]; // Shuffled words
}

export interface StudentRecord {
  id: string;
  name: string;
  className: string;
  avatar: string;
  stars: number;
  masteredWordsCount: number;
  unitsCompleted: number[]; // e.g. [1, 2, 3]
  avgPronunciationScore: number; // e.g. 88%
  quizzesCompleted: number;
  lastActive: string; // e.g. "Hôm nay, 14:30"
  status: 'excellent' | 'good' | 'needs_improvement';
  teacherNotes?: string;
}

export interface TeacherConfig {
  assignedUnits: number[]; // Units assigned by teacher as mandatory homework
  passingPronunciationScore: number; // Threshold e.g. 80%
  dailyGoalWords: number; // e.g. 5 words per day
  deadlineDate?: string; // e.g. "30/11/2026"
  teacherName: string;
  classNote: string;
}

export interface FillInBlankQuestion {
  id: number;
  sentence: string;
  correct_answer: string;
}

export interface UnitExercisesData {
  unit_id: number;
  unit_title: string;
  sentence_unscramble: {
    id: number;
    words: string[];
    correct_answer: string;
  }[];
  fill_in_blanks: {
    word_bank: string[];
    questions: FillInBlankQuestion[];
  };
}


