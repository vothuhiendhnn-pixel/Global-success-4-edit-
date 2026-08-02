import { StudentRecord } from '../types';

export const GOOGLE_SHEETS_ACHIEVEMENT_API_URL = "https://script.google.com/macros/s/AKfycbw4UVH6PyH58NDPZkWYXuGVuOuuq9mO-QCT48lqJLkkCvcPTFZbEcEnsixiXZ76Hq8Gqw/exec";

export interface AchievementRecord {
  id?: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  activityName: string;
  score: string | number;
  title: string; // e.g. "Học sinh xuất sắc", "Hoa Điểm 10", "Ngôi Sao Từ Vựng"
  date?: string;
  note?: string;
}

// Initial fallback achievements data
export const INITIAL_ACHIEVEMENTS: AchievementRecord[] = [
  {
    id: "ach_01",
    studentId: "HS001",
    studentName: "Nguyễn Văn A",
    studentClass: "Lớp 4A",
    activityName: "Kiểm tra Học Kỳ 1 & Unit 1 - 3",
    score: "10/10",
    title: "Hoa Điểm 10 - Xuất Sắc",
    date: "2026-08-01",
    note: "Phát âm chuẩn 95%, hoàn thành 100% bài tập trắc nghiệm!"
  },
  {
    id: "ach_02",
    studentId: "HS002",
    studentName: "Trần Thị Bảo Ngọc",
    studentClass: "Lớp 4A",
    activityName: "Đấu Trí Luyện Từ Vựng",
    score: "98/100",
    title: "Ngôi Sao Từ Vựng",
    date: "2026-07-28",
    note: "Top 1 Lớp 4A về số lượng từ vựng đã thuộc."
  },
  {
    id: "ach_03",
    studentId: "HS003",
    studentName: "Lê Minh Khôi",
    studentClass: "Lớp 4B",
    activityName: "Thử Thách Phát Âm AI",
    score: "92/100",
    title: "Chiến Sĩ Phát Âm",
    date: "2026-07-25",
    note: "Tiến bộ nhanh ở các âm khó /θ/ và /ð/."
  },
  {
    id: "ach_04",
    studentId: "HS004",
    studentName: "Phạm Phương Anh",
    studentClass: "Lớp 4A",
    activityName: "Bài Tập Xếp Câu Unit 2",
    score: "10/10",
    title: "Học Sinh Giỏi",
    date: "2026-07-24",
    note: "Xếp đúng 100% câu tiếng Anh ngay lần thử đầu tiên."
  },
  {
    id: "ach_05",
    studentId: "HS005",
    studentName: "Vũ Thảo Nguyên",
    studentClass: "Lớp 4B",
    activityName: "Thách Thức Trí Nhớ Memory Game",
    score: "100%",
    title: "Gương Mẫu Chăm Chỉ",
    date: "2026-07-20",
    note: "Tích cực rèn luyện hàng ngày."
  },
  {
    id: "ach_06",
    studentId: "HS006",
    studentName: "Hoàng Đức Gia Bách",
    studentClass: "Lớp 6A",
    activityName: "Kiểm Tra Ngữ Pháp Đột Xuất",
    score: "8.5/10",
    title: "Tiến Bộ Vượt Bậc",
    date: "2026-07-18",
    note: "Đã khắc phục hoàn toàn lỗi ghép câu."
  }
];

// GET: Fetch achievements list from Google Sheets API
export async function fetchAchievementsFromGoogleSheets(): Promise<AchievementRecord[]> {
  try {
    const res = await fetch(GOOGLE_SHEETS_ACHIEVEMENT_API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any, idx: number) => ({
          id: item.id || `sheet_${idx}_${Date.now()}`,
          studentId: item.studentId || item.studentCode || item.code || `HS00${idx + 1}`,
          studentName: item.studentName || item.name || item.fullName || 'Học sinh',
          studentClass: item.studentClass || item.className || item.class || 'Lớp 4A',
          activityName: item.activityName || item.unitTitle || item.activity || 'Bài tập tổng hợp',
          score: item.score || item.point || '10/10',
          title: item.title || item.badge || item.honor || 'Học Sinh Giỏi',
          date: item.date || new Date().toISOString().slice(0, 10),
          note: item.note || item.comment || ''
        }));
      }
    }
  } catch (err) {
    console.warn("Could not fetch directly from Google Sheets API (CORS/Network limit), using synced/fallback list:", err);
  }

  // Retrieve cached achievements from localStorage if present
  try {
    const local = localStorage.getItem("sheet_achievements_cache");
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}

  return INITIAL_ACHIEVEMENTS;
}

// POST: Submit a new achievement to Google Sheets
export async function postAchievementToGoogleSheets(
  record: AchievementRecord
): Promise<{ success: boolean; message: string }> {
  const payload = {
    studentId: record.studentId.trim(),
    studentName: record.studentName.trim(),
    studentClass: record.studentClass.trim(),
    activityName: record.activityName.trim(),
    score: record.score.toString().trim(),
    title: record.title.trim(),
    date: record.date || new Date().toLocaleDateString('vi-VN'),
    note: record.note ? record.note.trim() : ''
  };

  try {
    // 1. Try standard JSON POST
    await fetch(GOOGLE_SHEETS_ACHIEVEMENT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });

    // Save to local cache as well
    try {
      const local = localStorage.getItem("sheet_achievements_cache");
      const list: AchievementRecord[] = local ? JSON.parse(local) : INITIAL_ACHIEVEMENTS;
      const newRecord: AchievementRecord = {
        ...payload,
        id: `post_${Date.now()}`
      };
      const updated = [newRecord, ...list];
      localStorage.setItem("sheet_achievements_cache", JSON.stringify(updated));
    } catch {}

    return {
      success: true,
      message: `Đã gửi thành công kết quả của học sinh ${payload.studentName} (${payload.studentClass}) lên Google Sheets!`
    };
  } catch (error) {
    console.error("Error submitting achievement to Google Sheets:", error);
    return {
      success: false,
      message: "Gửi thất bại. Vui lòng kiểm tra lại kết nối mạng!"
    };
  }
}
