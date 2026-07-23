import React, { useState } from 'react';
import { Search, BookOpen, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Unit, UserProfile } from '../types';
import { UNITS_DATA } from '../data/units';

interface UnitListProps {
  profile: UserProfile;
  onSelectUnit: (unitNumber: number) => void;
}

export const UnitList: React.FC<UnitListProps> = ({ profile, onSelectUnit }) => {
  const [semesterFilter, setSemesterFilter] = useState<0 | 1 | 2>(0); // 0: All, 1: Sem 1, 2: Sem 2
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUnits = UNITS_DATA.filter(u => {
    const matchesSem = semesterFilter === 0 || u.semester === semesterFilter;
    const matchesSearch =
      u.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `unit ${u.unit}`.includes(searchQuery.toLowerCase()) ||
      u.words.some(w => w.w.toLowerCase().includes(searchQuery.toLowerCase()) || w.m.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSem && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Page Heading & Search */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-xs space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Chương trình Tiếng Anh Lớp 4 (Global Success)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Chọn một bài học dưới đây để học Flashcard, Luyện phát âm AI và Làm bài tập.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          {/* Semester Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl font-semibold text-xs text-slate-600 self-start">
            <button
              onClick={() => setSemesterFilter(0)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                semesterFilter === 0
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              Tất cả (20 Units)
            </button>
            <button
              onClick={() => setSemesterFilter(1)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                semesterFilter === 1
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              Học kỳ 1 (1-10)
            </button>
            <button
              onClick={() => setSemesterFilter(2)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                semesterFilter === 2
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              Học kỳ 2 (11-20)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm chủ đề hoặc từ vựng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredUnits.map((unitObj: Unit) => {
          // Calculate mastered count for this specific unit
          const unitWordKeys = unitObj.words.map(w => `u${unitObj.unit}_${w.w}`);
          const masteredInUnit = unitWordKeys.filter(k => profile.masteredWords.includes(k)).length;
          const totalInUnit = unitObj.words.length;
          const unitPercent = Math.round((masteredInUnit / totalInUnit) * 100);
          const isFullyMastered = unitPercent === 100;

          return (
            <div
              key={unitObj.unit}
              onClick={() => onSelectUnit(unitObj.unit)}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group relative overflow-hidden"
            >
              {/* Unit Header Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform shrink-0">
                    {unitObj.unit}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Học kỳ {unitObj.semester}
                    </span>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mt-1 group-hover:text-emerald-600 transition-colors">
                      {unitObj.topic}
                    </h3>
                  </div>
                </div>

                {isFullyMastered && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Đã thuộc
                  </span>
                )}
              </div>

              {/* Sample Words Pills */}
              <div className="flex flex-wrap gap-1.5">
                {unitObj.words.slice(0, 4).map((w, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-medium"
                  >
                    {w.w}
                  </span>
                ))}
                {unitObj.words.length > 4 && (
                  <span className="text-xs text-slate-400 font-medium px-1 self-center">
                    +{unitObj.words.length - 4} từ nữa
                  </span>
                )}
              </div>

              {/* Progress & Start Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] font-medium text-slate-500 mb-1">
                    <span>Tiến độ bài học</span>
                    <span className="font-bold text-emerald-600">{masteredInUnit}/{totalInUnit} từ</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${unitPercent}%` }}
                    />
                  </div>
                </div>

                <div className="px-5 py-2.5 bg-emerald-500 group-hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0">
                  <span>Vào học</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUnits.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 text-gray-500">
          <p className="text-base font-semibold">Không tìm thấy bài học nào phù hợp.</p>
          <p className="text-xs mt-1">Thử đổi từ khóa hoặc bộ lọc học kỳ.</p>
        </div>
      )}
    </div>
  );
};
