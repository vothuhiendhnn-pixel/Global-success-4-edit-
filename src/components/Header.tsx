import React from 'react';
import { Sparkles, BookOpen, Search, User, Volume2, VolumeX, ShieldCheck, GraduationCap } from 'lucide-react';
import { UserProfile } from '../types';
import { AVATARS } from '../data/units';

interface HeaderProps {
  profile: UserProfile;
  activeTab: 'home' | 'units' | 'dictionary' | 'achievements' | 'teacher';
  onSelectTab: (tab: 'home' | 'units' | 'dictionary' | 'achievements' | 'teacher') => void;
  onOpenProfile: () => void;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeTab,
  onSelectTab,
  onOpenProfile,
  onToggleSound
}) => {
  const currentAvatar = AVATARS.find(a => a.id === profile.avatar) || AVATARS[0];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-emerald-100 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-sm font-black text-lg group-hover:scale-105 transition-transform">
            E4
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-emerald-600 tracking-tight leading-none flex items-center gap-2">
              Easy English <span className="text-xs sm:text-sm font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">Cô Võ Thu Hiền</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-1">
              Global Success 4 • Primary English Program
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Semester Badge */}
          <div className="hidden md:flex items-center bg-blue-50 text-blue-600 px-3.5 py-1.5 rounded-full border border-blue-100 text-xs font-semibold">
            <span>Học kỳ 1 & 2</span>
          </div>

          {/* Stars Counter */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <span className="text-sm">⭐</span>
            <span>{profile.stars}</span>
          </div>

          {/* Mute/Unmute Sound */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            title={profile.soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
          >
            {profile.soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Student Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 transition-colors text-emerald-700 font-bold cursor-pointer"
          >
            <span className="text-lg leading-none">{currentAvatar.emoji}</span>
            <span className="hidden sm:inline text-xs text-slate-700 max-w-[90px] truncate">
              {profile.name}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 flex justify-around sm:justify-start sm:gap-6 text-xs font-bold uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-2 py-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'home'
                ? 'border-emerald-500 text-emerald-600 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Trang chủ</span>
          </button>

          <button
            onClick={() => onSelectTab('achievements')}
            className={`flex items-center gap-2 py-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'achievements'
                ? 'border-amber-500 text-amber-700 font-black bg-amber-50/70 rounded-t-lg'
                : 'border-transparent text-amber-800/80 hover:text-amber-900'
            }`}
          >
            <span className="text-base">🏆</span>
            <span>Bảng Vàng 成績</span>
          </button>

          <button
            onClick={() => onSelectTab('units')}
            className={`flex items-center gap-2 py-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'units'
                ? 'border-emerald-500 text-emerald-600 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>20 Bài học</span>
          </button>

          <button
            onClick={() => onSelectTab('dictionary')}
            className={`flex items-center gap-2 py-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'dictionary'
                ? 'border-emerald-500 text-emerald-600 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Tra từ vựng</span>
          </button>

          <button
            onClick={() => onSelectTab('teacher')}
            className={`flex items-center gap-2 py-3 px-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'teacher'
                ? 'border-purple-600 text-purple-700 font-black bg-purple-50/50 rounded-t-lg'
                : 'border-transparent text-purple-600/70 hover:text-purple-800'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <span>Góc Giáo Viên 👩‍🏫</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

