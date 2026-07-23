import React, { useState, useEffect } from 'react';
import { Volume2, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Play, Pause, Sparkles } from 'lucide-react';
import { Word } from '../types';
import { speakText, playSoundEffect } from '../utils/audio';

interface FlashcardViewProps {
  words: Word[];
  unitNumber: number;
  masteredWords: string[];
  onToggleMastered: (wordKey: string) => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  words,
  unitNumber,
  masteredWords,
  onToggleMastered
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);

  const currentWord = words[currentIndex] || words[0];
  const wordKey = `u${unitNumber}_${currentWord.w}`;
  const isMastered = masteredWords.includes(wordKey);

  // Play audio on slide change or flip
  const handlePlayAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    speakText(currentWord.w);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % words.length);
    playSoundEffect('flip');
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    playSoundEffect('flip');
  };

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
    playSoundEffect('flip');
  };

  const handleToggleMasteredState = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMastered(wordKey);
    playSoundEffect('star');
  };

  // Autoplay Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoplay) {
      speakText(currentWord.w);
      interval = setInterval(() => {
        setIsFlipped((prev) => !prev);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => {
            const next = (prevIndex + 1) % words.length;
            speakText(words[next].w);
            return next;
          });
          setIsFlipped(false);
        }, 2000);
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, currentIndex, words]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Top Card Bar Controls */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
        <span>Thẻ {currentIndex + 1} / {words.length}</span>

        <button
          onClick={() => setIsAutoplay(!isAutoplay)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
            isAutoplay
              ? 'bg-amber-100 text-amber-800 border-amber-300 font-bold animate-pulse'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
          <span>{isAutoplay ? 'Tạm dừng Tự động' : 'Tự động chạy'}</span>
        </button>
      </div>

      {/* 3D Flip Flashcard Container */}
      <div
        onClick={handleToggleFlip}
        className="relative w-full h-[320px] sm:h-[350px] cursor-pointer perspective-1000 select-none"
      >
        <div
          className={`relative w-full h-full rounded-3xl shadow-xs hover:shadow-md border border-slate-200 transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-white via-emerald-50/20 to-emerald-50/40 rounded-3xl p-6 flex flex-col justify-between items-center text-center backface-hidden border border-emerald-100">
            {/* Front Header Badge */}
            <div className="w-full flex justify-between items-center text-xs">
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 font-bold px-3 py-1 rounded-full">
                Mặt trước (Tiếng Anh)
              </span>

              <button
                onClick={handleToggleMasteredState}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isMastered
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-emerald-600'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isMastered ? 'Đã thuộc ✅' : 'Đánh dấu thuộc'}</span>
              </button>
            </div>

            {/* Front Main Content */}
            <div className="space-y-3 my-auto">
              <div className="flex items-center justify-center gap-3">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {currentWord.w}
                </h3>

                <button
                  onClick={handlePlayAudio}
                  className="p-3 bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 rounded-full shadow-xs transition-all cursor-pointer"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>

              {currentWord.example && (
                <p className="text-xs sm:text-sm text-slate-600 italic bg-white py-2 px-4 rounded-2xl border border-slate-200 inline-block font-medium shadow-2xs">
                  "{currentWord.example}"
                </p>
              )}
            </div>

            {/* Front Footer Instruction */}
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chạm vào thẻ để xem Nghĩa Tiếng Việt</span>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-3xl p-6 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180 border border-emerald-500 shadow-md">
            {/* Back Header Badge */}
            <div className="w-full flex justify-between items-center text-xs">
              <span className="text-amber-300 bg-emerald-800/60 font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                Mặt sau (Nghĩa Tiếng Việt)
              </span>

              <button
                onClick={handlePlayAudio}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors cursor-pointer"
                title="Nghe lại phát âm"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Back Main Content */}
            <div className="space-y-2 my-auto">
              <span className="text-emerald-200 text-sm font-semibold tracking-wider block font-mono">
                {currentWord.ipa}
              </span>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-wide">
                {currentWord.m}
              </h3>

              <div className="pt-2 text-xs text-emerald-100 bg-black/10 py-1.5 px-3 rounded-full border border-white/10 font-medium">
                Từ vựng Tiếng Anh Lớp 4
              </div>
            </div>

            {/* Back Footer Instruction */}
            <div className="text-xs text-emerald-100 font-medium flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chạm để lật lại mặt trước</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex-1 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-emerald-600" />
          <span>Từ trước</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <span>Từ tiếp theo</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
