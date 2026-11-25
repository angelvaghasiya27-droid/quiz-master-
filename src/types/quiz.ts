export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedDate: string;
  department?: string;
  studentId?: string;
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'multiple-select';

export interface Question {
  id: string;
  question: string;
  codeSnippet?: string;
  type: QuestionType;
  options: string[];
  correctAnswers: number[]; // indices of correct options (0-indexed)
  marks: number;
  explanation: string;
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  passingPercentage: number;
  difficulty: Difficulty;
  questions: Question[];
  createdAt: string;
  author: string;
  imageUrl?: string;
}

export interface StudentAnswerState {
  selectedOptions: number[];
  isMarkedForReview: boolean;
  isVisited: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  subject: string;
  userId: string;
  userName: string;
  userEmail: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  timeTakenSeconds: number;
  submittedAt: string;
  answers: Record<string, number[]>; // questionId -> selected options
}

export interface QuizFilterOptions {
  searchQuery: string;
  subject: string;
  difficulty: string;
  status: string; // 'all' | 'attempted' | 'unattempted'
}
