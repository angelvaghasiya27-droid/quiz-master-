import { User, QuizAttempt } from '../types/quiz';

export const DEMO_STUDENT: User = {
  id: 'usr_student_01',
  name: 'Alex Rivera',
  email: 'alex.student@college.edu',
  role: 'student',
  joinedDate: '2026-01-15',
  department: 'B.Tech Computer Science (1st Year)',
  studentId: 'CS2026-042',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera'
};

export const DEMO_ADMIN: User = {
  id: 'usr_admin_01',
  name: 'Prof. Rajesh Sharma',
  email: 'prof.sharma@college.edu',
  role: 'admin',
  joinedDate: '2024-08-01',
  department: 'Faculty - Dept of Computer Science & Engineering',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProfSharma'
};

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  completedQuizzes: number;
  averageScore: number;
  lastActive: string;
  status: 'Active' | 'Pending';
}

export const SAMPLE_STUDENTS: StudentProfile[] = [
  {
    id: 'usr_student_01',
    name: 'Alex Rivera',
    email: 'alex.student@college.edu',
    studentId: 'CS2026-042',
    department: 'B.Tech Computer Science (1st Year)',
    completedQuizzes: 3,
    averageScore: 83.3,
    lastActive: '10 mins ago',
    status: 'Active'
  },
  {
    id: 'usr_student_02',
    name: 'Priya Patel',
    email: 'priya.patel@college.edu',
    studentId: 'CS2026-088',
    department: 'B.Tech Information Technology (1st Year)',
    completedQuizzes: 4,
    averageScore: 92.5,
    lastActive: '2 hours ago',
    status: 'Active'
  },
  {
    id: 'usr_student_03',
    name: 'Marcus Chen',
    email: 'marcus.chen@college.edu',
    studentId: 'CS2026-114',
    department: 'B.Tech Computer Science (1st Year)',
    completedQuizzes: 2,
    averageScore: 75.0,
    lastActive: 'Yesterday',
    status: 'Active'
  },
  {
    id: 'usr_student_04',
    name: 'Sarah Jenkins',
    email: 'sarah.j@college.edu',
    studentId: 'CS2026-159',
    department: 'B.Tech Software Engineering (1st Year)',
    completedQuizzes: 5,
    averageScore: 88.0,
    lastActive: '3 days ago',
    status: 'Active'
  },
  {
    id: 'usr_student_05',
    name: 'David Kumar',
    email: 'david.kumar@college.edu',
    studentId: 'CS2026-203',
    department: 'B.Tech Data Science (1st Year)',
    completedQuizzes: 1,
    averageScore: 70.0,
    lastActive: '5 days ago',
    status: 'Active'
  }
];

export const INITIAL_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att_sample_01',
    quizId: 'cs-fundamentals',
    quizTitle: 'Computer Science Fundamentals',
    subject: 'Computer Science',
    userId: 'usr_student_01',
    userName: 'Alex Rivera',
    userEmail: 'alex.student@college.edu',
    score: 18,
    totalMarks: 20,
    percentage: 90,
    passed: true,
    correctCount: 9,
    incorrectCount: 1,
    unattemptedCount: 0,
    timeTakenSeconds: 520,
    submittedAt: '2026-03-10T14:22:00Z',
    answers: {
      'cs-q1': [1],
      'cs-q2': [0, 1, 3],
      'cs-q3': [1],
      'cs-q4': [2],
      'cs-q5': [1],
      'cs-q6': [0],
      'cs-q7': [1],
      'cs-q8': [0, 1, 2],
      'cs-q9': [0],
      'cs-q10': [2] // picked wrong one
    }
  },
  {
    id: 'att_sample_02',
    quizId: 'programming-in-c',
    quizTitle: 'Programming in C',
    subject: 'Programming in C',
    userId: 'usr_student_01',
    userName: 'Alex Rivera',
    userEmail: 'alex.student@college.edu',
    score: 16,
    totalMarks: 20,
    percentage: 80,
    passed: true,
    correctCount: 8,
    incorrectCount: 2,
    unattemptedCount: 0,
    timeTakenSeconds: 740,
    submittedAt: '2026-03-11T11:05:00Z',
    answers: {
      'c-q1': [2],
      'c-q2': [1],
      'c-q3': [0],
      'c-q4': [1],
      'c-q5': [0, 1, 2],
      'c-q6': [1],
      'c-q7': [2],
      'c-q8': [0],
      'c-q9': [1], // wrong
      'c-q10': [0, 1] // partial
    }
  },
  {
    id: 'att_sample_03',
    quizId: 'cs-fundamentals',
    quizTitle: 'Computer Science Fundamentals',
    subject: 'Computer Science',
    userId: 'usr_student_02',
    userName: 'Priya Patel',
    userEmail: 'priya.patel@college.edu',
    score: 20,
    totalMarks: 20,
    percentage: 100,
    passed: true,
    correctCount: 10,
    incorrectCount: 0,
    unattemptedCount: 0,
    timeTakenSeconds: 410,
    submittedAt: '2026-03-11T16:30:00Z',
    answers: {}
  },
  {
    id: 'att_sample_04',
    quizId: 'ai-basics',
    quizTitle: 'Artificial Intelligence Basics',
    subject: 'Artificial Intelligence',
    userId: 'usr_student_04',
    userName: 'Sarah Jenkins',
    userEmail: 'sarah.j@college.edu',
    score: 18,
    totalMarks: 20,
    percentage: 90,
    passed: true,
    correctCount: 9,
    incorrectCount: 1,
    unattemptedCount: 0,
    timeTakenSeconds: 615,
    submittedAt: '2026-03-12T09:15:00Z',
    answers: {}
  }
];
