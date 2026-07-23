import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Mic, Dumbbell, Sparkles } from 'lucide-react';
import { Unit, UserProfile } from '../types';
import { FlashcardView } from './FlashcardView';
import { PronunciationPractice } from './PronunciationPractice';
import { PracticeExercises } from './PracticeExercises';

interface UnitDetailProps {
  unit: Unit;
  profile: UserProfile;
  onBack: () => void;
  onToggleMastered: (wordKey: string) => void;
  onRewardStars: (stars: number) => void;
}

export const UnitDetail: React.FC<UnitDetailProps> = ({
  unit,
  profile,
  onBack,
  onToggleMastered,
  onRewardStars
}) => {
  const [activeTab, setActiveTab] = useState<'flashcard' | 'pronounce' | 'practice'>('flashcard');

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

      {/* 3 Main Mode Tabs */}
      <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 text-xs sm:text-sm font-bold text-slate-600 gap-1.5">
        <button
          onClick={() => setActiveTab('flashcard')}
          className={`flex-1 py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'flashcard'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Thẻ từ vựng</span>
        </button>

        <button
          onClick={() => setActiveTab('pronounce')}
          className={`flex-1 py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'pronounce'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          <Mic className="w-4 h-4 text-emerald-600" />
          <span>Luyện phát âm</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'practice'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          <Dumbbell className="w-4 h-4 text-emerald-600" />
          <span>Bài tập luyện tập</span>
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

      {activeTab === 'practice' && (
        <PracticeExercises
          unitNumber={unit.unit}
          words={unit.words}
          onRewardStars={onRewardStars}
        />
      )}
    </div>
  );
};
