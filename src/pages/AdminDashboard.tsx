import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  RotateCcw,
  Clock,
  Shield,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_STUDENTS } from '../data/sampleUsers';
import { DashboardLayout } from '../components/common/DashboardLayout';

export const AdminDashboard: React.FC = () => {
  const { quizzes, attempts, deleteQuiz, resetToDefaultQuizzes } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalQuizzes = quizzes.length;
  const totalStudents = SAMPLE_STUDENTS.length;
  const totalAttempts = attempts.length;

  const averagePerformance =
    totalAttempts > 0
      ? Math.round(
          attempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalAttempts
        )
      : 0;

  const handleDelete = (quizId: string, quizTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the quiz "${quizTitle}"?`)) {
      deleteQuiz(quizId);
    }
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Reset all quizzes and student assessment records back to initial college sample state?'
      )
    ) {
      resetToDefaultQuizzes();
    }
  };

  return (
    <DashboardLayout
      title="Faculty Administration & Exam Control"
      subtitle={`Welcome, ${user ? user.name : 'Faculty Administrator'} · Department of Computer Science`}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            title="Restore default sample quizzes and attempts"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo Data</span>
          </button>
          <Link
            to="/admin/create-quiz"
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create New Quiz</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Quizzes</span>
              <BookOpen className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {totalQuizzes}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Active examination modules</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Enrolled Students</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {totalStudents}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">First-year CS cohort</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Submissions</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {totalAttempts}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Recorded assessment attempts</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Cohort Average</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {averagePerformance}%
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Overall passing index</p>
          </div>
        </div>

        {/* Quiz Management Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Quiz Management Roster</h2>
              <p className="text-xs text-slate-500">
                Create, edit questions, inspect attempts, or configure parameters.
              </p>
            </div>
            <Link
              to="/admin/create-quiz"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Assessment</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Quiz Title & Subject</th>
                  <th className="px-6 py-3">Difficulty</th>
                  <th className="px-6 py-3 text-center">Questions</th>
                  <th className="px-6 py-3 text-center">Duration</th>
                  <th className="px-6 py-3 text-right">Total Marks</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizzes.map(quiz => (
                  <tr key={quiz.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5">
                      <span className="font-bold text-slate-900 block truncate max-w-[280px]">
                        {quiz.title}
                      </span>
                      <span className="text-[11px] text-indigo-600 font-medium">
                        {quiz.subject}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          quiz.difficulty === 'Beginner'
                            ? 'bg-emerald-50 text-emerald-700'
                            : quiz.difficulty === 'Intermediate'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {quiz.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center font-mono font-semibold text-slate-700">
                      {quiz.questions.length} Qs
                    </td>
                    <td className="px-6 py-3.5 text-center font-mono text-slate-600">
                      {quiz.durationMinutes} min
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono font-bold text-slate-900">
                      {quiz.totalMarks} pts
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/quiz/${quiz.id}/instructions`}
                          className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors"
                          title="Preview Assessment as Student"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          to={`/admin/edit-quiz/${quiz.id}`}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                          title="Edit Quiz & Questions"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(quiz.id, quiz.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete Quiz"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Submissions Feed */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Live Student Assessment Activity</h2>
              <p className="text-xs text-slate-500">Real-time student submissions log</p>
            </div>
            <Link to="/admin/students" className="text-xs text-indigo-600 font-semibold hover:underline">
              Inspect Student Roster
            </Link>
          </div>

          {attempts.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {attempts.slice(0, 5).map(att => (
                <div
                  key={att.id}
                  className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0">
                      {att.userName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">
                        {att.userName}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Completed <span className="font-semibold text-slate-700">{att.quizTitle}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center">
                    <span className="font-mono font-bold text-slate-900">
                      {att.score}/{att.totalMarks} ({att.percentage}%)
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        att.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {att.passed ? 'PASSED' : 'FAILED'}
                    </span>
                    <Link
                      to={`/quiz/${att.quizId}/result?attemptId=${att.id}`}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      View Report
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs">
              No submissions recorded yet.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
