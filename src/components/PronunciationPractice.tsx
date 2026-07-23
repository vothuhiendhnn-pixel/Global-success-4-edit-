import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Award, RotateCcw, CheckCircle2, VolumeX, AlertCircle } from 'lucide-react';
import { Word } from '../types';
import { speakText, playSoundEffect } from '../utils/audio';
import { startSpeechRecognition, RecognitionResult, isSpeechRecognitionSupported, requestMicrophonePermission } from '../utils/speechRecognition';

interface PronunciationPracticeProps {
  words: Word[];
  onRewardStars: (count: number) => void;
}

export const PronunciationPractice: React.FC<PronunciationPracticeProps> = ({
  words,
  onRewardStars
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recognizerRef, setRecognizerRef] = useState<{ stop: () => void } | null>(null);
  const [practiceHistory, setPracticeHistory] = useState<{ [word: string]: number }>({});

  const currentWord = words[selectedIndex] || words[0];
  const speechSupported = isSpeechRecognitionSupported();

  useEffect(() => {
    // Reset state on word change
    setResult(null);
    setErrorMessage(null);
    if (recognizerRef) {
      recognizerRef.stop();
    }
  }, [selectedIndex]);

  const handleStartListening = async () => {
    setResult(null);
    setErrorMessage(null);

    const hasMicPermission = await requestMicrophonePermission();
    if (!hasMicPermission) {
      setErrorMessage('Không thể truy cập Micro. Hãy kiểm tra cài đặt trình duyệt và cấp quyền sử dụng Micro!');
      return;
    }

    const rec = startSpeechRecognition(
      currentWord.w,
      (res) => {
        setResult(res);
        if (res.accuracyScore >= 80) {
          playSoundEffect('star');
          onRewardStars(10);
          setPracticeHistory(prev => ({ ...prev, [currentWord.w]: res.accuracyScore }));
        } else {
          playSoundEffect('wrong');
        }
      },
      (err) => {
        setErrorMessage(err);
      },
      (listening) => {
        setIsListening(listening);
      }
    );

    setRecognizerRef(rec);
  };

  const handleStopListening = () => {
    if (recognizerRef) {
      recognizerRef.stop();
    }
    setIsListening(false);
  };

  const handlePlayNative = () => {
    speakText(currentWord.w);
  };

  // Self assessment fallback for devices where SpeechRecognition API is blocked
  const handleSelfEvaluate = (score: number) => {
    const grade = score >= 85 ? 'excellent' : score >= 60 ? 'good' : 'try_again';
    const feedback =
      score >= 85
        ? 'Xuất sắc! Phát âm rất tự tin 🎉'
        : score >= 60
        ? 'Tốt lắm! Bạn đã nghe và đọc theo bài 👍'
        : 'Thử nghe lại bản ngữ và đọc to hơn nhé! 💪';

    setResult({
      transcript: currentWord.w,
      accuracyScore: score,
      feedback,
      grade
    });

    if (score >= 80) {
      playSoundEffect('star');
      onRewardStars(10);
      setPracticeHistory(prev => ({ ...prev, [currentWord.w]: score }));
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Selector Grid of Words in this Unit */}
      <div className="bg-white p-5 rounded-3xl border border-emerald-50 shadow-xs space-y-3">
        <label className="text-xs font-bold text-slate-700 block">Chọn từ cần luyện phát âm:</label>
        <div className="flex flex-wrap gap-2">
          {words.map((word, idx) => {
            const isSelected = idx === selectedIndex;
            const highestScore = practiceHistory[word.w];

            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <span>{word.w}</span>
                {highestScore >= 80 && (
                  <span className="text-[10px] bg-amber-300 text-amber-950 px-1.5 py-0.2 rounded-full font-extrabold">
                    ⭐
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pronunciation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs text-center space-y-6 relative overflow-hidden">
        {/* Target Word */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Nghĩa: {currentWord.m}
          </span>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight pt-2">
            {currentWord.w}
          </h3>
          <p className="text-sm font-mono text-emerald-700 font-semibold">{currentWord.ipa}</p>
        </div>

        {/* Listen Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePlayNative}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>Nghe mẫu phát âm chuẩn 🔊</span>
          </button>
        </div>

        {/* Record Mic Area */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-md transition-all duration-300 transform active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-rose-500 animate-ping ring-8 ring-rose-200'
                  : 'bg-emerald-500 hover:bg-emerald-600 hover:scale-105'
              }`}
              title={isListening ? "Dừng thu âm" : "Nói từ vựng"}
            >
              {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>

            <span className="text-xs font-bold text-slate-500">
              {isListening ? "Đang lắng nghe... Hãy đọc to từ vựng!" : "Bấm Micro để bắt đầu thu âm"}
            </span>
          </div>

          {/* Feedback & Score Area */}
          {result && (
            <div
              className={`p-4 rounded-2xl border text-center space-y-2 animate-fade-in ${
                result.accuracyScore >= 80
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : result.accuracyScore >= 60
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2 font-black text-2xl">
                <span>Điểm chính xác: {result.accuracyScore}%</span>
                {result.accuracyScore >= 80 && <span>⭐ +10</span>}
              </div>

              <p className="text-xs font-semibold">{result.feedback}</p>

              {result.transcript && (
                <p className="text-xs opacity-75 font-mono">
                  Trình duyệt nghe thấy: "{result.transcript}"
                </p>
              )}
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs space-y-3">
              <div className="flex items-center gap-1.5 font-bold justify-center">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>

              {/* Self-Check Fallback Buttons */}
              <div className="pt-2 border-t border-amber-200/60">
                <p className="font-semibold mb-2">Chế độ tự đánh giá phát âm:</p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleSelfEvaluate(90)}
                    className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700"
                  >
                    Đọc rất chuẩn (+10⭐)
                  </button>
                  <button
                    onClick={() => handleSelfEvaluate(70)}
                    className="px-3.5 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-amber-600"
                  >
                    Đọc tương đối tốt
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
