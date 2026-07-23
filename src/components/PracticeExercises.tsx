import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Sparkles, HelpCircle, Shuffle, FileText } from 'lucide-react';
import { Word, SentenceExercise } from '../types';
import { SENTENCE_EXERCISES } from '../data/units';
import { getUnitExtraExercises } from '../data/extraExercises';
import { playSoundEffect, speakText } from '../utils/audio';

interface PracticeExercisesProps {
  unitNumber: number;
  words: Word[];
  onRewardStars: (stars: number) => void;
}

export const PracticeExercises: React.FC<PracticeExercisesProps> = ({
  unitNumber,
  words,
  onRewardStars
}) => {
  const [activeGameMode, setActiveGameMode] = useState<'reorder' | 'fill' | 'quiz' | 'memory'>('reorder');

  // QUIZ STATE
  const [quizQuestions, setQuizQuestions] = useState<
    { word: Word; options: string[]; correctIdx: number }[]
  >([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizSelectedOpt, setQuizSelectedOpt] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // WORD REORDERING STATE
  const [reorderSentences, setReorderSentences] = useState<SentenceExercise[]>([]);
  const [reorderIndex, setReorderIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [reorderFeedback, setReorderFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [reorderFinished, setReorderFinished] = useState(false);

  // FILL IN THE BLANKS STATE
  const extraData = getUnitExtraExercises(unitNumber);
  const [fillStep, setFillStep] = useState(0);
  const [fillSelectedWord, setFillSelectedWord] = useState<string | null>(null);
  const [fillFeedback, setFillFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [fillScore, setFillScore] = useState(0);
  const [fillFinished, setFillFinished] = useState(false);

  // MEMORY MATCH STATE
  const [memoryCards, setMemoryCards] = useState<
    { id: string; text: string; wordKey: string; isEnglish: boolean; isFlipped: boolean; isMatched: boolean }[]
  >([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMatchesCount, setMemoryMatchesCount] = useState(0);
  const [memoryFinished, setMemoryFinished] = useState(false);

  // Initialize Games
  useEffect(() => {
    initQuizGame();
    initReorderGame();
    initFillGame();
    initMemoryGame();
  }, [unitNumber, words]);

  const initQuizGame = () => {
    const questions = words.map((w) => {
      const otherMeanings = words
        .filter((item) => item.w !== w.w)
        .map((item) => item.m);

      const shuffledOthers = [...otherMeanings].sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [...shuffledOthers, w.m].sort(() => 0.5 - Math.random());
      const correctIdx = options.indexOf(w.m);

      return { word: w, options, correctIdx };
    });

    setQuizQuestions(questions);
    setQuizStep(0);
    setQuizSelectedOpt(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const initReorderGame = () => {
    const extra = getUnitExtraExercises(unitNumber);
    let pool: SentenceExercise[] = [];

    if (extra && extra.sentence_unscramble && extra.sentence_unscramble.length > 0) {
      pool = extra.sentence_unscramble.map((s) => ({
        id: `extra_s_${s.id}`,
        unit: unitNumber,
        vietnamese: `Câu ${s.id}`,
        englishTokens: s.correct_answer.split(' '),
        scrambledTokens: s.words
      }));
    } else {
      const matches = SENTENCE_EXERCISES.filter((s) => s.unit === unitNumber);
      pool = matches.length > 0 ? matches : SENTENCE_EXERCISES.slice(0, 3);
    }

    setReorderSentences(pool);
    setReorderIndex(0);
    setReorderFeedback(null);
    setReorderFinished(false);

    if (pool.length > 0) {
      setAvailableTokens([...pool[0].scrambledTokens]);
      setSelectedTokens([]);
    }
  };

  const initFillGame = () => {
    setFillStep(0);
    setFillSelectedWord(null);
    setFillFeedback(null);
    setFillScore(0);
    setFillFinished(false);
  };

  const initMemoryGame = () => {
    const sampleWords = words.slice(0, 6);
    const cards: { id: string; text: string; wordKey: string; isEnglish: boolean; isFlipped: boolean; isMatched: boolean }[] = [];

    sampleWords.forEach((w, idx) => {
      cards.push({
        id: `eng_${idx}`,
        text: w.w,
        wordKey: w.w,
        isEnglish: true,
        isFlipped: false,
        isMatched: false
      });
      cards.push({
        id: `vie_${idx}`,
        text: w.m,
        wordKey: w.w,
        isEnglish: false,
        isFlipped: false,
        isMatched: false
      });
    });

    const shuffled = cards.sort(() => 0.5 - Math.random());
    setMemoryCards(shuffled);
    setFlippedCards([]);
    setMemoryMatchesCount(0);
    setMemoryFinished(false);
  };

  // HANDLERS FOR QUIZ
  const handleAnswerQuiz = (optIdx: number) => {
    if (quizSelectedOpt !== null) return;
    setQuizSelectedOpt(optIdx);

    const currentQ = quizQuestions[quizStep];
    const isCorrect = optIdx === currentQ.correctIdx;

    if (isCorrect) {
      playSoundEffect('correct');
      setQuizScore((prev) => prev + 1);
    } else {
      playSoundEffect('wrong');
    }

    setTimeout(() => {
      if (quizStep + 1 < quizQuestions.length) {
        setQuizStep((prev) => prev + 1);
        setQuizSelectedOpt(null);
      } else {
        setQuizFinished(true);
        const finalScore = quizScore + (isCorrect ? 1 : 0);
        const starReward = finalScore >= Math.ceil(quizQuestions.length * 0.8) ? 15 : 5;
        onRewardStars(starReward);
      }
    }, 1200);
  };

  // HANDLERS FOR REORDERING
  const handleSelectToken = (token: string, index: number) => {
    if (reorderFeedback !== null) return;
    const newAvail = [...availableTokens];
    newAvail.splice(index, 1);
    setAvailableTokens(newAvail);
    setSelectedTokens([...selectedTokens, token]);
  };

  const handleDeselectToken = (token: string, index: number) => {
    if (reorderFeedback !== null) return;
    const newSel = [...selectedTokens];
    newSel.splice(index, 1);
    setSelectedTokens(newSel);
    setAvailableTokens([...availableTokens, token]);
  };

  const handleCheckReorder = () => {
    const currentSen = reorderSentences[reorderIndex];
    const userSentence = selectedTokens.join(' ').trim();
    const correctSentence = currentSen.englishTokens.join(' ').trim();

    if (userSentence === correctSentence) {
      playSoundEffect('correct');
      setReorderFeedback('correct');
      speakText(correctSentence);

      setTimeout(() => {
        if (reorderIndex + 1 < reorderSentences.length) {
          const nextIdx = reorderIndex + 1;
          setReorderIndex(nextIdx);
          setAvailableTokens([...reorderSentences[nextIdx].scrambledTokens]);
          setSelectedTokens([]);
          setReorderFeedback(null);
        } else {
          setReorderFinished(true);
          onRewardStars(20);
        }
      }, 1400);
    } else {
      playSoundEffect('wrong');
      setReorderFeedback('wrong');
      setTimeout(() => setReorderFeedback(null), 1200);
    }
  };

  // HANDLERS FOR FILL IN THE BLANKS
  const handleAnswerFill = (word: string) => {
    if (fillFeedback !== null || !extraData) return;
    setFillSelectedWord(word);

    const q = extraData.fill_in_blanks.questions[fillStep];
    const isCorrect = word.toLowerCase().trim() === q.correct_answer.toLowerCase().trim();

    if (isCorrect) {
      playSoundEffect('correct');
      setFillFeedback('correct');
      setFillScore((prev) => prev + 1);
      speakText(q.sentence.replace('_______', word));
    } else {
      playSoundEffect('wrong');
      setFillFeedback('wrong');
    }

    setTimeout(() => {
      if (fillStep + 1 < extraData.fill_in_blanks.questions.length) {
        setFillStep((prev) => prev + 1);
        setFillSelectedWord(null);
        setFillFeedback(null);
      } else {
        setFillFinished(true);
        const starReward = fillScore + (isCorrect ? 1 : 0) >= 8 ? 20 : 10;
        onRewardStars(starReward);
      }
    }, 1400);
  };

  // HANDLERS FOR MEMORY GAME
  const handleFlipMemoryCard = (cardIndex: number) => {
    const card = memoryCards[cardIndex];
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    playSoundEffect('flip');
    const newCards = [...memoryCards];
    newCards[cardIndex].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedCards, cardIndex];
    setFlippedCards(newFlipped);

    if (card.isEnglish) {
      speakText(card.text);
    }

    if (newFlipped.length === 2) {
      const idx1 = newFlipped[0];
      const idx2 = newFlipped[1];
      const card1 = newCards[idx1];
      const card2 = newCards[idx2];

      if (card1.wordKey === card2.wordKey) {
        setTimeout(() => {
          playSoundEffect('correct');
          newCards[idx1].isMatched = true;
          newCards[idx2].isMatched = true;
          setMemoryCards([...newCards]);
          setFlippedCards([]);
          setMemoryMatchesCount((prev) => {
            const next = prev + 1;
            if (next === memoryCards.length / 2) {
              setMemoryFinished(true);
              onRewardStars(20);
            }
            return next;
          });
        }, 500);
      } else {
        setTimeout(() => {
          playSoundEffect('wrong');
          newCards[idx1].isFlipped = false;
          newCards[idx2].isFlipped = false;
          setMemoryCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Game Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 gap-1.5 font-bold text-xs text-slate-600">
        <button
          onClick={() => setActiveGameMode('reorder')}
          className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center ${
            activeGameMode === 'reorder'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          1. Sắp xếp câu
        </button>

        <button
          onClick={() => setActiveGameMode('fill')}
          className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center ${
            activeGameMode === 'fill'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          2. Điền chỗ trống
        </button>

        <button
          onClick={() => setActiveGameMode('quiz')}
          className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center ${
            activeGameMode === 'quiz'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          3. Trắc nghiệm
        </button>

        <button
          onClick={() => setActiveGameMode('memory')}
          className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center ${
            activeGameMode === 'memory'
              ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          4. Ghép thẻ trí nhớ
        </button>
      </div>

      {/* GAME MODE 1: WORD REORDERING SENTENCES */}
      {activeGameMode === 'reorder' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          {!reorderFinished ? (
            reorderSentences.length > 0 && (
              <>
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 pb-3 border-b border-slate-100">
                  <span>Câu {reorderIndex + 1} / {reorderSentences.length}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Sắp xếp lại câu Tiếng Anh
                  </span>
                </div>

                {/* Instruction / Prompt display without revealing answer beforehand */}
                <div className="text-center space-y-2">
                  <span className="text-[10px] uppercase font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 tracking-wide">
                    📌 Bài tập Sắp xếp từ
                  </span>
                  {reorderSentences[reorderIndex].vietnamese &&
                  !reorderSentences[reorderIndex].vietnamese.startsWith('Câu') &&
                  !reorderSentences[reorderIndex].vietnamese.includes('Phân tích') ? (
                    <div className="bg-amber-50/80 px-4 py-3 rounded-2xl border border-amber-200/80 mt-1">
                      <span className="text-xs font-semibold text-amber-700 block mb-0.5">Gợi ý ý nghĩa:</span>
                      <p className="text-sm sm:text-base font-bold text-amber-900">
                        "{reorderSentences[reorderIndex].vietnamese}"
                      </p>
                    </div>
                  ) : (
                    <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200/80 mt-1">
                      <p className="text-xs sm:text-sm font-bold text-slate-700">
                        Chạm vào các thẻ từ theo đúng thứ tự để tạo thành câu Tiếng Anh hoàn chỉnh.
                      </p>
                    </div>
                  )}
                </div>

                {/* Selected tokens box with correct / wrong feedback animation */}
                <div
                  className={`min-h-[85px] rounded-2xl p-3.5 flex flex-wrap gap-2 items-center justify-center transition-all duration-300 ${
                    reorderFeedback === 'correct'
                      ? 'bg-emerald-50 border-2 border-emerald-500 shadow-md animate-pop-success'
                      : reorderFeedback === 'wrong'
                      ? 'bg-rose-50 border-2 border-rose-400 shadow-md animate-shake'
                      : 'bg-slate-50 border-2 border-dashed border-slate-200'
                  }`}
                >
                  {selectedTokens.length === 0 ? (
                    <span className="text-xs text-slate-400 font-semibold italic flex items-center gap-1.5">
                      👆 Chạm vào các từ phía dưới để xếp vào đây
                    </span>
                  ) : (
                    selectedTokens.map((token, idx) => (
                      <button
                        key={idx}
                        disabled={reorderFeedback !== null}
                        onClick={() => handleDeselectToken(token, idx)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer ${
                          reorderFeedback === 'correct'
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                            : reorderFeedback === 'wrong'
                            ? 'bg-rose-500 text-white ring-2 ring-rose-300'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 active:scale-95'
                        }`}
                      >
                        {token}
                      </button>
                    ))
                  )}
                </div>

                {/* Available scrambled tokens */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
                    Các từ gợi ý:
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {availableTokens.map((token, idx) => (
                      <button
                        key={idx}
                        disabled={reorderFeedback !== null}
                        onClick={() => handleSelectToken(token, idx)}
                        className="px-3.5 py-2.5 bg-white border-2 border-slate-200 text-slate-800 rounded-2xl text-xs sm:text-sm font-bold hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-800 transition-all shadow-2xs hover:scale-105 cursor-pointer active:scale-95"
                      >
                        {token}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback status banner */}
                {reorderFeedback === 'correct' && (
                  <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl font-bold text-xs sm:text-sm text-center animate-fade-in shadow-xs space-y-1">
                    <div className="flex items-center justify-center gap-2 text-emerald-800 text-sm sm:text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Chính xác hoàn hảo! 🎉</span>
                    </div>
                    <p className="text-xs text-emerald-700 font-semibold">
                      Mẫu câu chuẩn: <strong>"{reorderSentences[reorderIndex].englishTokens.join(' ')}"</strong> 🔊
                    </p>
                  </div>
                )}
                {reorderFeedback === 'wrong' && (
                  <div className="p-3.5 bg-rose-100 border border-rose-300 text-rose-900 rounded-2xl font-bold text-xs sm:text-sm text-center animate-fade-in shadow-xs flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Chưa chính xác! Vui lòng chạm vào các từ để sắp xếp lại nhé. 💪</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2">
                  {selectedTokens.length > 0 && reorderFeedback === null && (
                    <button
                      onClick={() => {
                        setAvailableTokens([...reorderSentences[reorderIndex].scrambledTokens]);
                        setSelectedTokens([]);
                      }}
                      className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-all cursor-pointer"
                    >
                      Xóa làm lại
                    </button>
                  )}
                  <button
                    disabled={selectedTokens.length === 0 || reorderFeedback !== null}
                    onClick={handleCheckReorder}
                    className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
                  >
                    <span>Kiểm tra kết quả</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-3xl animate-bounce">
                🎉
              </div>
              <h3 className="text-2xl font-black text-slate-900">Hoàn thành Sắp xếp câu!</h3>
              <p className="text-sm font-semibold text-slate-600">
                Bạn đã xếp chính xác tất cả {reorderSentences.length} câu tiếng Anh của bài này.
              </p>
              <div className="inline-block bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-amber-800 font-bold text-sm">
                Thưởng tích lũy: ⭐ +20 Sao!
              </div>

              <div>
                <button
                  onClick={initReorderGame}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs gap-2 inline-flex items-center cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi lại bài này</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME MODE 2: FILL IN THE BLANKS */}
      {activeGameMode === 'fill' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          {extraData && extraData.fill_in_blanks ? (
            !fillFinished ? (
              <>
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 pb-3 border-b border-slate-100">
                  <span>Câu {fillStep + 1} / {extraData.fill_in_blanks.questions.length}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Điểm: {fillScore}
                  </span>
                </div>

                {/* Word Bank section */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider">
                    📌 Ngân hàng từ gợi ý (Word Bank):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {extraData.fill_in_blanks.word_bank.map((wb, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white border border-amber-300 text-amber-900 rounded-lg text-xs font-extrabold shadow-2xs"
                      >
                        {wb}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Question sentence */}
                <div className="text-center py-4 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Chọn từ thích hợp điền vào chỗ trống:
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 pt-2 leading-relaxed">
                    {extraData.fill_in_blanks.questions[fillStep].sentence.split('_______').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="inline-block px-3 py-0.5 mx-1 bg-amber-100 border-b-4 border-amber-500 text-amber-900 rounded-md underline font-mono font-bold">
                            {fillSelectedWord ? fillSelectedWord : '_______'}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </h3>
                </div>

                {/* Options selection from word bank */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                  {extraData.fill_in_blanks.word_bank.map((word, idx) => {
                    const isSelected = fillSelectedWord === word;
                    const isCorrect = word.toLowerCase().trim() === extraData.fill_in_blanks.questions[fillStep].correct_answer.toLowerCase().trim();

                    let btnClass = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-300";
                    if (fillFeedback !== null) {
                      if (isCorrect) {
                        btnClass = "bg-emerald-600 border-emerald-600 text-white font-black";
                      } else if (isSelected) {
                        btnClass = "bg-rose-500 border-rose-500 text-white font-black";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={fillFeedback !== null}
                        onClick={() => handleAnswerFill(word)}
                        className={`p-3 rounded-xl border text-xs font-extrabold text-center transition-all cursor-pointer shadow-2xs ${btnClass}`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>

                {fillFeedback === 'correct' && (
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl font-bold text-xs text-center animate-fade-in">
                    Tuyệt vời! Chính xác! 👏
                  </div>
                )}
                {fillFeedback === 'wrong' && (
                  <div className="p-3 bg-rose-100 text-rose-800 rounded-2xl font-bold text-xs text-center animate-fade-in">
                    Chưa đúng. Đáp án chuẩn là: <strong>{extraData.fill_in_blanks.questions[fillStep].correct_answer}</strong>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl animate-bounce">
                  📝
                </div>
                <h3 className="text-2xl font-black text-slate-900">Hoàn thành bài Điền từ!</h3>
                <p className="text-sm font-semibold text-slate-600">
                  Bạn trả lời đúng <span className="text-emerald-600 font-bold">{fillScore}</span> / {extraData.fill_in_blanks.questions.length} câu.
                </p>
                <div className="inline-block bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-amber-800 font-bold text-sm">
                  Thưởng tích lũy: ⭐ +20 Sao!
                </div>

                <div>
                  <button
                    onClick={initFillGame}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs gap-2 inline-flex items-center cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Thử lại bài này</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-8 space-y-2 text-slate-500">
              <p className="text-sm font-semibold">
                Bài tập điền từ chưa sẵn sàng cho Unit {unitNumber}. Vui lòng thử tính năng Sắp xếp câu hoặc Trắc nghiệm!
              </p>
            </div>
          )}
        </div>
      )}

      {/* GAME MODE 3: MULTIPLE CHOICE QUIZ */}
      {activeGameMode === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          {!quizFinished ? (
            quizQuestions.length > 0 && (
              <>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-3 border-b border-slate-100">
                  <span>Câu hỏi {quizStep + 1} / {quizQuestions.length}</span>
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                    Điểm: {quizScore}
                  </span>
                </div>

                <div className="text-center space-y-2 py-3">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Chọn nghĩa tiếng Việt đúng:
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 pt-1">
                    {quizQuestions[quizStep].word.w}
                  </h3>
                  <p className="text-xs font-mono text-emerald-700 font-semibold">
                    {quizQuestions[quizStep].word.ipa}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizQuestions[quizStep].options.map((opt, idx) => {
                    const isSelected = quizSelectedOpt === idx;
                    const isCorrect = idx === quizQuestions[quizStep].correctIdx;

                    let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-300";
                    if (quizSelectedOpt !== null) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-600 border-emerald-600 text-white font-black";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-500 border-rose-500 text-white font-black";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizSelectedOpt !== null}
                        onClick={() => handleAnswerQuiz(idx)}
                        className={`p-4 rounded-2xl border font-bold text-sm transition-all text-left flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSelectedOpt !== null && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        )}
                        {quizSelectedOpt !== null && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-3xl animate-bounce">
                🏆
              </div>
              <h3 className="text-2xl font-black text-slate-900">Hoàn thành Trắc nghiệm!</h3>
              <p className="text-sm font-semibold text-slate-600">
                Bạn trả lời đúng <span className="text-emerald-600 font-bold">{quizScore}</span> / {quizQuestions.length} câu.
              </p>
              <div className="inline-block bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-amber-800 font-bold text-sm">
                Thưởng tích lũy: ⭐ +15 Sao!
              </div>

              <div>
                <button
                  onClick={initQuizGame}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs gap-2 inline-flex items-center cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Thử lại lần nữa</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME MODE 4: MEMORY MATCHING */}
      {activeGameMode === 'memory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          {!memoryFinished ? (
            <>
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 pb-2 border-b border-slate-100">
                <span>Ghép từ Tiếng Anh với Nghĩa Tiếng Việt</span>
                <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Đã ghép: {memoryMatchesCount} / {memoryCards.length / 2}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {memoryCards.map((card, idx) => (
                  <div
                    key={card.id}
                    onClick={() => handleFlipMemoryCard(idx)}
                    className={`h-24 rounded-2xl border text-center flex items-center justify-center p-2 font-bold text-xs cursor-pointer select-none transition-all duration-300 ${
                      card.isMatched
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 opacity-60 pointer-events-none'
                        : card.isFlipped
                        ? 'bg-white border-emerald-500 text-slate-900 shadow-xs scale-105'
                        : 'bg-emerald-500 border-emerald-600 text-white hover:bg-emerald-600'
                    }`}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <span className={card.isEnglish ? 'text-emerald-900 font-black' : 'text-slate-800 font-extrabold'}>
                        {card.text}
                      </span>
                    ) : (
                      <span className="text-2xl opacity-75">❓</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-3xl animate-bounce">
                🧩
              </div>
              <h3 className="text-2xl font-black text-slate-900">Tuyệt vời! Ghép thẻ hoàn tất!</h3>
              <p className="text-sm font-semibold text-slate-600">
                Bạn đã tìm được tất cả các cặp từ vựng tương ứng.
              </p>
              <div className="inline-block bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-amber-800 font-bold text-sm">
                Thưởng tích lũy: ⭐ +20 Sao!
              </div>

              <div>
                <button
                  onClick={initMemoryGame}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs gap-2 inline-flex items-center cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Xáo bài & Chơi lại</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

