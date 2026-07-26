import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  CheckCircle2, 
  Star, 
  Award, 
  Sliders, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Sparkles, 
  MessageSquare, 
  Lock, 
  Unlock, 
  X, 
  BookOpen, 
  Mic, 
  FileText, 
  AlertTriangle,
  Send,
  Calendar,
  Check,
  RotateCcw
} from 'lucide-react';
import { StudentRecord, TeacherConfig, Unit } from '../types';
import { UNITS_DATA, AVATARS } from '../data/units';

interface TeacherDashboardProps {
  students: StudentRecord[];
  config: TeacherConfig;
  onUpdateConfig: (newConfig: TeacherConfig) => void;
  onUpdateStudents: (newStudents: StudentRecord[]) => void;
  onRewardStudent: (studentId: string, starsCount: number, note: string) => void;
  onClose?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  students,
  config,
  onUpdateConfig,
  onUpdateStudents,
  onRewardStudent,
}) => {
  // Passcode unlock state
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Filters
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Modals
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [rewardingStudent, setRewardingStudent] = useState<StudentRecord | null>(null);
  const [rewardStars, setRewardStars] = useState<number>(10);
  const [rewardNote, setRewardNote] = useState<string>('Giáo viên khen em chăm chỉ học bài!');
  const [isAddingStudent, setIsAddingStudent] = useState<boolean>(false);

  // Form for New Student
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newStudentClass, setNewStudentClass] = useState<string>('Lớp 4A');

  // Teacher Controls Edit state
  const [isEditingControls, setIsEditingControls] = useState<boolean>(false);
  const [editingConfig, setEditingConfig] = useState<TeacherConfig>(config);

  // Handle PIN unlock
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '') {
      setIsLocked(false);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Filter students
  const filteredStudents = students.filter(std => {
    const matchesClass = selectedClassFilter === 'all' || std.className === selectedClassFilter;
    const matchesStatus = selectedStatusFilter === 'all' || std.status === selectedStatusFilter;
    const matchesQuery = std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          std.className.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesStatus && matchesQuery;
  });

  // Calculate Class Metrics
  const totalStudents = students.length;
  const avgCompletion = Math.round(
    students.reduce((acc, curr) => acc + (curr.unitsCompleted.length / 20) * 100, 0) / (totalStudents || 1)
  );
  const totalMasteredWords = students.reduce((acc, curr) => acc + curr.masteredWordsCount, 0);
  const avgPronunciationScore = Math.round(
    students.reduce((acc, curr) => acc + curr.avgPronunciationScore, 0) / (totalStudents || 1)
  );
  const totalStarsEarned = students.reduce((acc, curr) => acc + curr.stars, 0);

  // Export CSV functionality
  const handleExportCSV = () => {
    const headers = ["STT", "Họ và Tên", "Lớp", "Bài học đã xong (Units)", "Từ vựng thuộc", "Điểm phát âm AI (%)", "Điểm Sao (⭐)", "Đánh giá", "Lần cuối học"];
    const rows = students.map((s, idx) => [
      idx + 1,
      `"${s.name}"`,
      `"${s.className}"`,
      `"${s.unitsCompleted.join(', ') || 'Chưa có'}"`,
      s.masteredWordsCount,
      `${s.avgPronunciationScore}%`,
      s.stars,
      s.status === 'excellent' ? 'Hoàn thành xuất sắc' : s.status === 'good' ? 'Khá tốt' : 'Cần cố gắng',
      `"${s.lastActive}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bao_Cao_Tieng_Anh_Lop_4_${config.teacherName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save new student
  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newStudent: StudentRecord = {
      id: `std_${Date.now()}`,
      name: newStudentName.trim(),
      className: newStudentClass,
      avatar: 'student_boy_1',
      stars: 50,
      masteredWordsCount: 0,
      unitsCompleted: [],
      avgPronunciationScore: 0,
      quizzesCompleted: 0,
      lastActive: 'Vừa khởi tạo',
      status: 'good',
      teacherNotes: 'Học sinh mới thêm vào hệ thống.'
    };

    onUpdateStudents([...students, newStudent]);
    setNewStudentName('');
    setIsAddingStudent(false);
  };

  // Submit Reward
  const handleSendRewardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardingStudent) return;

    onRewardStudent(rewardingStudent.id, rewardStars, rewardNote);
    
    // Update local state note
    const updated = students.map(s => {
      if (s.id === rewardingStudent.id) {
        return {
          ...s,
          stars: s.stars + rewardStars,
          teacherNotes: `[Thưởng ${rewardStars}⭐]: ${rewardNote}`
        };
      }
      return s;
    });
    onUpdateStudents(updated);
    setRewardingStudent(null);
  };

  // Toggle assigned unit in config
  const handleToggleAssignedUnit = (unitNum: number) => {
    const current = editingConfig.assignedUnits;
    let updated: number[];
    if (current.includes(unitNum)) {
      updated = current.filter(u => u !== unitNum);
    } else {
      updated = [...current, unitNum].sort((a, b) => a - b);
    }
    setEditingConfig(prev => ({ ...prev, assignedUnits: updated }));
  };

  // Save Config changes
  const handleSaveConfigChanges = () => {
    onUpdateConfig(editingConfig);
    setIsEditingControls(false);
  };

  // Locked PIN Screen
  if (isLocked) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm max-w-md mx-auto text-center space-y-6 my-8">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8 text-emerald-600" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-900">Góc Quản Lý Của Giáo Viên</h2>
          <p className="text-xs text-slate-500">
            Dành riêng cho giáo viên <strong>{config.teacherName}</strong> kiểm soát thống kê và phân công bài tập cho học sinh.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block text-left">
              Mã PIN Giáo Viên (Mặc định: 1234):
            </label>
            <input
              type="password"
              placeholder="Nhập 1234 để mở khóa..."
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            {pinError && (
              <p className="text-xs text-rose-500 font-bold pt-1">
                Mã PIN chưa đúng! Nhập <strong>1234</strong> hoặc để trống để tiếp tục.
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsLocked(false)}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl cursor-pointer"
            >
              Vào trực tiếp
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Xác nhận Mã PIN</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Teacher Welcome Header Banner */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-300/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-100">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Hệ thống Quản lý Giáo Viên • Tiếng Anh Lớp 4</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Chào cô {config.teacherName}! 👩‍🏫
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl leading-relaxed">
            Nắm toàn quyền kiểm soát số lượng thống kê, giám sát quá trình học, giao bài tập trọng tâm và khen thưởng cho các con.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 z-10">
          <div className="flex items-center gap-1.5 bg-emerald-800/60 border border-emerald-400/40 px-3 py-1.5 rounded-2xl text-[11px] font-bold text-emerald-100 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
            <span>Tự động lưu tên & tiến trình từ link học sinh</span>
          </div>

          <button
            onClick={() => setIsEditingControls(true)}
            className="px-3.5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs rounded-2xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>Cấu Hình Bài Tập</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-emerald-800/80 hover:bg-emerald-800 text-white border border-emerald-400/30 font-bold text-xs rounded-2xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-200" />
            <span>Xuất Báo Cáo Excel</span>
          </button>
        </div>
      </div>

      {/* 4 Key Class Analytics Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Sĩ số Học sinh</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalStudents}</div>
          <span className="text-[11px] text-emerald-600 font-semibold block">2 Lớp (Lớp 4A & 4B)</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Tiến độ Hoàn thành</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-2xl">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{avgCompletion}%</div>
          <span className="text-[11px] text-blue-600 font-semibold block">Trung bình toàn khối 4</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Phát âm AI Chuẩn</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-2xl">
              <Mic className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{avgPronunciationScore}%</div>
          <span className="text-[11px] text-purple-600 font-semibold block">Mục tiêu cô đề ra: ≥{config.passingPronunciationScore}%</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Tổng Sao Khen Thưởng</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-2xl">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalStarsEarned} ⭐</div>
          <span className="text-[11px] text-amber-600 font-semibold block">Đã tích lũy cả lớp</span>
        </div>
      </div>

      {/* Active Homework & Class Notification Bar */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-700" />
            <h3 className="font-bold text-slate-900 text-sm">
              Nhiệm Vụ Trọng Tâm Tuần Này (Do Giáo Viên Ấn Định):
            </h3>
          </div>

          <span className="text-xs font-extrabold text-amber-900 bg-amber-200/60 px-3 py-1 rounded-full">
            Hạn chót: {config.deadlineDate || 'Hàng tuần'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-slate-700">Các bài học bắt buộc:</span>
          {config.assignedUnits.map(unitNum => {
            const unitObj = UNITS_DATA.find(u => u.unit === unitNum);
            return (
              <span
                key={unitNum}
                className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Unit {unitNum}: {unitObj?.topic || ''}
              </span>
            );
          })}
        </div>

        {config.classNote && (
          <p className="text-xs text-slate-600 italic bg-white p-3 rounded-2xl border border-amber-100">
            💬 <strong>Lời nhắn của cô:</strong> "{config.classNote}"
          </p>
        )}
      </div>

      {/* Student Progress Roster Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Thống Kê Tiến Độ Chi Tiết Theo Học Sinh ({filteredStudents.length} học sinh)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Kiểm soát số lượng từ thuộc, điểm phát âm AI, số bài trắc nghiệm đã làm của từng học sinh.
            </p>
          </div>

          <button
            onClick={() => setIsAddingStudent(true)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-2xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Học Sinh Mới</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-2">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            {/* Class Filter */}
            <select
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
            >
              <option value="all">Tất cả các Lớp</option>
              <option value="Lớp 4A">Chỉ Lớp 4A</option>
              <option value="Lớp 4B">Chỉ Lớp 4B</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
            >
              <option value="all">Tất cả Trạng thái</option>
              <option value="excellent">Xuất sắc (Top 🌟)</option>
              <option value="good">Khá / Đang tiến bộ</option>
              <option value="needs_improvement">Cần cố gắng ⚠️</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm tên học sinh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Roster Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Họ & Tên</th>
                <th className="py-3.5 px-3">Lớp</th>
                <th className="py-3.5 px-3">Từ vựng thuộc</th>
                <th className="py-3.5 px-3">Bài học đã xong</th>
                <th className="py-3.5 px-3">Phát âm AI</th>
                <th className="py-3.5 px-3">Điểm Sao</th>
                <th className="py-3.5 px-3">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác Giáo viên</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredStudents.map((std) => {
                const avatarObj = AVATARS.find(a => a.id === std.avatar) || AVATARS[0];
                return (
                  <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Student Name */}
                    <td className="py-3.5 px-4 flex items-center gap-2.5">
                      <span className="text-xl">{avatarObj.emoji}</span>
                      <div>
                        <span className="font-bold text-slate-900 block">{std.name}</span>
                        <span className="text-[10px] text-slate-400 block">{std.lastActive}</span>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="py-3.5 px-3 font-semibold text-slate-600">
                      {std.className}
                    </td>

                    {/* Mastered Words */}
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        {std.masteredWordsCount} từ
                      </span>
                    </td>

                    {/* Units Completed */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-800">{std.unitsCompleted.length}/20 Units</span>
                        <span className="text-[10px] text-slate-400">({Math.round((std.unitsCompleted.length / 20) * 100)}%)</span>
                      </div>
                    </td>

                    {/* Pronunciation Score */}
                    <td className="py-3.5 px-3">
                      <span className={`font-bold px-2.5 py-1 rounded-full text-xs ${
                        std.avgPronunciationScore >= config.passingPronunciationScore
                          ? 'bg-purple-50 text-purple-700 border border-purple-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {std.avgPronunciationScore}%
                      </span>
                    </td>

                    {/* Stars */}
                    <td className="py-3.5 px-3 font-bold text-amber-600 flex items-center gap-1">
                      <span>⭐</span>
                      <span>{std.stars}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      {std.status === 'excellent' && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          🌟 Xuất sắc
                        </span>
                      )}
                      {std.status === 'good' && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                          👍 Tốt
                        </span>
                      )}
                      {std.status === 'needs_improvement' && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                          ⚠️ Cần cố gắng
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedStudent(std)}
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors cursor-pointer"
                          title="Xem tiến độ chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setRewardingStudent(std);
                            setRewardStars(10);
                            setRewardNote('Giáo viên khen em phát âm tốt!');
                          }}
                          className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors cursor-pointer"
                          title="Khen thưởng Sao"
                        >
                          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: EDIT TEACHER CONTROLS & ASSIGNED UNITS */}
      {isEditingControls && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                <span>Cấu Hình Bài Tập & Quyền Giáo Viên</span>
              </h3>
              <button
                onClick={() => setIsEditingControls(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Teacher Name */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Tên Giáo Viên:</label>
                <input
                  type="text"
                  value={editingConfig.teacherName}
                  onChange={(e) => setEditingConfig({ ...editingConfig, teacherName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold"
                />
              </div>

              {/* Pronunciation Passing Threshold */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  Tiêu chuẩn điểm Phát âm AI đạt yêu cầu (%):
                </label>
                <select
                  value={editingConfig.passingPronunciationScore}
                  onChange={(e) => setEditingConfig({ ...editingConfig, passingPronunciationScore: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold text-slate-800"
                >
                  <option value={70}>70% (Tiêu chuẩn cơ bản)</option>
                  <option value={80}>80% (Khuyến nghị - Khá chuẩn)</option>
                  <option value={85}>85% (Chuẩn nâng cao)</option>
                  <option value={90}>90% (Xuất sắc)</option>
                </select>
              </div>

              {/* Deadline Date */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Hạn chót bài tập tuần:</label>
                <input
                  type="text"
                  value={editingConfig.deadlineDate || ''}
                  onChange={(e) => setEditingConfig({ ...editingConfig, deadlineDate: e.target.value })}
                  placeholder="VD: Chủ Nhật 20:00"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold"
                />
              </div>

              {/* Assign Units Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-900 block text-sm">
                  Chọn các Unit bài tập bắt buộc học sinh phải hoàn thành:
                </label>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
                  {UNITS_DATA.map((u) => {
                    const isChecked = editingConfig.assignedUnits.includes(u.unit);
                    return (
                      <label
                        key={u.unit}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleAssignedUnit(u.unit)}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <span className="truncate">Unit {u.unit}: {u.topic}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Teacher Announcement Note */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Lời nhắn / Nhắc nhở của cô tới học sinh:</label>
                <textarea
                  rows={2}
                  value={editingConfig.classNote}
                  onChange={(e) => setEditingConfig({ ...editingConfig, classNote: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl font-semibold"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingControls(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSaveConfigChanges}
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xs"
                >
                  Lưu Cấu Hình
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: REWARD STUDENT WITH STARS & COMMENDATION */}
      {rewardingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span>Khen Thưởng Học Sinh</span>
              </h3>
              <button
                onClick={() => setRewardingStudent(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendRewardSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3">
                <span className="text-3xl">⭐</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{rewardingStudent.name}</h4>
                  <p className="text-xs text-amber-800 font-semibold">{rewardingStudent.className} • Điểm hiện tại: {rewardingStudent.stars}⭐</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Số Sao khen thưởng gửi trực tiếp:</label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRewardStars(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        rewardStars === num
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      +{num} ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Lời tuyên dương / Lời nhắn của giáo viên:</label>
                <textarea
                  rows={2}
                  value={rewardNote}
                  onChange={(e) => setRewardNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRewardingStudent(null)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl hover:bg-slate-50"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-2xl shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Thưởng ⭐</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: STUDENT INDIVIDUAL DETAILED REPORT */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {(AVATARS.find(a => a.id === selectedStudent.avatar) || AVATARS[0]).emoji}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{selectedStudent.className} • Lần cuối học: {selectedStudent.lastActive}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Individual Statistics Breakdown */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[10px] text-emerald-800 font-bold block uppercase">Từ vựng thuộc</span>
                <span className="text-xl font-black text-emerald-700">{selectedStudent.masteredWordsCount} từ</span>
              </div>

              <div className="bg-purple-50 p-3 rounded-2xl border border-purple-100">
                <span className="text-[10px] text-purple-800 font-bold block uppercase">Phát âm AI</span>
                <span className="text-xl font-black text-purple-700">{selectedStudent.avgPronunciationScore}%</span>
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100">
                <span className="text-[10px] text-amber-800 font-bold block uppercase">Điểm Sao</span>
                <span className="text-xl font-black text-amber-700">{selectedStudent.stars} ⭐</span>
              </div>
            </div>

            {/* Unit Completion Progress Matrix */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Tiến độ 20 Unit học kỳ 1 & 2:
              </h4>

              <div className="grid grid-cols-5 gap-2">
                {UNITS_DATA.map((u) => {
                  const isDone = selectedStudent.unitsCompleted.includes(u.unit);
                  return (
                    <div
                      key={u.unit}
                      className={`p-2 rounded-xl text-center text-xs font-bold border ${
                        isDone
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div>U{u.unit}</div>
                      <div className="text-[9px] font-normal truncate">{isDone ? 'Đã xong' : 'Chưa học'}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Teacher Notes Log */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-700 block">Nhận xét của {config.teacherName}:</span>
              <p className="text-xs text-slate-600 font-medium">
                "{selectedStudent.teacherNotes || 'Chưa có ghi chú đặc biệt.'}"
              </p>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl"
            >
              Đóng Báo Cáo
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD NEW STUDENT */}
      {isAddingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <span>Thêm Học Sinh Vào Lớp</span>
              </h3>
              <button
                onClick={() => setIsAddingStudent(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Họ và Tên Học Sinh:</label>
                <input
                  type="text"
                  placeholder="VD: Nguyễn Hoàng Anh"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Lớp:</label>
                <select
                  value={newStudentClass}
                  onChange={(e) => setNewStudentClass(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Lớp 4A">Lớp 4A</option>
                  <option value="Lớp 4B">Lớp 4B</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingStudent(false)}
                  className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-2xl shadow-xs"
                >
                  Thêm Học Sinh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
