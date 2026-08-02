import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Directory and DB file path
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "students_db.json");

// Initial Fallback Data
const INITIAL_TEACHER_CONFIG = {
  assignedUnits: [1, 2, 3],
  passingPronunciationScore: 80,
  dailyGoalWords: 5,
  deadlineDate: 'Bảy 7 hàng tuần',
  teacherName: 'Cô Võ Thu Hiền',
  classNote: 'Các em hoàn thành Unit 1 - 3 và luyện phát âm AI đạt tối thiểu 80% nhé!'
};

const INITIAL_STUDENTS = [
  {
    id: 'std_01',
    name: 'Nguyễn Văn A',
    className: 'Lớp 4A',
    avatar: 'student_boy_1',
    stars: 85,
    masteredWordsCount: 28,
    masteredWords: ['u1_America', 'u1_England', 'u1_Australia', 'u1_Malaysia', 'u1_Vietnam', 'u1_Japan'],
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
    masteredWords: ['u1_America', 'u1_England', 'u2_Monday', 'u2_Tuesday', 'u2_Wednesday'],
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
    masteredWords: ['u1_Vietnam', 'u1_Japan'],
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
    masteredWords: ['u1_America', 'u1_England', 'u2_Thursday'],
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
    masteredWords: ['u1_Vietnam'],
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
    masteredWords: ['u1_America', 'u2_Friday'],
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
    masteredWords: ['u1_Japan'],
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
    masteredWords: [],
    unitsCompleted: [],
    avgPronunciationScore: 62,
    quizzesCompleted: 3,
    lastActive: '5 ngày trước',
    status: 'needs_improvement',
    teacherNotes: 'Cần hỗ trợ ghép từ tiếng Anh.'
  }
];

interface DBStructure {
  students: any[];
  config: any;
}

function initDB(): DBStructure {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialDB: DBStructure = {
        students: INITIAL_STUDENTS,
        config: INITIAL_TEACHER_CONFIG
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2), "utf-8");
      return initialDB;
    }

    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading DB file, resetting to defaults:", error);
    return {
      students: INITIAL_STUDENTS,
      config: INITIAL_TEACHER_CONFIG
    };
  }
}

function saveDB(dbData: DBStructure) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving DB file:", error);
  }
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GET /api/students - Fetch all student records & teacher config
app.get("/api/students", (req, res) => {
  const db = initDB();
  res.json({
    students: db.students,
    config: db.config
  });
});

// POST /api/students/sync - Record or update a student's profile & learning progress
app.post("/api/students/sync", (req, res) => {
  const profile = req.body;
  if (!profile || !profile.name) {
    return res.status(400).json({ error: "Thômg tin học sinh không hợp lệ" });
  }

  const db = initDB();
  const now = new Date();
  const timeString = `Hôm nay, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const studentName = profile.name.trim();
  const className = profile.className ? profile.className.trim() : 'Lớp 4A';

  // Find existing student by ID or exact Name+Class match
  let studentIndex = -1;
  if (profile.id) {
    studentIndex = db.students.findIndex(s => s.id === profile.id);
  }
  if (studentIndex === -1) {
    studentIndex = db.students.findIndex(
      s => s.name.toLowerCase() === studentName.toLowerCase() && s.className.toLowerCase() === className.toLowerCase()
    );
  }

  const masteredWordsCount = Array.isArray(profile.masteredWords) ? profile.masteredWords.length : 0;
  const unitsCompleted = Array.isArray(profile.completedUnits) ? profile.completedUnits : [];

  // Calculate avg pronunciation score if scores map exists
  let avgScore = 85;
  if (profile.pronunciationScores && typeof profile.pronunciationScores === 'object') {
    const scores = Object.values(profile.pronunciationScores) as number[];
    if (scores.length > 0) {
      avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
  }

  // Calculate status based on progress
  let status: 'excellent' | 'good' | 'needs_improvement' = 'good';
  if (masteredWordsCount >= 25 || unitsCompleted.length >= 2 || (profile.stars && profile.stars >= 100)) {
    status = 'excellent';
  } else if (masteredWordsCount < 10 && unitsCompleted.length === 0) {
    status = 'needs_improvement';
  }

  let studentId = profile.id;

  if (studentIndex >= 0) {
    // Update existing student
    const existing = db.students[studentIndex];
    studentId = existing.id;

    db.students[studentIndex] = {
      ...existing,
      name: studentName,
      className: className,
      avatar: profile.avatar || existing.avatar || 'student_boy_1',
      stars: Math.max(existing.stars, profile.stars || 0),
      masteredWordsCount: Math.max(existing.masteredWordsCount, masteredWordsCount),
      masteredWords: profile.masteredWords || existing.masteredWords || [],
      unitsCompleted: Array.from(new Set([...(existing.unitsCompleted || []), ...unitsCompleted])),
      avgPronunciationScore: Math.max(existing.avgPronunciationScore || 0, avgScore),
      quizzesCompleted: Math.max(existing.quizzesCompleted || 0, profile.quizzesCompletedCount || 0),
      lastActive: timeString,
      status: status
    };
  } else {
    // Create new student entry
    studentId = profile.id || `std_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newStudent = {
      id: studentId,
      name: studentName,
      className: className,
      avatar: profile.avatar || 'student_boy_1',
      stars: profile.stars || 50,
      masteredWordsCount: masteredWordsCount,
      masteredWords: profile.masteredWords || [],
      unitsCompleted: unitsCompleted,
      avgPronunciationScore: avgScore,
      quizzesCompleted: profile.quizzesCompletedCount || 1,
      lastActive: timeString,
      status: status,
      teacherNotes: 'Học sinh vừa truy cập và học trên ứng dụng.'
    };
    db.students.unshift(newStudent);
  }

  saveDB(db);

  res.json({
    success: true,
    studentId: studentId,
    students: db.students,
    config: db.config
  });
});

// GET /api/teacher/config
app.get("/api/teacher/config", (req, res) => {
  const db = initDB();
  res.json({ config: db.config });
});

// POST /api/teacher/config
app.post("/api/teacher/config", (req, res) => {
  const newConfig = req.body;
  if (!newConfig) return res.status(400).json({ error: "Invalid config" });

  const db = initDB();
  db.config = { ...db.config, ...newConfig };
  saveDB(db);

  res.json({ success: true, config: db.config });
});

// POST /api/teacher/reward - Reward student stars and note
app.post("/api/teacher/reward", (req, res) => {
  const { studentId, starsCount, note } = req.body;
  if (!studentId) return res.status(400).json({ error: "Missing studentId" });

  const db = initDB();
  const idx = db.students.findIndex(s => s.id === studentId);
  if (idx >= 0) {
    db.students[idx].stars += (starsCount || 10);
    db.students[idx].teacherNotes = note ? `[Cộng +${starsCount}⭐]: ${note}` : db.students[idx].teacherNotes;
    saveDB(db);
  }

  res.json({ success: true, students: db.students });
});

// POST /api/teacher/students - Update full student list
app.post("/api/teacher/students", (req, res) => {
  const { students } = req.body;
  if (!Array.isArray(students)) return res.status(400).json({ error: "Invalid students array" });

  const db = initDB();
  db.students = students;
  saveDB(db);

  res.json({ success: true, students: db.students });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
