import React, { createContext, useContext, useState, useEffect } from 'react';
import { Quiz, QuizAttempt, Question } from '../types/quiz';
import { SAMPLE_QUIZZES } from '../data/sampleQuizzes';
import { INITIAL_ATTEMPTS } from '../data/sampleUsers';

interface RecordAttemptParams {
  quizId: string;
  userId: string;
  userName: string;
  userEmail: string;
  answers: Record<string, number[]>;
  timeTakenSeconds: number;
}

interface QuizContextType {
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  getQuizById: (id: string) => Quiz | undefined;
  saveQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  resetToDefaultQuizzes: () => void;
  recordAttempt: (params: RecordAttemptParams) => QuizAttempt;
  getAttemptById: (id: string) => QuizAttempt | undefined;
  getUserAttempts: (userId: string) => QuizAttempt[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const STORAGE_KEY_QUIZZES = 'quizmaster_quizzes';
const STORAGE_KEY_ATTEMPTS = 'quizmaster_attempts';

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_QUIZZES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return SAMPLE_QUIZZES;
  });

  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_ATTEMPTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(attempts));
  }, [attempts]);

  const getQuizById = (id: string): Quiz | undefined => {
    return quizzes.find(q => q.id === id);
  };

  const saveQuiz = (quizToSave: Quiz) => {
    setQuizzes(prev => {
      const existsIndex = prev.findIndex(q => q.id === quizToSave.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = quizToSave;
        return updated;
      }
      return [quizToSave, ...prev];
    });
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  const resetToDefaultQuizzes = () => {
    setQuizzes(SAMPLE_QUIZZES);
    setAttempts(INITIAL_ATTEMPTS);
    localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(SAMPLE_QUIZZES));
    localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(INITIAL_ATTEMPTS));
  };

  const recordAttempt = ({
    quizId,
    userId,
    userName,
    userEmail,
    answers,
    timeTakenSeconds
  }: RecordAttemptParams): QuizAttempt => {
    const quiz = getQuizById(quizId);
    if (!quiz) {
      throw new Error(`Quiz with id ${quizId} not found`);
    }

    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    quiz.questions.forEach((q: Question) => {
      const userSelected = answers[q.id] || [];
      if (userSelected.length === 0) {
        unattemptedCount += 1;
        return;
      }

      // Check correctness
      const sortedUser = [...userSelected].sort();
      const sortedCorrect = [...q.correctAnswers].sort();
      const isCorrect =
        sortedUser.length === sortedCorrect.length &&
        sortedUser.every((val, idx) => val === sortedCorrect[idx]);

      if (isCorrect) {
        correctCount += 1;
        score += q.marks;
      } else {
        incorrectCount += 1;
      }
    });

    const percentage = Math.round((score / quiz.totalMarks) * 100);
    const passed = percentage >= quiz.passingPercentage;

    const newAttempt: QuizAttempt = {
      id: 'att_' + Date.now(),
      quizId,
      quizTitle: quiz.title,
      subject: quiz.subject,
      userId,
      userName,
      userEmail,
      score,
      totalMarks: quiz.totalMarks,
      percentage,
      passed,
      correctCount,
      incorrectCount,
      unattemptedCount,
      timeTakenSeconds,
      submittedAt: new Date().toISOString(),
      answers
    };

    setAttempts(prev => [newAttempt, ...prev]);
    return newAttempt;
  };

  const getAttemptById = (id: string): QuizAttempt | undefined => {
    return attempts.find(a => a.id === id);
  };

  const getUserAttempts = (userId: string): QuizAttempt[] => {
    return attempts.filter(a => a.userId === userId);
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        attempts,
        getQuizById,
        saveQuiz,
        deleteQuiz,
        resetToDefaultQuizzes,
        recordAttempt,
        getAttemptById,
        getUserAttempts
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
