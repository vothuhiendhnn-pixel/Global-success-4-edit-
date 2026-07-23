// Audio Utility & Cross-platform Audio Handler for Android WebView, iOS & Web Browsers

export interface AudioPlayerInterface {
  audioObj: HTMLAudioElement | null;
  initUnlock: () => void;
  play: (text: string, audioUrl?: string) => void;
  playFallbackAudio: (url: string) => void;
}

/**
 * Bộ quản lý âm thanh tương thích đa nền tảng (Cross-platform Audio Handler)
 */
export const SmartAudioPlayer: AudioPlayerInterface = {
  audioObj: null,

  // Unlock AudioContext khi người dùng chạm màn hình lần đầu (Bắt buộc cho iOS/Android)
  initUnlock() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('click', unlock);
    };
    document.addEventListener('touchstart', unlock, { once: true });
    document.addEventListener('click', unlock, { once: true });
  },

  // Hàm phát âm thanh chính
  play(text: string, audioUrl?: string) {
    if (typeof window === 'undefined') return;

    // Thao tác hủy lệnh đang đọc dở để tránh chồng âm thanh
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.audioObj) {
      this.audioObj.pause();
      this.audioObj = null;
    }

    const cleanText = text ? text.trim() : '';
    const fallbackUrl = audioUrl || `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=en&client=tw-ob`;

    // Phương án 1: Ưu tiên dùng Web Speech API (Đọc chuẩn, nhẹ, không mất băng thông)
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'en-US';
        utterance.rate = 0.85; // Tốc độ đọc phù hợp cho học sinh lớp 4

        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en'));
        if (enVoice) {
          utterance.voice = enVoice;
        }

        let hasPlayed = false;
        utterance.onstart = () => { hasPlayed = true; };

        window.speechSynthesis.speak(utterance);

        // Phương án 2 Dự phòng: Nếu sau 300ms SpeechSynthesis không phản hồi (xảy ra trên một số bản Android WebView cũ/iOS bị lock)
        setTimeout(() => {
          if (!hasPlayed && fallbackUrl) {
            this.playFallbackAudio(fallbackUrl);
          }
        }, 300);
      } catch {
        if (fallbackUrl) {
          this.playFallbackAudio(fallbackUrl);
        }
      }
    } else if (fallbackUrl) {
      // Phương án 2: Dùng Audio HTML5 trực tiếp
      this.playFallbackAudio(fallbackUrl);
    }
  },

  playFallbackAudio(url: string) {
    try {
      this.audioObj = new Audio(url);
      this.audioObj.play().catch(err => {
        console.warn("Audio playback fallback blocked:", err);
      });
    } catch (err) {
      console.warn("Fallback audio creation error:", err);
    }
  }
};

// Khởi tạo giải pháp unlock khi load app
if (typeof window !== 'undefined') {
  SmartAudioPlayer.initUnlock();
}

/**
 * Compatibility wrapper for existing application code
 */
export function initAudioUnlock() {
  SmartAudioPlayer.initUnlock();
}

/**
 * Main function used across components when clicking the speaker icon
 */
export function speakText(text: string, audioUrl?: string): Promise<void> {
  return new Promise((resolve) => {
    SmartAudioPlayer.play(text, audioUrl);
    setTimeout(resolve, 500);
  });
}

/**
 * Sound effects for primary school engagement (Star gain, correct answer, card flip)
 */
export function playSoundEffect(type: 'star' | 'correct' | 'wrong' | 'flip') {
  if (typeof window === 'undefined') return;

  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (!ctx) return;

    if (type === 'flip') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'star' || type === 'correct') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch {
    // Audio synthesis not available or blocked
  }
}
