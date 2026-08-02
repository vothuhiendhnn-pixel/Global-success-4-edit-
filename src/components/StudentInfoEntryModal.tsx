import React, { useState } from 'react';
import { UserCheck, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface StudentInfoEntryModalProps {
  isOpen: boolean;
  profile: UserProfile;
  targetUnitTitle?: string;
  onSaveAndContinue: (name: string, className: string) => void;
  onCancel?: () => void;
}

export const StudentInfoEntryModal: React.FC<StudentInfoEntryModalProps> = ({
  isOpen,
  profile,
  targetUnitTitle,
  onSaveAndContinue,
  onCancel
}) => {
  const [name, setName] = useState(profile.name || '');
  const [className, setClassName] = useState(profile.className || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập Họ và tên học sinh!');
      return;
    }
    if (!className.trim()) {
      setError('Vui lòng nhập Tên lớp!');
      return;
    }
    setError('');
    onSaveAndContinue(name.trim(), className.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-emerald-100 space-y-5 animate-scale-up">
        {/* Header Badge */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Nhập Thông Tin Học Sinh</h3>
          <p className="text-xs font-semibold text-slate-500">
            {targetUnitTitle
              ? `Vui lòng xác nhận thông tin trước khi bắt đầu bài học: ${targetUnitTitle}`
              : 'Vui lòng điền Họ tên và Lớp để ghi nhận điểm số bài tập nhé!'}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Họ và Tên Học Sinh <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Lớp Học <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ví dụ: Lớp 4A"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          <div className="pt-2 flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-3 border border-slate-200 text-slate-600 font-bold text-xs rounded-2xl hover:bg-slate-50 cursor-pointer"
              >
                Hủy
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Xác Nhận & Vào Học</span>
            </button>
          </div>
        </form>

        <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/80 text-[11px] font-medium text-emerald-800 text-center">
          💡 Kết quả làm bài tập của em sẽ tự động được gửi về hệ thống của giáo viên.
        </div>
      </div>
    </div>
  );
};
