import React, { useState } from 'react';
import { Search, Volume2, BookMarked, Sparkles } from 'lucide-react';
import { UNITS_DATA } from '../data/units';
import { speakText } from '../utils/audio';

export const DictionaryView: React.FC = () => {
  const [query, setQuery] = useState('');

  // Flatten all words across 20 units with unit reference
  const allWords = UNITS_DATA.flatMap((u) =>
    u.words.map((w) => ({
      ...w,
      unitNumber: u.unit,
      topic: u.topic
    }))
  );

  const filteredWords = allWords.filter(
    (w) =>
      w.w.toLowerCase().includes(query.toLowerCase()) ||
      w.m.toLowerCase().includes(query.toLowerCase()) ||
      w.ipa.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header & Search Input */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-emerald-600" />
            <span>Tra cứu Từ vựng Tiếng Anh Lớp 4 ({allWords.length} từ)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Gõ từ tiếng Anh hoặc nghĩa tiếng Việt để tìm kiếm và nghe phát âm chuẩn.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Nhập từ vựng cần tra (VD: America, doctor, swim...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWords.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-600 transition-colors">
                  {item.w}
                </h3>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-semibold">
                  {item.ipa}
                </span>
              </div>

              <p className="text-sm font-bold text-slate-700">{item.m}</p>

              {item.example && (
                <p className="text-xs text-slate-500 italic">"{item.example}"</p>
              )}

              <span className="text-[10px] text-slate-400 block pt-0.5">
                Unit {item.unitNumber}: {item.topic}
              </span>
            </div>

            <button
              onClick={() => speakText(item.w)}
              className="p-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all cursor-pointer flex-shrink-0"
              title="Nghe phát âm"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-500">
          <p className="text-base font-semibold text-slate-700">Không tìm thấy từ vựng nào phù hợp.</p>
          <p className="text-xs mt-1">Hãy thử kiểm tra lại chính tả từ cần tìm.</p>
        </div>
      )}
    </div>
  );
};
