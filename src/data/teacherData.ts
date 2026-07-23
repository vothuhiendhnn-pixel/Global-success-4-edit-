import { StudentRecord, TeacherConfig } from '../types';

export const INITIAL_TEACHER_CONFIG: TeacherConfig = {
  assignedUnits: [1, 2, 3], // Assigned Unit 1, 2, 3 for active practice
  passingPronunciationScore: 80, // Default passing criteria 80%
  dailyGoalWords: 5,
  deadlineDate: 'Bảy 7 hàng tuần',
  teacherName: 'Cô Võ Thu Hiền',
  classNote: 'Các em hoàn thành Unit 1 - 3 và luyện phát âm AI đạt tối thiểu 80% nhé!'
};

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'std_01',
    name: 'Nguyễn Văn A (Tôi)',
    className: 'Lớp 4A',
    avatar: 'student_boy_1',
    stars: 85,
    masteredWordsCount: 28,
    unitsCompleted: [1, 2],
    avgPronunciationScore: 88,
    quizzesCompleted: 12,
    lastActive: 'Hôm nay, 08:15',
    status: 'excellent',
    teacherNotes: 'Học sinh tiến bộ rất nhanh, phát âm chuẩn!'
  },
  {
    id: 'std_02',
    name: 'Trần Thị Bảo Ngọc',
    className: 'Lớp 4A',
    avatar: 'student_girl_1',
    stars: 120,
    masteredWordsCount: 36,
    unitsCompleted: [1, 2, 3],
    avgPronunciationScore: 94,
    quizzesCompleted: 18,
    lastActive: 'Hôm nay, 07:45',
    status: 'excellent',
    teacherNotes: 'Top 1 lớp 4A, tích cực phát biểu.'
  },
  {
    id: 'std_03',
    name: 'Lê Minh Khôi',
    className: 'Lớp 4A',
    avatar: 'student_boy_2',
    stars: 65,
    masteredWordsCount: 18,
    unitsCompleted: [1],
    avgPronunciationScore: 76,
    quizzesCompleted: 8,
    lastActive: 'Hôm qua',
    status: 'good',
    teacherNotes: 'Cần chú ý luyện lại phát âm âm /θ/ và /ð/.'
  },
  {
    id: 'std_04',
    name: 'Phạm Phương Anh',
    className: 'Lớp 4A',
    avatar: 'student_girl_2',
    stars: 95,
    masteredWordsCount: 30,
    unitsCompleted: [1, 2],
    avgPronunciationScore: 90,
    quizzesCompleted: 15,
    lastActive: 'Hôm nay, 09:10',
    status: 'excellent',
    teacherNotes: 'Làm bài tập trắc nghiệm và xếp câu rất tốt.'
  },
  {
    id: 'std_05',
    name: 'Hoàng Đức Gia Bách',
    className: 'Lớp 4A',
    avatar: 'student_boy_3',
    stars: 40,
    masteredWordsCount: 12,
    unitsCompleted: [],
    avgPronunciationScore: 68,
    quizzesCompleted: 5,
    lastActive: '3 ngày trước',
    status: 'needs_improvement',
    teacherNotes: 'Cần giáo viên nhắc nhở ôn tập thêm Unit 1.'
  },
  {
    id: 'std_06',
    name: 'Vũ Thảo Nguyên',
    className: 'Lớp 4B',
    avatar: 'student_girl_3',
    stars: 110,
    masteredWordsCount: 34,
    unitsCompleted: [1, 2, 3],
    avgPronunciationScore: 92,
    quizzesCompleted: 16,
    lastActive: 'Hôm nay, 06:30',
    status: 'excellent',
    teacherNotes: 'Chăm chỉ hoàn thành nhiệm vụ hàng ngày.'
  },
  {
    id: 'std_07',
    name: 'Đặng Tuấn Kiệt',
    className: 'Lớp 4B',
    avatar: 'student_boy_1',
    stars: 55,
    masteredWordsCount: 15,
    unitsCompleted: [1],
    avgPronunciationScore: 72,
    quizzesCompleted: 7,
    lastActive: 'Hôm qua',
    status: 'good',
    teacherNotes: 'Đã thuộc từ vựng chỉ quốc gia.'
  },
  {
    id: 'std_08',
    name: 'Bùi Mai Chi',
    className: 'Lớp 4B',
    avatar: 'student_girl_1',
    stars: 30,
    masteredWordsCount: 8,
    unitsCompleted: [],
    avgPronunciationScore: 62,
    quizzesCompleted: 3,
    lastActive: '5 ngày trước',
    status: 'needs_improvement',
    teacherNotes: 'Cần hỗ trợ ghép từ tiếng Anh.'
  }
];

const TEACHER_CONFIG_KEY = 'easy_english_teacher_config_v1';
const TEACHER_STUDENTS_KEY = 'easy_english_teacher_students_v1';

export function loadTeacherConfig(): TeacherConfig {
  if (typeof window === 'undefined') return INITIAL_TEACHER_CONFIG;
  try {
    const raw = localStorage.getItem(TEACHER_CONFIG_KEY);
    if (!raw) return INITIAL_TEACHER_CONFIG;
    return { ...INITIAL_TEACHER_CONFIG, ...JSON.parse(raw) };
  } catch {
    return INITIAL_TEACHER_CONFIG;
  }
}

export function saveTeacherConfig(config: TeacherConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TEACHER_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving teacher config', e);
  }
}

export function loadStudentsList(): StudentRecord[] {
  if (typeof window === 'undefined') return INITIAL_STUDENTS;
  try {
    const raw = localStorage.getItem(TEACHER_STUDENTS_KEY);
    if (!raw) return INITIAL_STUDENTS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_STUDENTS;
  }
}

export function saveStudentsList(students: StudentRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TEACHER_STUDENTS_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving students list', e);
  }
}
