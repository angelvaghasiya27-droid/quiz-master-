import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  TrendingUp,
  ArrowRight,
  RotateCcw,
  Eye,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { DashboardLayout } from '../components/common/DashboardLayout';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { quizzes, getUserAttempts } = useQuiz();
  const navigate = useNavigate();

  const userAttempts = user ? getUserAttempts(user.id) : [];

  const completedCount = userAttempts.length;
  const totalQuizzes = quizzes.length;

  const averageScore =
    completedCount > 0
      ? Math.round(
          userAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / completedCount
        )
      : 0;

  const highestScore =
    completedCount > 0
      ? Math.max(...userAttempts.map(a => a.percentage))
      : 0;

  // Find quizzes not yet attempted by the user
  const attemptedQuizIds = new Set(userAttempts.map(a => a.quizId));
  const pendingQuizzes = quizzes.filter(q => !attemptedQuizIds.has(q.id));

  return (
    <DashboardLayout
      title={`Welcome back, ${user ? user.name : 'Student'}!`}
      subtitle={`${user?.department || 'Computer Science Engineering'} · Student ID: ${user?.studentId || 'CS2026-042'}`}
      actions={
        <Link
          to="/quizzes"
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs flex items-center gap-2"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Browse All Quizzes</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Available Quizzes</span>
              <BookOpen className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {totalQuizzes}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {pendingQuizzes.length} pending assessment{pendingQuizzes.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Completed Tests</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {completedCount}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Across all semester topics
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Average Score</span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {averageScore}%
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: `${averageScore}%` }}
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Highest Marks</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {highestScore}%
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Distinction rating achieved
            </p>
          </div>
        </div>

        {/* 2-Column Section: Performance Chart & Recommended Next Quizzes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Performance Chart / Score Progression */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Performance Progression</h2>
                <p className="text-xs text-slate-500">Chronological assessment scores (%)</p>
              </div>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">
                Active Term
              </span>
            </div>

            {userAttempts.length > 0 ? (
              <div className="pt-4">
                {/* SVG Visual Bar Progression */}
                <div className="h-44 flex items-end gap-6 justify-between px-4 pb-2 border-b border-slate-200">
                  {userAttempts.slice(0, 6).reverse().map((att, idx) => (
                    <div key={att.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none font-mono">
                        {att.score}/{att.totalMarks} Marks ({att.percentage}%)
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-slate-700">
                        {att.percentage}%
                      </span>
                      <div
                        className={`w-full max-w-[48px] rounded-t transition-all ${
                          att.passed ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-rose-500 hover:bg-rose-400'
                        }`}
                        style={{ height: `${Math.max(16, (att.percentage / 100) * 120)}px` }}
                      />
                      <span className="text-[10px] text-slate-500 truncate max-w-[70px] text-center">
                        Test #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-1">
                  <span>Passing threshold: 60%</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600" /> Passed
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Needs Revision
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p>No attempts recorded yet. Take your first quiz to generate analytics!</p>
              </div>
            )}
          </div>

          {/* Recommended / Pending Quizzes */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-900">Recommended Next Quizzes</h2>
                <Link to="/quizzes" className="text-xs text-indigo-600 font-semibold hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {quizzes.slice(0, 3).map(quiz => {
                  const attempted = attemptedQuizIds.has(quiz.id);
                  return (
                    <div
                      key={quiz.id}
                      className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between gap-3 bg-slate-50/50"
                    >
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {quiz.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span>{quiz.subject}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {quiz.durationMinutes}m
                          </span>
                          <span>·</span>
                          <span>{quiz.questions.length} Qs</span>
                        </div>
                      </div>

                      <Link
                        to={`/quiz/${quiz.id}/instructions`}
                        className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${
                          attempted
                            ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {attempted ? 'Retake' : 'Start'}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Proctored with Countdown Timer</span>
              <span className="font-semibold text-slate-700">Instant Results</span>
            </div>
          </div>
        </div>

        {/* Recent Attempts Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Quiz Attempts</h2>
              <p className="text-xs text-slate-500">Your examination submission history</p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500">
              {userAttempts.length} Records
            </span>
          </div>

          {userAttempts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-3">Quiz Title</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3 text-right">Score</th>
                    <th className="px-6 py-3 text-right">Percentage</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userAttempts.map(att => (
                    <tr key={att.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-3.5">
                        <span className="font-bold text-slate-900 block truncate max-w-[240px]">
                          {att.quizTitle}
                        </span>
                        <span className="text-[11px] text-slate-500">{att.subject}</span>
                      </td>
                      <td className="px-6 py-3.5 text-slate-600 font-mono">
                        {new Date(att.submittedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-3.5 text-right font-mono font-semibold text-slate-800">
                        {att.score} / {att.totalMarks}
                      </td>
                      <td className="px-6 py-3.5 text-right font-mono font-bold text-slate-900">
                        {att.percentage}%
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                            att.passed
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {att.passed ? 'PASSED' : 'NEEDS REVISION'}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/quiz/${att.quizId}/result?attemptId=${att.id}`}
                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors inline-flex items-center gap-1 text-[11px] font-semibold"
                            title="View Scorecard & Review Answers"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Review</span>
                          </Link>
                          <Link
                            to={`/quiz/${att.quizId}/instructions`}
                            className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors inline-flex items-center gap-1 text-[11px] font-semibold"
                            title="Retake Quiz"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Retake</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p>You haven't completed any quizzes yet.</p>
              <Link
                to="/quizzes"
                className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700"
              >
                Start an Assessment
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
