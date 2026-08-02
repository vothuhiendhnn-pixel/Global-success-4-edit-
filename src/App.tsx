import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { UnitList } from './components/UnitList';
import { UnitDetail } from './components/UnitDetail';
import { DictionaryView } from './components/DictionaryView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AchievementPortal } from './components/AchievementPortal';
import { ProfileModal } from './components/ProfileModal';
import { StudentInfoEntryModal } from './components/StudentInfoEntryModal';
import { UserProfile, TeacherConfig, StudentRecord } from './types';
import { UNITS_DATA } from './data/units';
import { loadProfile, saveProfile, resetProfileData } from './utils/storage';
import { 
  loadTeacherConfig, 
  saveTeacherConfig, 
  loadStudentsList, 
  saveStudentsList 
} from './data/teacherData';
import { initAudioUnlock, playSoundEffect } from './utils/audio';
import {
  syncStudentProgressApi,
  fetchStudentsApi,
  saveTeacherConfigApi,
  rewardStudentApi,
  updateStudentsApi
} from './utils/api';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [teacherConfig, setTeacherConfig] = useState<TeacherConfig>(loadTeacherConfig);
  const [studentsList, setStudentsList] = useState<StudentRecord[]>(loadStudentsList);

  const [activeTab, setActiveTab] = useState<'home' | 'units' | 'dictionary' | 'achievements' | 'teacher'>('achievements');
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isStudentInfoModalOpen, setIsStudentInfoModalOpen] = useState(false);
  const [pendingUnitNumber, setPendingUnitNumber] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Audio unlock on user touch/click
  useEffect(() => {
    initAudioUnlock();
  }, []);

  // Sync student profile with central server database whenever profile updates
  useEffect(() => {
    saveProfile(profile);

    // Call central server API to save student name and progress for Teacher Dashboard
    syncStudentProgressApi(profile).then((data) => {
      if (data) {
        if (data.studentId && profile.id !== data.studentId) {
          setProfile((prev) => ({ ...prev, id: data.studentId }));
        }
        if (data.students && Array.isArray(data.students)) {
          setStudentsList(data.students);
        }
        if (data.config) {
          setTeacherConfig(data.config);
        }
      }
    });
  }, [profile.name, profile.className, profile.avatar, profile.stars, profile.masteredWords, profile.completedUnits]);

  // Save teacher config locally & on server
  useEffect(() => {
    saveTeacherConfig(teacherConfig);
    saveTeacherConfigApi(teacherConfig);
  }, [teacherConfig]);

  // Save students list locally & on server
  useEffect(() => {
    saveStudentsList(studentsList);
  }, [studentsList]);

  // Periodic refresh when on Teacher tab or app load
  useEffect(() => {
    const loadFreshData = () => {
      fetchStudentsApi().then((res) => {
        if (res) {
          if (res.students) setStudentsList(res.students);
          if (res.config) setTeacherConfig(res.config);
        }
      });
    };

    loadFreshData();
    const interval = setInterval(loadFreshData, 6000); // Poll every 6 seconds for live student progress
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleRewardStars = (count: number) => {
    setProfile((prev) => ({
      ...prev,
      stars: prev.stars + count
    }));
    if (profile.soundEnabled) {
      playSoundEffect('star');
    }
    showToast(`Thưởng +${count} ⭐ Sao tích lũy!`);
  };

  const handleToggleMastered = (wordKey: string) => {
    setProfile((prev) => {
      const exists = prev.masteredWords.includes(wordKey);
      let updatedMastered: string[];
      let bonusStars = 0;

      if (exists) {
        updatedMastered = prev.masteredWords.filter((k) => k !== wordKey);
      } else {
        updatedMastered = [...prev.masteredWords, wordKey];
        bonusStars = 5;
      }

      return {
        ...prev,
        masteredWords: updatedMastered,
        stars: prev.stars + bonusStars
      };
    });

    showToast('Đã cập nhật tiến độ thuộc từ! 🎉');
  };

  const handleCompleteTask = (taskId: string, rewardStars: number) => {
    const todayKey = new Date().toISOString().slice(0, 10);
    const completedToday = profile.dailyTasksCompleted[todayKey] || [];

    if (completedToday.includes(taskId)) return;

    setProfile((prev) => ({
      ...prev,
      stars: prev.stars + rewardStars,
      dailyTasksCompleted: {
        ...prev.dailyTasksCompleted,
        [todayKey]: [...completedToday, taskId]
      }
    }));

    if (profile.soundEnabled) {
      playSoundEffect('star');
    }
    showToast(`Nhiệm vụ hoàn thành! Nhận +${rewardStars} ⭐`);
  };

  const handleSelectUnit = (unitNumber: number) => {
    setProfile((prev) => ({
      ...prev,
      lastAccessedUnit: unitNumber
    }));

    // If profile name is still default placeholder or name/class unconfirmed, open Student Info Modal first
    if (!profile.name || profile.name.includes("Nguyễn Văn A") || !profile.className) {
      setPendingUnitNumber(unitNumber);
      setIsStudentInfoModalOpen(true);
    } else {
      setSelectedUnitNumber(unitNumber);
    }
  };

  const handleSaveStudentInfoAndContinue = (name: string, className: string) => {
    setProfile((prev) => ({
      ...prev,
      name,
      className
    }));

    setIsStudentInfoModalOpen(false);
    showToast(`Đã lưu thông tin: ${name} (${className})! 🎉`);

    if (pendingUnitNumber !== null) {
      setSelectedUnitNumber(pendingUnitNumber);
      setPendingUnitNumber(null);
    }
  };

  const handleResetData = () => {
    const fresh = resetProfileData();
    setProfile(fresh);
    setSelectedUnitNumber(null);
    setActiveTab('home');
    showToast('Đã đặt lại dữ liệu thành công!');
  };

  const handleRewardStudentFromTeacher = (studentId: string, starsCount: number, note: string) => {
    rewardStudentApi(studentId, starsCount, note).then((updatedList) => {
      if (updatedList) setStudentsList(updatedList);
    });
    if (profile.id === studentId || profile.name.includes("Nguyễn Văn A")) {
      setProfile(prev => ({
        ...prev,
        stars: prev.stars + starsCount
      }));
    }
    showToast(`Đã tuyên dương và cộng +${starsCount}⭐ cho học sinh!`);
  };

  const selectedUnitObj = selectedUnitNumber
    ? UNITS_DATA.find((u) => u.unit === selectedUnitNumber)
    : null;

  return (
    <div className="min-h-screen bg-[#F1F8F4] text-slate-800 font-sans antialiased selection:bg-emerald-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-bold text-xs px-5 py-3 rounded-full shadow-xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        profile={profile}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedUnitNumber(null);
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
        onToggleSound={() =>
          setProfile((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
        }
      />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-4 sm:pt-6">
        {selectedUnitObj ? (
          /* Unit Detail View (Flashcard, Pronunciation, Practice Exercises) */
          <UnitDetail
            unit={selectedUnitObj}
            profile={profile}
            onBack={() => setSelectedUnitNumber(null)}
            onToggleMastered={handleToggleMastered}
            onRewardStars={handleRewardStars}
            onOpenStudentInfoModal={() => setIsStudentInfoModalOpen(true)}
            showToast={showToast}
          />
        ) : (
          /* Main Views */
          <>
            {activeTab === 'home' && (
              <Dashboard
                profile={profile}
                teacherConfig={teacherConfig}
                onSelectUnit={handleSelectUnit}
                onNavigateUnits={() => setActiveTab('units')}
                onNavigateDictionary={() => setActiveTab('dictionary')}
                onNavigateTeacher={() => setActiveTab('teacher')}
                onOpenProfile={() => setIsProfileOpen(true)}
                onCompleteTask={handleCompleteTask}
              />
            )}

            {activeTab === 'units' && (
              <UnitList
                profile={profile}
                onSelectUnit={handleSelectUnit}
              />
            )}

            {activeTab === 'achievements' && (
              <AchievementPortal
                profile={profile}
                showToast={showToast}
              />
            )}

            {activeTab === 'dictionary' && <DictionaryView />}

            {activeTab === 'teacher' && (
              <TeacherDashboard
                students={studentsList}
                config={teacherConfig}
                onUpdateConfig={(newConfig) => {
                  setTeacherConfig(newConfig);
                  showToast('Đã lưu cấu hình phân công bài tập!');
                }}
                onUpdateStudents={(newStudents) => {
                  setStudentsList(newStudents);
                  showToast('Đã cập nhật dữ liệu danh sách học sinh!');
                }}
                onRewardStudent={handleRewardStudentFromTeacher}
              />
            )}
          </>
        )}
      </main>

      {/* Student Profile Modal */}
      <ProfileModal
        profile={profile}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSaveProfile={(updated) => {
          setProfile(updated);
          showToast('Đã lưu thông tin hồ sơ!');
        }}
        onResetData={handleResetData}
      />

      {/* Mandatory / Entry Student Info Modal */}
      <StudentInfoEntryModal
        isOpen={isStudentInfoModalOpen}
        profile={profile}
        targetUnitTitle={
          pendingUnitNumber
            ? `Unit ${pendingUnitNumber}: ${UNITS_DATA.find((u) => u.unit === pendingUnitNumber)?.topic || ''}`
            : undefined
        }
        onSaveAndContinue={handleSaveStudentInfoAndContinue}
        onCancel={() => {
          setIsStudentInfoModalOpen(false);
          setPendingUnitNumber(null);
        }}
      />
    </div>
  );
}

