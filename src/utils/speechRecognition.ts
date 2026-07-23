// Speech Recognition Utility for Pronunciation Practice

export interface RecognitionResult {
  transcript: string;
  accuracyScore: number; // 0 to 100
  feedback: string;
  grade: 'excellent' | 'good' | 'try_again';
}

// Custom interface declarations for Web Speech API TypeScript compatibility
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultItem {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResultItem;
  length: number;
}

interface CustomSpeechEvent {
  results: SpeechRecognitionResultList;
}

interface CustomSpeechErrorEvent {
  error: string;
  message?: string;
}

interface CustomSpeechRecognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: CustomSpeechEvent) => void) | null;
  onerror: ((event: CustomSpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

export async function requestMicrophonePermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return true; // Fallback to SpeechRecognition default prompt
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (err) {
    console.warn('Microphone access denied:', err);
    return false;
  }
}

export function startSpeechRecognition(
  targetWord: string,
  onResult: (result: RecognitionResult) => void,
  onError: (errorMsg: string) => void,
  onListeningStateChange: (isListening: boolean) => void
): { stop: () => void } {
  if (typeof window === 'undefined') {
    onListeningStateChange(false);
    return { stop: () => {} };
  }

  const SpeechRecognitionConstructor =
    (window as unknown as { SpeechRecognition?: new () => CustomSpeechRecognition }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: new () => CustomSpeechRecognition }).webkitSpeechRecognition;

  if (!SpeechRecognitionConstructor) {
    onError('Thiết bị hoặc trình duyệt không hỗ trợ Speech Recognition. Bạn có thể sử dụng chế độ Luyện Tập Tự Đánh Giá!');
    onListeningStateChange(false);
    return { stop: () => {} };
  }

  try {
    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    let isStopped = false;

    recognition.onstart = () => {
      onListeningStateChange(true);
    };

    recognition.onresult = (event: CustomSpeechEvent) => {
      if (isStopped) return;
      onListeningStateChange(false);

      let bestTranscript = '';
      let bestScore = -1;

      if (event.results && event.results.length > 0) {
        const firstResult = event.results[0];
        for (let i = 0; i < firstResult.length; i++) {
          const alt = firstResult[i];
          const rawText = alt.transcript;
          const score = calculateSimilarity(targetWord, rawText);
          if (score > bestScore) {
            bestScore = score;
            bestTranscript = rawText;
          }
        }
      }

      const scorePercent = Math.round(bestScore);
      let feedback = 'Thử lại nhé!';
      let grade: 'excellent' | 'good' | 'try_again' = 'try_again';

      if (scorePercent >= 85) {
        grade = 'excellent';
        feedback = 'Xuất sắc! Bạn phát âm cực chuẩn 🎉';
      } else if (scorePercent >= 60) {
        grade = 'good';
        feedback = 'Rất tốt! Phát âm khá chính xác 👍';
      } else {
        feedback = 'Chưa chính xác lắm. Bạn nhấn nút 🔊 nghe lại và thử lại nhé! 💪';
      }

      onResult({
        transcript: bestTranscript || 'Chưa nghe rõ',
        accuracyScore: scorePercent,
        feedback,
        grade
      });
    };

    recognition.onerror = (event: CustomSpeechErrorEvent) => {
      onListeningStateChange(false);
      let message = 'Không thể thu âm.';
      if (event.error === 'not-allowed') {
        message = 'Bạn cần cấp quyền truy cập Micro trên trình duyệt để luyện phát âm.';
      } else if (event.error === 'no-speech') {
        message = 'Chưa nghe thấy giọng nói. Hãy nói rõ hơn nhé!';
      }
      onError(message);
    };

    recognition.onend = () => {
      onListeningStateChange(false);
    };

    recognition.start();

    return {
      stop: () => {
        isStopped = true;
        try {
          recognition.stop();
        } catch {
          // ignore
        }
        onListeningStateChange(false);
      }
    };
  } catch {
    onListeningStateChange(false);
    onError('Lỗi khởi tạo tính năng thu âm.');
    return { stop: () => {} };
  }
}

/**
 * Calculates string similarity percentage between target and recognized speech
 */
export function calculateSimilarity(target: string, spoken: string): number {
  const normTarget = normalizeString(target);
  const normSpoken = normalizeString(spoken);

  if (normTarget === normSpoken) return 100;
  if (!normSpoken) return 0;

  // Exact word match check
  if (normSpoken.includes(normTarget) || normTarget.includes(normSpoken)) {
    return 88;
  }

  // Levenshtein distance
  const distance = levenshteinDistance(normTarget, normSpoken);
  const maxLen = Math.max(normTarget.length, normSpoken.length);
  if (maxLen === 0) return 100;

  const score = ((maxLen - distance) / maxLen) * 100;
  return Math.max(0, Math.min(100, score));
}

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
