import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';
import { UNITS_DATA, AVATARS } from '../data/units';

interface DashboardProps {
  profile: UserProfile;
  onSelectUnit: (unitNumber: number) => void;
  onNavigateUnits: () => void;
  onNavigateDictionary: () => void;
  onOpenProfile: () => void;
  onCompleteTask: (taskId: string, rewardStars: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  onSelectUnit,
  onNavigateUnits,
  onNavigateDictionary,
  onOpenProfile,
  onCompleteTask
}) => {
  // Calculate total words in course
  const totalWordsInCourse = UNITS_DATA.reduce((acc, u) => acc + u.words.length, 0);
  const masteredCount = profile.masteredWords.length;
  const progressPercent = Math.min(100, Math.round((masteredCount / totalWordsInCourse) * 100));

  // Current/Last accessed unit
  const currentUnitObj = UNITS_DATA.find(u => u.unit === profile.lastAccessedUnit) || UNITS_DATA[0];

  // Current student avatar
  const avatarObj = AVATARS.find(a => a.id === profile.avatar) || AVATARS[0];

  // Daily Tasks completion state for today
  const todayKey = new Date().toISOString().slice(0, 10);
  const completedTodayList = profile.dailyTasksCompleted[todayKey] || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Student Profile & Learning Progress Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <button
            onClick={onOpenProfile}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-md hover:scale-105 transition-transform cursor-pointer shrink-0"
            title="Thay đổi thông tin học sinh"
          >
            {avatarObj.emoji}
          </button>
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 mb-1">
              <span>📚 Tiếng Anh Lớp 4</span>
              {profile.className && <span>• {profile.className}</span>}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {profile.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium pt-0.5">
              Học từ vựng, phát âm IPA và làm bài tập theo chương trình sách giáo khoa
            </p>
          </div>
        </div>

        {/* Total Stars Counter & Progress Box */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-center gap-3 shadow-2xs">
            <span className="text-3xl">⭐</span>
            <div>
              <div className="text-2xl font-black text-amber-800">{profile.stars}</div>
              <div className="text-[10px] uppercase font-bold text-amber-700/80 tracking-wider">Sao tích lũy</div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex flex-col justify-center min-w-[140px]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Tiến độ</span>
              <span className="text-sm font-black text-emerald-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-emerald-100">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Learning Unit Hero Banner */}
      <div className="bg-blue-600 rounded-[2.5rem] p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-xl relative overflow-hidden">
        <div className="z-10 max-w-lg">
          <span className="bg-blue-400/30 text-blue-50 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block">
            Bài học gần nhất
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 mb-1 tracking-tight">
            Unit {currentUnitObj.unit}: {currentUnitObj.topic}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm opacity-90 mb-5">
            {currentUnitObj.words.length} từ vựng mới • Phát âm IPA & 4 dạng bài tập rèn luyện
          </p>
          <button
            onClick={() => onSelectUnit(currentUnitObj.unit)}
            className="bg-white text-blue-600 px-6 py-2.5 rounded-full font-bold text-sm sm:text-base shadow-lg hover:bg-blue-50 transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Vào học ngay bài này</span>
          </button>
        </div>

        <div className="z-10 w-28 h-28 sm:w-36 sm:h-36 bg-white/10 rounded-full flex items-center justify-center text-4xl sm:text-5xl mt-4 sm:mt-0 shrink-0 self-center sm:self-auto border border-white/20">
          🌍
        </div>

        {/* Background Decorative Circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500 rounded-full opacity-50 pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-700 rounded-full opacity-50 pointer-events-none" />
      </div>

      {/* Course Units Directory List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div>
            <h3 className="text-xl font-black text-slate-900">Danh sách bài tập & Units học tập</h3>
            <p className="text-xs text-slate-500">Bấm vào từng Unit để học từ vựng, luyện phát âm và làm bài tập</p>
          </div>
          <button
            onClick={onNavigateUnits}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 cursor-pointer"
          >
            <span>Tất cả 20 units</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {UNITS_DATA.map((u) => {
            const icon = u.unit === 1 ? '🌍' : u.unit === 2 ? '⏰' : u.unit === 3 ? '📅' : u.unit === 4 ? '🎂' : u.unit === 5 ? '🎸' : '🏫';
            const colorBg = u.unit % 4 === 1 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : u.unit % 4 === 2 ? 'bg-blue-50 text-blue-600 border-blue-100' : u.unit % 4 === 3 ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-amber-50 text-amber-600 border-amber-100';

            return (
              <div
                key={u.unit}
                onClick={() => onSelectUnit(u.unit)}
                className="bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-5 flex items-center gap-4 transition-all cursor-pointer group shadow-2xs hover:shadow-md hover:-translate-y-0.5"
              >
                <div className={`w-12 h-12 ${colorBg} rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform border`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">
                    Unit {u.unit}
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">
                    {u.topic}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium truncate">
                    {u.words.length} từ vựng Lớp 4
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all shrink-0">
                  →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

