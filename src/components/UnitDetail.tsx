import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Mic, Dumbbell, Sparkles, BookMarked } from 'lucide-react';
import { Unit, UserProfile } from '../types';
import { FlashcardView } from './FlashcardView';
import { PronunciationPractice } from './PronunciationPractice';
import { PracticeExercises } from './PracticeExercises';
import { ReadingModule } from './ReadingModule';

interface UnitDetailProps {
  unit: Unit;
  profile: UserProfile;
  onBack: () => void;
  onToggleMastered: (wordKey: string) => void;
  onRewardStars: (stars: number) => void;
  onOpenStudentInfoModal?: () => void;
  showToast?: (msg: string) => void;
}

export const UnitDetail: React.FC<UnitDetailProps> = ({
  unit,
  profile,
  onBack,
  onToggleMastered,
  onRewardStars,
  onOpenStudentInfoModal,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState<'flashcard' | 'pronounce' | 'reading' | 'practice'>('flashcard');

  return (
    <div className="space-y-6 pb-12">
      {/* Unit Header Navigation */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-emerald-50 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
            title="Quay lại danh sách bài học"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              Unit {unit.unit} • Học kỳ {unit.semester}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {unit.topic}
            </h2>
          </div>
        </div>

        {/* Word count pill */}
        <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100 self-end sm:self-auto">
          {unit.words.length} từ vựng
        </div>
      </div>

      {/* 4 Main Mode Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 text-xs sm:text-sm font-bold text-slate-600 gap-1.5">
        <button
          onClick={() => setActiveTab('flashcard')}
          className={`py-3 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'flashcard'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Thẻ từ vựng</span>
        </button>

        <button
          onClick={() => setActiveTab('pronounce')}
          className={`py-3 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'pronounce'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          <Mic className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Luyện từ lẻ</span>
        </button>

        <button
          onClick={() => setActiveTab('reading')}
          className={`py-3 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'reading'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          <BookMarked className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Luyện đọc AI</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`py-3 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'practice'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          <Dumbbell className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Bài tập</span>
        </button>
      </div>

      {/* Render Active View */}
      {activeTab === 'flashcard' && (
        <FlashcardView
          words={unit.words}
          unitNumber={unit.unit}
          masteredWords={profile.masteredWords}
          onToggleMastered={onToggleMastered}
        />
      )}

      {activeTab === 'pronounce' && (
        <PronunciationPractice
          words={unit.words}
          onRewardStars={onRewardStars}
        />
      )}

      {activeTab === 'reading' && (
        <ReadingModule
          unitNumber={unit.unit}
          profile={profile}
          onRewardStars={onRewardStars}
          onOpenStudentInfoModal={onOpenStudentInfoModal}
          showToast={showToast}
        />
      )}

      {activeTab === 'practice' && (
        <PracticeExercises
          unitNumber={unit.unit}
          unitTopic={unit.topic}
          words={unit.words}
          profile={profile}
          onRewardStars={onRewardStars}
          onOpenStudentInfoModal={onOpenStudentInfoModal}
          showToast={showToast}
        />
      )}
    </div>
  );
};

