import React, { useState } from 'react';
import { X, User, Check, RefreshCw, Sparkles, Award } from 'lucide-react';
import { UserProfile } from '../types';
import { AVATARS } from '../data/units';

interface ProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (updated: UserProfile) => void;
  onResetData: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSaveProfile,
  onResetData
}) => {
  const [name, setName] = useState(profile.name);
  const [className, setClassName] = useState(profile.className);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      name: name.trim() || 'Học sinh lớp 4',
      className: className.trim() || 'Lớp 4A',
      avatar: selectedAvatar
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200 space-y-5 animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span>Hồ Sơ Học Sinh</span>
          </h3>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Avatar Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Chọn Ảnh Đại Diện (Avatar):</label>
            <div className="grid grid-cols-3 gap-2">
              {AVATARS.map((a) => {
                const isSelected = selectedAvatar === a.id;
                return (
                  <button
                    type="button"
                    key={a.id}
                    onClick={() => setSelectedAvatar(a.id)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-2xl">{a.emoji}</span>
                    <span className="text-[10px] font-bold text-slate-700 truncate w-full">
                      {a.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Student Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Họ và Tên:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {/* Class Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Lớp Học:</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {/* Save & Cancel */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-slate-200 text-slate-700 font-bold text-xs rounded-2xl hover:bg-slate-50 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Lưu thay đổi</span>
            </button>
          </div>
        </form>

        {/* Reset Progress Section */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn đặt lại tất cả điểm Sao và tiến độ học tập?')) {
                onResetData();
                onClose();
              }
            }}
            className="text-xs text-rose-500 hover:text-rose-700 font-bold inline-flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Đặt lại tiến độ & điểm Sao</span>
          </button>
        </div>
      </div>
    </div>
  );
};
