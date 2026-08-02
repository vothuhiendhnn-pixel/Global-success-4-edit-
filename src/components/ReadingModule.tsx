import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Mic, MicOff, CheckCircle2, Award, RotateCcw, ArrowRight, Sparkles, SkipForward, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import { getUnitReadingData, UnitReadingData } from '../data/readingData';
import { speakText, playSoundEffect } from '../utils/audio';
import { submitToGoogleSheetApi } from '../utils/api';

interface ReadingModuleProps {
  unitNumber: number;
  profile: UserProfile;
  onRewardStars: (stars: number) => void;
  onOpenStudentInfoModal?: () => void;
  showToast?: (msg: string) => void;
}

export const ReadingModule: React.FC<ReadingModuleProps> = ({
  unitNumber,
  profile,
  onRewardStars,
  onOpenStudentInfoModal,
  showToast
}) => {
  const readingData: UnitReadingData = getUnitReadingData(unitNumber);

  // Split passage into raw word tokens & clean lowercase words
  const rawWords = readingData.passage.split(/\s+/);
  const cleanPassageWords = rawWords.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ''));

  // State for AI Speech Recognition
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [wordStatuses, setWordStatuses] = useState<('default' | 'correct' | 'wrong')[]>(
    new Array(rawWords.length).fill('default')
  );
  const [pronunciationEvaluated, setPronunciationEvaluated] = useState(false);
  const [pronunciationScorePercent, setPronunciationScorePercent] = useState<number | null>(null);
  const [pronunciationStars, setPronunciationStars] = useState<number>(0);
  const [speechApiSupported, setSpeechApiSupported] = useState(true);

  // State for Reading Comprehension Quiz
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [compCorrectScore, setCompCorrectScore] = useState(0);
  const [compWrongScore, setCompWrongScore] = useState(0);
  const [compSkippedScore, setCompSkippedScore] = useState(0);
  const [compFinished, setCompFinished] = useState(false);
  const [compFeedback, setCompFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Submission tracking
  const [hasSubmittedSheet, setHasSubmittedSheet] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Check speech recognition support on mount
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechApiSupported(false);
    }
  }, []);

  // Reset state when changing unit
  useEffect(() => {
    setIsRecording(false);
    setTranscript('');
    setWordStatuses(new Array(rawWords.length).fill('default'));
    setPronunciationEvaluated(false);
    setPronunciationScorePercent(null);
    setPronunciationStars(0);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setCompCorrectScore(0);
    setCompWrongScore(0);
    setCompSkippedScore(0);
    setCompFinished(false);
    setCompFeedback(null);
    setHasSubmittedSheet(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  }, [unitNumber]);

  // Clean up recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  // Start Voice Recording
  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechApiSupported(false);
      showToast?.('Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Google Chrome hoặc Microsoft Edge!');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        setPronunciationEvaluated(false);
        setPronunciationScorePercent(null);
        showToast?.('🎙️ Đang ghi âm... Em hãy bắt đầu đọc đoạn văn!');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentTranscript);

        // Process real-time words comparison
        const spokenWords = currentTranscript
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .split(/\s+/)
          .filter(Boolean);

        setWordStatuses((prev) => {
          const nextStatuses = [...prev];
          cleanPassageWords.forEach((targetWord, idx) => {
            if (!targetWord) return;
            // If the spoken stream contains targetWord, mark as correct (green)
            if (spokenWords.includes(targetWord)) {
              nextStatuses[idx] = 'correct';
            }
          });
          return nextStatuses;
        });
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        if (err.error === 'not-allowed') {
          showToast?.('Vui lòng cho phép truy cập micro để sử dụng tính năng đọc bài!');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  // Stop Recording and Evaluate Pronunciation
  const stopAndEvaluate = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsRecording(false);

    // Finalize evaluation: words that are not 'correct' become 'wrong' (red)
    let correctCount = 0;
    const finalStatuses = wordStatuses.map((status, idx) => {
      if (status === 'correct') {
        correctCount++;
        return 'correct' as const;
      }
      return 'wrong' as const;
    });

    const totalWords = cleanPassageWords.filter(Boolean).length || 1;
    const percent = Math.min(100, Math.round((correctCount / totalWords) * 100));

    setWordStatuses(finalStatuses);
    setPronunciationScorePercent(percent);
    setPronunciationEvaluated(true);

    // Star calculation
    let stars = 0;
    if (percent >= 90) {
      stars = 3;
    } else if (percent >= 70) {
      stars = 2;
    } else if (percent >= 50) {
      stars = 1;
    } else {
      stars = 0;
    }

    setPronunciationStars(stars);

    if (stars > 0) {
      playSoundEffect('star');
      onRewardStars(stars);
      showToast?.(`Tuyệt vời! Em đọc đạt ${percent}% và thưởng +${stars}⭐!`);
    } else {
      playSoundEffect('wrong');
      showToast?.(`Kết quả ${percent}%. Em hãy cố gắng luyện tập thêm nhé! 💪`);
    }

    // Auto send to Google Sheets
    sendDataToGoogleSheets(percent, stars, compCorrectScore);
  };

  // Listen to full passage or individual word using TTS
  const handleListenPassage = () => {
    speakText(readingData.passage);
  };

  const handleListenWord = (word: string) => {
    const clean = word.replace(/[^a-zA-Z]/g, '');
    if (clean) speakText(clean);
  };

  // Handle Reading Comprehension Option Pick
  const handleSelectCompOption = (optionIdx: number) => {
    if (selectedOption !== null) return; // Prevent multi click
    setSelectedOption(optionIdx);

    const q = readingData.questions[currentQuestionIdx];
    if (optionIdx === q.correctAnswer) {
      setCompFeedback('correct');
      playSoundEffect('correct');
      setCompCorrectScore((prev) => prev + 1);
    } else {
      setCompFeedback('wrong');
      playSoundEffect('wrong');
      setCompWrongScore((prev) => prev + 1);
    }

    setTimeout(() => {
      goToNextQuestion(compCorrectScore + (optionIdx === q.correctAnswer ? 1 : 0));
    }, 1200);
  };

  // Skip current question
  const handleSkipCompQuestion = () => {
    setCompSkippedScore((prev) => prev + 1);
    goToNextQuestion(compCorrectScore);
  };

  const goToNextQuestion = (updatedCorrectCount: number) => {
    setSelectedOption(null);
    setCompFeedback(null);

    if (currentQuestionIdx + 1 < readingData.questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setCompFinished(true);
      playSoundEffect('star');
      // If student answered all comprehension questions correctly (100%), reward 1 extra star
      if (updatedCorrectCount === readingData.questions.length) {
        onRewardStars(1);
        showToast?.('Hoàn thành xuất sắc phần đọc hiểu! +1⭐');
      }
      sendDataToGoogleSheets(pronunciationScorePercent || 0, pronunciationStars, updatedCorrectCount);
    }
  };

  // Send background log to Google Sheets
  const sendDataToGoogleSheets = (pronPercent: number, pStars: number, cScore: number) => {
    if (hasSubmittedSheet) return;

    const totalQuestions = readingData.questions.length;
    const sheetPayload = {
      studentName: profile.name || 'Học sinh',
      studentClass: profile.className || '',
      unitTitle: `Unit ${unitNumber}: Reading & Pronunciation`,
      score: `Đọc hiểu: ${cScore}/${totalQuestions} - Phát âm AI: ${pronPercent}%`,
      correctAnswers: cScore,
      skippedAnswers: compSkippedScore,
      wrongAnswers: compWrongScore,
      starsEarned: pStars
    };

    submitToGoogleSheetApi(sheetPayload);
    setHasSubmittedSheet(true);
  };

  // Restart practice
  const handleRestart = () => {
    setIsRecording(false);
    setTranscript('');
    setWordStatuses(new Array(rawWords.length).fill('default'));
    setPronunciationEvaluated(false);
    setPronunciationScorePercent(null);
    setPronunciationStars(0);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setCompCorrectScore(0);
    setCompWrongScore(0);
    setCompSkippedScore(0);
    setCompFinished(false);
    setCompFeedback(null);
    setHasSubmittedSheet(false);
  };

  const currentQ = readingData.questions[currentQuestionIdx];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* SECTION 1: READING PASSAGE & AI PRONUNCIATION RECORDING */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-extrabold uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block mb-1">
              📖 Luyện đọc AI • Unit {unitNumber}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {readingData.title}
            </h3>
          </div>

          <button
            onClick={handleListenPassage}
            className="self-start sm:self-auto px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-2xl border border-emerald-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>Nghe mẫu toàn bài</span>
          </button>
        </div>

        {!speechApiSupported && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-800 text-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p>
              Trình duyệt hiện tại chưa mở API nhận diện giọng nói. Bạn có thể sử dụng Chrome/Edge trên máy tính hoặc Android để ghi âm giọng đọc trực tiếp!
            </p>
          </div>
        )}

        {/* Passage Display with Interactive Colored Words */}
        <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 leading-relaxed text-base sm:text-lg font-medium text-slate-800 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Đoạn văn đọc (Bấm vào từ bất kỳ để nghe âm chuẩn):
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 leading-loose">
            {rawWords.map((word, idx) => {
              const status = wordStatuses[idx];
              let colorClasses = "bg-white text-slate-800 border-slate-200 hover:border-emerald-300";

              if (status === 'correct') {
                colorClasses = "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold shadow-xs";
              } else if (status === 'wrong') {
                colorClasses = "bg-rose-100 text-rose-700 border-rose-300 font-bold";
              }

              return (
                <span
                  key={idx}
                  onClick={() => handleListenWord(word)}
                  title="Bấm để nghe từ này"
                  className={`px-2 py-0.5 rounded-lg border text-base sm:text-lg transition-all cursor-pointer hover:scale-105 active:scale-95 inline-block ${colorClasses}`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>

        {/* Recording Controls & AI Evaluation Display */}
        <div className="p-5 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mic className="w-5 h-5" />
                <span>🎙️ Bắt đầu đọc bài</span>
              </button>
            ) : (
              <button
                onClick={stopAndEvaluate}
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold text-sm rounded-2xl shadow-md animate-pulse transition-all flex items-center gap-2 cursor-pointer"
              >
                <MicOff className="w-5 h-5" />
                <span>⏹️ Dừng đọc & Chấm điểm</span>
              </button>
            )}

            {isRecording && (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200 animate-pulse">
                🔴 Đang ghi âm giọng đọc...
              </span>
            )}
          </div>

          {/* Pronunciation Score Result */}
          {pronunciationEvaluated && pronunciationScorePercent !== null && (
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-emerald-200 shadow-xs self-stretch sm:self-auto justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">Điểm phát âm AI</p>
                <p className="text-xl font-black text-emerald-600">{pronunciationScorePercent}%</p>
              </div>

              <div className="flex items-center gap-1 text-2xl">
                {pronunciationStars === 3 && '⭐⭐⭐'}
                {pronunciationStars === 2 && '⭐⭐'}
                {pronunciationStars === 1 && '⭐'}
                {pronunciationStars === 0 && '💪'}
              </div>
            </div>
          )}
        </div>

        {/* Live transcript feedback box */}
        {transcript && isRecording && (
          <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-600 italic border border-slate-200">
            <strong>Giọng đọc ghi nhận:</strong> "{transcript}"
          </div>
        )}
      </div>

      {/* SECTION 2: READING COMPREHENSION MULTIPLE CHOICE QUESTIONS */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>📝 Câu Hỏi Đọc Hiểu</span>
            <span className="text-xs text-slate-500 font-semibold">
              ({currentQuestionIdx + 1}/{readingData.questions.length})
            </span>
          </h3>

          {!compFinished && (
            <button
              onClick={handleSkipCompQuestion}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Bỏ qua (Skip)</span>
            </button>
          )}
        </div>

        {!compFinished ? (
          <div className="space-y-5">
            <h4 className="text-base sm:text-lg font-bold text-slate-800">
              {currentQ.id}. {currentQ.question}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, optIdx) => {
                let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";

                if (selectedOption !== null) {
                  if (optIdx === currentQ.correctAnswer) {
                    btnStyle = "bg-emerald-500 text-white border-emerald-600 font-extrabold shadow-sm";
                  } else if (optIdx === selectedOption) {
                    btnStyle = "bg-rose-500 text-white border-rose-600 font-extrabold";
                  } else {
                    btnStyle = "bg-slate-50 text-slate-400 border-slate-100 opacity-50";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectCompOption(optIdx)}
                    disabled={selectedOption !== null}
                    className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                    {selectedOption !== null && optIdx === currentQ.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Reading Comprehension Completion Banner */
          <div className="p-6 bg-emerald-50/80 border border-emerald-200 rounded-3xl text-center space-y-4">
            <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-600">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-emerald-900">
                Đã hoàn thành bài Đọc hiểu! 🎉
              </h4>
              <p className="text-xs text-emerald-700 font-semibold mt-1">
                Số câu đúng: {compCorrectScore}/{readingData.questions.length} • Đã tự động lưu kết quả về Google Sheets
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Luyện đọc lại bài này</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
