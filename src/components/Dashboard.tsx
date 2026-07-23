import React from 'react';
import { Play, Award, CheckCircle2, ArrowRight, Zap, Target, Calendar, GraduationCap } from 'lucide-react';
import { UserProfile, DailyTask, TeacherConfig } from '../types';
import { UNITS_DATA, AVATARS, DAILY_TASKS_TEMPLATE } from '../data/units';

interface DashboardProps {
  profile: UserProfile;
  teacherConfig?: TeacherConfig;
  onSelectUnit: (unitNumber: number) => void;
  onNavigateUnits: () => void;
  onNavigateDictionary: () => void;
  onOpenProfile: () => void;
  onCompleteTask: (taskId: string, rewardStars: number) => void;
  onNavigateTeacher?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  teacherConfig,
  onSelectUnit,
  onNavigateUnits,
  onNavigateDictionary,
  onOpenProfile,
  onCompleteTask,
  onNavigateTeacher
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
      {/* Teacher's Assigned Homework Announcement Card */}
      {teacherConfig && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 text-white rounded-3xl p-5 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shrink-0">
                👩‍🏫
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-100 bg-amber-700/40 px-2.5 py-0.5 rounded-full border border-amber-300/30">
                  Nhiệm vụ trọng tâm do {teacherConfig.teacherName} giao
                </span>
                <h3 className="text-base font-black leading-snug">
                  Bài Tập Bắt Buộc Tuần Này • Hạn chót: {teacherConfig.deadlineDate || 'Cuối tuần'}
                </h3>
              </div>
            </div>

            {onNavigateTeacher && (
              <button
                onClick={onNavigateTeacher}
                className="px-3.5 py-1.5 bg-white text-slate-800 hover:bg-slate-50 font-bold text-xs rounded-full shadow-2xs transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
              >
                Góc Giáo Viên ➔
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 relative z-10">
            <span className="text-xs font-semibold text-amber-100">Các bài cần hoàn thành:</span>
            {teacherConfig.assignedUnits.map((uNum) => {
              const uObj = UNITS_DATA.find(u => u.unit === uNum);
              return (
                <button
                  key={uNum}
                  onClick={() => onSelectUnit(uNum)}
                  className="px-3 py-1 bg-white/90 hover:bg-white text-emerald-800 font-extrabold text-xs rounded-xl shadow-2xs flex items-center gap-1 transition-transform hover:scale-105 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Unit {uNum}: {uObj?.topic}</span>
                </button>
              );
            })}
          </div>

          {teacherConfig.classNote && (
            <p className="text-xs text-amber-50 font-medium italic bg-black/10 p-2.5 rounded-xl border border-white/10 relative z-10">
              💬 "{teacherConfig.classNote}"
            </p>
          )}
        </div>
      )}

      {/* Top Section Grid: Student Profile (left 4 cols on desktop) & Hero Banner (right 8 cols on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Student Profile & Progress Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-emerald-50 space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onOpenProfile}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold shadow-md hover:scale-105 transition-transform cursor-pointer"
                title="Thay đổi ảnh đại diện"
              >
                {avatarObj.emoji}
              </button>
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-snug">
                  {profile.name}
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  {profile.className} • Tiếng Anh Lớp 4
                </p>
              </div>
            </div>

            {/* Progress Box */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Tiến độ học tập</span>
                <span className="text-lg font-black text-emerald-600">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-3">
              <div className="flex-1 bg-amber-50 border border-amber-100 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-2xl mb-1">⭐</span>
                <span className="text-xl font-black text-amber-700">{profile.stars}</span>
                <span className="text-[10px] uppercase font-bold text-amber-600/80 tracking-wider">Star Points</span>
              </div>
              <div className="flex-1 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-2xl mb-1">🔥</span>
                <span className="text-xl font-black text-blue-700">12</span>
                <span className="text-[10px] uppercase font-bold text-blue-600/80 tracking-wider">Day Streak</span>
              </div>
            </div>
          </div>

          {/* Today's Tasks Section */}
          <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Nhiệm vụ hôm nay</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                {completedTodayList.length}/{DAILY_TASKS_TEMPLATE.length}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              {DAILY_TASKS_TEMPLATE.map((task: DailyTask) => {
                const isDone = completedTodayList.includes(task.id);

                return (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                        isDone ? 'border-emerald-500 text-emerald-500 bg-emerald-50' : 'border-slate-300 text-slate-300'
                      }`}>
                        {isDone ? '✓' : ''}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                          {task.title}
                        </p>
                      </div>
                    </div>
                    {!isDone && (
                      <button
                        onClick={() => {
                          if (task.actionType === 'flashcard' || task.actionType === 'pronounce') {
                            onSelectUnit(profile.lastAccessedUnit);
                          } else {
                            onNavigateUnits();
                          }
                          onCompleteTask(task.id, task.rewardStars);
                        }}
                        className="text-[10px] font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                      >
                        +{task.rewardStars} ⭐
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => onSelectUnit(currentUnitObj.unit)}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Tiếp tục học ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Hero Banner & Lessons */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Active Learning Unit Hero Banner */}
          <div className="bg-blue-600 rounded-[2.5rem] p-8 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-xl relative overflow-hidden">
            <div className="z-10 max-w-md">
              <span className="bg-blue-400/30 text-blue-50 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block">
                Đang học tiếp
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-2 tracking-tight">
                Unit {currentUnitObj.unit}: {currentUnitObj.topic}
              </h2>
              <p className="text-blue-100 text-sm sm:text-base opacity-90 mb-6">
                Chương trình Lớp 4 • {currentUnitObj.words.length} từ vựng mới & phát âm chuẩn IPA
              </p>
              <button
                onClick={() => onSelectUnit(currentUnitObj.unit)}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-base sm:text-lg shadow-lg hover:bg-blue-50 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Bắt đầu học ngay</span>
              </button>
            </div>

            <div className="z-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full flex items-center justify-center text-[4rem] sm:text-[5rem] animate-pulse mt-4 sm:mt-0 shrink-0 self-center sm:self-auto">
              🌍
            </div>

            {/* Background Decorative Circles */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500 rounded-full opacity-50 pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-700 rounded-full opacity-50 pointer-events-none" />
          </div>

          {/* Featured Unit Category Quick Links */}
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-xl font-black text-slate-800">Danh mục bài học nổi bật</h3>
              <button
                onClick={onNavigateUnits}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 cursor-pointer"
              >
                <span>Xem tất cả 20 units</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {UNITS_DATA.slice(0, 4).map((u) => {
                const icon = u.unit === 1 ? '🌍' : u.unit === 2 ? '⏰' : u.unit === 3 ? '📅' : '🎂';
                const colorBg = u.unit === 1 ? 'bg-emerald-50 text-emerald-600' : u.unit === 2 ? 'bg-blue-50 text-blue-600' : u.unit === 3 ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600';

                return (
                  <div
                    key={u.unit}
                    onClick={() => onSelectUnit(u.unit)}
                    className="bg-white border border-slate-200 hover:border-emerald-300 rounded-3xl p-5 flex items-center gap-4 transition-all cursor-pointer group shadow-2xs hover:shadow-md"
                  >
                    <div className={`w-14 h-14 ${colorBg} rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform`}>
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                        Unit {u.unit}
                      </span>
                      <h4 className="text-base font-bold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">
                        {u.topic}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium truncate">
                        {u.words.length} từ vựng Lớp 4
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all shrink-0">
                      →
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

