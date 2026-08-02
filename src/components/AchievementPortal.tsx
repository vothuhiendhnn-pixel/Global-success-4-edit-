import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Search, 
  Filter, 
  Send, 
  RefreshCw, 
  Award, 
  Star, 
  Medal, 
  GraduationCap, 
  CheckCircle2, 
  X, 
  Printer, 
  Sparkles, 
  UserCheck, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { 
  AchievementRecord, 
  GOOGLE_SHEETS_ACHIEVEMENT_API_URL, 
  fetchAchievementsFromGoogleSheets, 
  postAchievementToGoogleSheets 
} from '../utils/achievementApi';
import { UserProfile } from '../types';

interface AchievementPortalProps {
  profile: UserProfile;
  showToast?: (msg: string) => void;
}

export const AchievementPortal: React.FC<AchievementPortalProps> = ({ profile, showToast }) => {
  const [activePortalTab, setActivePortalTab] = useState<'lookup' | 'report'>('lookup');
  const [achievements, setAchievements] = useState<AchievementRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedTitle, setSelectedTitle] = useState('all');

  // Selected Record for Certificate Modal
  const [certificateRecord, setCertificateRecord] = useState<AchievementRecord | null>(null);

  // Form State for Reporting new achievement
  const [formStudentId, setFormStudentId] = useState('');
  const [formStudentName, setFormStudentName] = useState('');
  const [formStudentClass, setFormStudentClass] = useState('Lớp 4A');
  const [formActivityName, setFormActivityName] = useState('Kiểm Tra Bài Tập Tiếng Anh Unit');
  const [formScore, setFormScore] = useState('10/10');
  const [formTitle, setFormTitle] = useState('Hoa Điểm 10 - Xuất Sắc');
  const [formNote, setFormNote] = useState('Học sinh tích cực, hoàn thành tốt bài tập trên hệ thống.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Auto load achievements on mount
  const loadData = async () => {
    setIsLoading(true);
    const list = await fetchAchievementsFromGoogleSheets();
    setAchievements(list);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Preset Auto Fill for Teachers
  const handleApplyPreset = (preset: {
    score: string;
    title: string;
    activity: string;
    note: string;
  }) => {
    setFormScore(preset.score);
    setFormTitle(preset.title);
    setFormActivityName(preset.activity);
    setFormNote(preset.note);
  };

  // Submit Handler
  const handleSubmitAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStudentName.trim()) {
      alert('Vui lòng nhập Họ và tên học sinh!');
      return;
    }
    if (!formStudentClass.trim()) {
      alert('Vui lòng nhập Lớp học!');
      return;
    }

    setIsSubmitting(true);
    setFormSuccessMessage(null);

    const record: AchievementRecord = {
      studentId: formStudentId.trim() || `HS${Math.floor(100 + Math.random() * 900)}`,
      studentName: formStudentName.trim(),
      studentClass: formStudentClass.trim(),
      activityName: formActivityName.trim(),
      score: formScore.trim(),
      title: formTitle.trim(),
      note: formNote.trim(),
      date: new Date().toLocaleDateString('vi-VN')
    };

    const res = await postAchievementToGoogleSheets(record);

    setIsSubmitting(false);

    if (res.success) {
      setFormSuccessMessage(res.message);
      if (showToast) showToast(res.message);
      
      // Update local state and switch to lookup tab
      setAchievements((prev) => [record, ...prev]);

      // Reset form slightly
      setFormStudentName('');
      setFormStudentId('');
    } else {
      alert(res.message);
    }
  };

  // Filter Logic
  const filteredAchievements = achievements.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      item.studentName.toLowerCase().includes(q) ||
      item.studentId.toLowerCase().includes(q) ||
      item.activityName.toLowerCase().includes(q);

    const matchClass =
      selectedClass === 'all' || item.studentClass.toLowerCase() === selectedClass.toLowerCase();

    const matchTitle =
      selectedTitle === 'all' || item.title.toLowerCase().includes(selectedTitle.toLowerCase());

    return matchQuery && matchClass && matchTitle;
  });

  // Extract unique classes
  const availableClasses = Array.from(
    new Set(['Lớp 4A', 'Lớp 4B', 'Lớp 5A', 'Lớp 6A', 'Lớp 7A', 'Lớp 8A', ...achievements.map((a) => a.studentClass)])
  );

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-300/40 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Hệ Thống Công Bố 成績 Tra Cứu Google Sheets</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Trophy className="w-8 h-8 text-amber-300 shrink-0" />
            <span>BẢNG VÀNG THÀNH TÍCH HỌC SỰ</span>
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed">
            Tra cứu trực tiếp kết quả học tập, điểm số, danh hiệu khen thưởng và báo cáo thành tích mới gửi về Google Sheets.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono text-emerald-200 bg-black/20 p-2.5 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-bold">Google Sheets Web App API:</span>
            <span className="truncate max-w-xs sm:max-w-md opacity-90">{GOOGLE_SHEETS_ACHIEVEMENT_API_URL}</span>
          </div>
        </div>
      </div>

      {/* Primary Tabs */}
      <div className="flex bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/60 font-bold text-xs sm:text-sm">
        <button
          onClick={() => setActivePortalTab('lookup')}
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activePortalTab === 'lookup'
              ? 'bg-white text-emerald-800 shadow-md font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Search className="w-4 h-4 text-emerald-600" />
          <span>1. Tra Cứu & Xem Thành Tích</span>
        </button>

        <button
          onClick={() => setActivePortalTab('report')}
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activePortalTab === 'report'
              ? 'bg-white text-emerald-800 shadow-md font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Send className="w-4 h-4 text-emerald-600" />
          <span>2. Giáo Viên Báo Cáo (Lưu Sheets)</span>
        </button>
      </div>

      {/* TAB 1: TRA CỨU & XEM THÀNH TÍCH */}
      {activePortalTab === 'lookup' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Search Box */}
              <div className="sm:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập Mã học sinh (e.g. HS001) hoặc Họ tên..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Class Filter */}
              <div className="sm:col-span-3">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  <option value="all">Tất cả các Lớp</option>
                  {availableClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title Filter */}
              <div className="sm:col-span-4 flex gap-2">
                <select
                  value={selectedTitle}
                  onChange={(e) => setSelectedTitle(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  <option value="all">Tất cả Danh hiệu</option>
                  <option value="Hoa Điểm 10">Hoa Điểm 10 - Xuất Sắc</option>
                  <option value="Ngôi Sao">Ngôi Sao Từ Vựng</option>
                  <option value="Chiến Sĩ">Chiến Sĩ Phát Âm</option>
                  <option value="Học Sinh Giỏi">Học Sinh Giỏi</option>
                  <option value="Tiến Bộ">Tiến Bộ Vượt Bậc</option>
                </select>

                <button
                  onClick={loadData}
                  disabled={isLoading}
                  className="px-3 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center shrink-0"
                  title="Tải lại từ Google Sheets"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-center">
              <div className="p-2.5 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                <div className="text-[11px] font-bold text-slate-500">Tổng Thành Tích</div>
                <div className="text-lg font-black text-emerald-800">{achievements.length}</div>
              </div>
              <div className="p-2.5 bg-amber-50/70 rounded-2xl border border-amber-100">
                <div className="text-[11px] font-bold text-slate-500">Khen Thưởng Xuất Sắc</div>
                <div className="text-lg font-black text-amber-700">
                  {achievements.filter((a) => a.title.includes('Xuất Sắc') || a.title.includes('10')).length}
                </div>
              </div>
              <div className="p-2.5 bg-blue-50/70 rounded-2xl border border-blue-100">
                <div className="text-[11px] font-bold text-slate-500">Đang Hiển Thị</div>
                <div className="text-lg font-black text-blue-800">{filteredAchievements.length}</div>
              </div>
              <div className="p-2.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-center justify-center gap-1">
                <button
                  onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
                  className="w-full py-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Dạng: {viewMode === 'cards' ? 'Thẻ Đồ Họa' : 'Bảng Chi Tiết'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Achievements Display List */}
          {isLoading ? (
            <div className="text-center py-12 space-y-3 bg-white rounded-3xl border border-emerald-100">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-600">Đang tải dữ liệu thành tích từ Google Sheets API...</p>
            </div>
          ) : filteredAchievements.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
              <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Không tìm thấy thành tích phù hợp với từ khóa tra cứu.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedClass('all');
                  setSelectedTitle('all');
                }}
                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Xóa bộ lọc để xem lại toàn bộ
              </button>
            </div>
          ) : viewMode === 'cards' ? (
            /* Cards View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAchievements.map((item, idx) => {
                const isTop = idx < 3;
                return (
                  <div
                    key={item.id || idx}
                    className="bg-white rounded-3xl p-5 border border-emerald-100/90 shadow-xs hover:shadow-md transition-all space-y-4 relative overflow-hidden group"
                  >
                    {/* Top Ribbon */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-xs ${
                          idx === 0
                            ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-100'
                            : idx === 1
                            ? 'bg-slate-300 text-slate-900 ring-4 ring-slate-100'
                            : idx === 2
                            ? 'bg-amber-700 text-amber-50 ring-4 ring-amber-100'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                              {item.studentName}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {item.studentId}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-emerald-700">
                            {item.studentClass}
                          </div>
                        </div>
                      </div>

                      {/* Score Badge */}
                      <div className="bg-emerald-600 text-white font-black text-sm px-3 py-1.5 rounded-2xl shadow-xs shrink-0">
                        {item.score}
                      </div>
                    </div>

                    {/* Activity & Title */}
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{item.activityName}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
                        <Medal className="w-3.5 h-3.5 text-amber-600" />
                        <span>Danh Hiệu: {item.title}</span>
                      </div>

                      {item.note && (
                        <p className="text-[11px] font-medium text-slate-600 italic">
                          "{item.note}"
                        </p>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium text-[11px]">
                        📅 {item.date || 'Hôm nay'}
                      </span>

                      <button
                        onClick={() => setCertificateRecord(item)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Xem Giấy Báo / Bằng Khen</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <div className="bg-white rounded-3xl border border-emerald-100 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100/80 text-slate-700 font-extrabold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Mã HS</th>
                      <th className="p-3.5">Họ và Tên</th>
                      <th className="p-3.5">Lớp</th>
                      <th className="p-3.5">Hoạt Động</th>
                      <th className="p-3.5 text-center">Điểm</th>
                      <th className="p-3.5">Danh Hiệu</th>
                      <th className="p-3.5 text-right">Chi Tiết</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {filteredAchievements.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50 transition-all">
                        <td className="p-3.5 font-mono text-xs font-bold text-slate-500">{item.studentId}</td>
                        <td className="p-3.5 font-black text-slate-900">{item.studentName}</td>
                        <td className="p-3.5 font-bold text-emerald-700">{item.studentClass}</td>
                        <td className="p-3.5 text-slate-700 max-w-xs truncate">{item.activityName}</td>
                        <td className="p-3.5 text-center font-black text-emerald-700 bg-emerald-50/50">{item.score}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg text-xs border border-amber-200">
                            {item.title}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setCertificateRecord(item)}
                            className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-lg cursor-pointer"
                            title="Xem giấy chứng nhận"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: GIÁO VIÊN BÁO CÁO (POST RESULTS TO GOOGLE SHEETS) */}
      {activePortalTab === 'report' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-lg sm:text-xl">
              <Send className="w-6 h-6 text-emerald-600" />
              <h2>Nhập Báo Cáo Kết Quả Mới (Gửi Dữ Liệu Lưu Google Sheets)</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Khi giáo viên nhấn gửi, dữ liệu sẽ tự động thực hiện hàm <code className="bg-slate-100 px-1.5 py-0.5 rounded text-emerald-700 font-bold">fetch(URL_API, POST)</code> để ghi lại vào Google Sheets.
            </p>
          </div>

          {formSuccessMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>{formSuccessMessage}</span>
            </div>
          )}

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              ⚡ Nút Điền Nhanh (Mẫu Đánh Giá Điển Hình):
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  handleApplyPreset({
                    score: '10/10',
                    title: 'Hoa Điểm 10 - Xuất Sắc',
                    activity: 'Kiểm Tra Tổng Hợp Unit 1 - 4',
                    note: 'Phát âm chuẩn xác, làm bài nhanh và chính xác 100%!'
                  })
                }
                className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-200 cursor-pointer"
              >
                🌟 Mẫu 1: Điểm 10 - Xuất Sắc
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyPreset({
                    score: '95/100',
                    title: 'Ngôi Sao Từ Vựng',
                    activity: 'Thi Đấu Trợ Nhớ Từ Vựng AI',
                    note: 'Thuộc trên 30 từ mới theo chủ đề Unit.'
                  })
                }
                className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs rounded-xl border border-blue-200 cursor-pointer"
              >
                🚀 Mẫu 2: Ngôi Sao Từ Vựng
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyPreset({
                    score: '9/10',
                    title: 'Chiến Sĩ Phát Âm',
                    activity: 'Luyện Phát Âm Trực Tuyến',
                    note: 'Tiến bộ vượt bậc về trọng âm và intonation.'
                  })
                }
                className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl border border-emerald-200 cursor-pointer"
              >
                🎯 Mẫu 3: Chiến Sĩ Phát Âm
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitAchievement} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Student ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Mã Học Sinh (Mã HS)
                </label>
                <input
                  type="text"
                  value={formStudentId}
                  onChange={(e) => setFormStudentId(e.target.value)}
                  placeholder="Ví dụ: HS008"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Student Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Họ và Tên Học Sinh <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formStudentName}
                  onChange={(e) => setFormStudentName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Hoàng Anh"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Class */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Lớp Học <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formStudentClass}
                  onChange={(e) => setFormStudentClass(e.target.value)}
                  placeholder="Ví dụ: Lớp 4A"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Activity Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Tên Hoạt Động / Bài Kiểm Tra <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formActivityName}
                  onChange={(e) => setFormActivityName(e.target.value)}
                  placeholder="Ví dụ: Kiểm tra giữa kỳ / Luyện tập trắc nghiệm Unit 3"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Score */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Điểm Số / Tỷ Lệ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formScore}
                  onChange={(e) => setFormScore(e.target.value)}
                  placeholder="Ví dụ: 10/10 hoặc 98%"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title / Badge */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Danh Hiệu Khen Thưởng <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ví dụ: Hoa Điểm 10 - Xuất Sắc"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Teacher Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Lời Khen / Ghi Chú Của Giáo Viên
                </label>
                <input
                  type="text"
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  placeholder="Ghi nhận sự cố gắng của học sinh..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Đang gửi về Google Sheets...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Gửi Báo Cáo Thành Tích Lên Google Sheets</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* OFFICIAL CERTIFICATE POPUP MODAL */}
      {certificateRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 space-y-6 relative animate-scale-up">
            <button
              onClick={() => setCertificateRecord(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Printable Certificate Frame */}
            <div className="p-6 bg-gradient-to-b from-amber-50/80 to-emerald-50/50 rounded-2xl border-2 border-dashed border-amber-400 text-center space-y-4 relative">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-md ring-4 ring-amber-200">
                <Trophy className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-black tracking-widest text-amber-800 uppercase">
                  GIẤY CHỨNG NHẬN THÀNH TÍCH HỌC TẬP
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  {certificateRecord.studentName}
                </h2>
                <div className="text-sm font-bold text-emerald-800">
                  {certificateRecord.studentClass} • Mã HS: {certificateRecord.studentId}
                </div>
              </div>

              <div className="py-3 px-4 bg-white/90 rounded-2xl border border-amber-200 max-w-sm mx-auto space-y-2 shadow-xs">
                <div className="text-xs text-slate-500 font-bold">Thành tích đạt được tại:</div>
                <div className="font-extrabold text-slate-800 text-sm">{certificateRecord.activityName}</div>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <span className="px-3 py-1 bg-emerald-600 text-white font-black text-sm rounded-xl">
                    Điểm số: {certificateRecord.score}
                  </span>
                  <span className="px-3 py-1 bg-amber-400 text-amber-950 font-black text-sm rounded-xl">
                    {certificateRecord.title}
                  </span>
                </div>
              </div>

              {certificateRecord.note && (
                <p className="text-xs font-medium text-slate-600 italic px-4">
                  "{certificateRecord.note}"
                </p>
              )}

              <div className="pt-4 border-t border-amber-200/80 flex items-center justify-between text-[11px] text-slate-500 font-bold">
                <span>Ngày ghi nhận: {certificateRecord.date || 'Hôm nay'}</span>
                <span>Hệ Thống Quản Lý Giáo Dục</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>In / Lưu Giấy Khen</span>
              </button>
              <button
                onClick={() => setCertificateRecord(null)}
                className="px-6 py-3 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-2xl hover:bg-slate-50 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
