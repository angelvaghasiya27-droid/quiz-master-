/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { AvailableQuizzesPage } from './pages/AvailableQuizzesPage';
import { QuizInstructionsPage } from './pages/QuizInstructionsPage';
import { QuizAttemptPage } from './pages/QuizAttemptPage';
import { QuizResultPage } from './pages/QuizResultPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CreateQuizPage } from './pages/CreateQuizPage';
import { StudentManagementPage } from './pages/StudentManagementPage';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Shell to conditionally show Navbar & Footer
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isExamAttempt = location.pathname.includes('/attempt');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {!isExamAttempt && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isExamAttempt && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppLayout>
            <Routes>
              {/* Public & Landing Pages */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/quizzes" element={<AvailableQuizzesPage />} />

              {/* Student Examination Workflow */}
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/quiz/:id/instructions" element={<QuizInstructionsPage />} />
              <Route path="/quiz/:id/attempt" element={<QuizAttemptPage />} />
              <Route path="/quiz/:id/result" element={<QuizResultPage />} />

              {/* Faculty / Admin Pages */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/create-quiz" element={<CreateQuizPage />} />
              <Route path="/admin/edit-quiz/:id" element={<CreateQuizPage />} />
              <Route path="/admin/students" element={<StudentManagementPage />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </QuizProvider>
    </AuthProvider>
  );
}
