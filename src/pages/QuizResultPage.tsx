import React, { useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Printer,
  RotateCcw,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { Question } from '../types/quiz';

export const QuizResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getQuizById, getAttemptById, attempts } = useQuiz();
  const { user } = useAuth();

  const [showReview, setShowReview] = useState(true);

  const attemptId = searchParams.get('attemptId');
  const quiz = id ? getQuizById(id) : undefined;

  // Find attempt either by query param or find latest attempt for this quiz
  const attempt = attemptId
    ? getAttemptById(attemptId)
    : attempts.find(a => a.quizId === id);

  if (!quiz || !attempt) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center max-w-md">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-base font-bold text-slate-900">Result Not Found</h2>
          <p className="text-xs text-slate-600 mt-1 mb-6">
            Unable to locate examination records for this assessment session.
          </p>
          <Link
            to="/quizzes"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold"
          >
            Browse Available Quizzes
          </Link>
        </div>
      </div>
    );
  }

  // Calculate time formatted
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s}s`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Printable Scorecard Banner */}
        <div className="print-card bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 relative overflow-hidden">
          {/* Top Pass/Fail Status Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner shrink-0 ${
                  attempt.passed
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-rose-50 text-rose-600 border border-rose-200'
                }`}
              >
                {attempt.passed ? (
                  <Award className="w-9 h-9" />
                ) : (
                  <XCircle className="w-9 h-9" />
                )}
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs">
                  <span
                    className={`font-bold uppercase tracking-wider px-2.5 py-0.5 rounded text-[10px] ${
                      attempt.passed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {attempt.passed ? 'Assessment Passed' : 'Needs Improvement'}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 font-mono">
                    {new Date(attempt.submittedAt).toLocaleDateString()}
                  </span>
                </div>

                <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {attempt.quizTitle}
                </h1>
                <p className="text-xs text-slate-500">
                  Candidate: <strong className="text-slate-800">{attempt.userName}</strong> ({attempt.userEmail})
                </p>
              </div>
            </div>

            {/* Score Ring / Block */}
            <div className="text-center sm:text-right bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[150px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Total Score
              </span>
              <div className="text-3xl font-black text-slate-900 font-mono tabular-nums leading-tight mt-0.5">
                {attempt.score} <span className="text-base text-slate-400 font-normal">/ {attempt.totalMarks}</span>
              </div>
              <span
                className={`text-xs font-bold font-mono ${
                  attempt.passed ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {attempt.percentage}% Obtained
              </span>
            </div>
          </div>

          {/* Performance Breakdown Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 text-center text-xs">
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-[11px] text-slate-500 block mb-1">Correct Answers</span>
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-base font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>{attempt.correctCount}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-[11px] text-slate-500 block mb-1">Incorrect Answers</span>
              <div className="flex items-center justify-center gap-1.5 text-rose-600 font-bold text-base font-mono">
                <XCircle className="w-4 h-4" />
                <span>{attempt.incorrectCount}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-[11px] text-slate-500 block mb-1">Unattempted</span>
              <div className="flex items-center justify-center gap-1.5 text-slate-600 font-bold text-base font-mono">
                <HelpCircle className="w-4 h-4" />
                <span>{attempt.unattemptedCount}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-[11px] text-slate-500 block mb-1">Time Taken</span>
              <div className="flex items-center justify-center gap-1.5 text-indigo-600 font-bold text-base font-mono">
                <Clock className="w-4 h-4" />
                <span>{formatTime(attempt.timeTakenSeconds)}</span>
              </div>
            </div>
          </div>

          {/* Passing Criteria Summary */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>
                Passing threshold: <strong>{quiz.passingPercentage}%</strong> ({Math.ceil((quiz.totalMarks * quiz.passingPercentage) / 100)} marks)
              </span>
            </div>

            <div className="text-[11px] text-slate-400">
              Exam ID: <span className="font-mono">{attempt.id}</span>
            </div>
          </div>

          {/* Actions Bar (Hidden when printing) */}
          <div className="no-print pt-6 border-t border-slate-100 mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-indigo-600" />
                <span>Print Certificate</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/quiz/${quiz.id}/instructions`}
                className="px-4 py-2 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </Link>

              <button
                onClick={() => setShowReview(!showReview)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <span>{showReview ? 'Hide Solutions' : 'Review Answers'}</span>
                {showReview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Solutions & Explanations Review Section */}
        {showReview && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Comprehensive Answer Review & Solutions
                </h2>
                <p className="text-xs text-slate-500">
                  Review questions, your selected responses, correct keys, and academic explanations.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {quiz.questions.map((q, idx) => {
                const userSelected = attempt.answers[q.id] || [];
                const isUnattempted = userSelected.length === 0;

                const sortedUser = [...userSelected].sort();
                const sortedCorrect = [...q.correctAnswers].sort();
                const isCorrect =
                  !isUnattempted &&
                  sortedUser.length === sortedCorrect.length &&
                  sortedUser.every((val, i) => val === sortedCorrect[i]);

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-xl border p-5 sm:p-6 transition-all shadow-2xs ${
                      isCorrect
                        ? 'border-emerald-200'
                        : isUnattempted
                        ? 'border-slate-200'
                        : 'border-rose-200'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Question {idx + 1}</span>
                        <span className="text-slate-400">·</span>
                        <span className="capitalize text-slate-500">
                          {q.type.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-500">+{q.marks} Marks</span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : isUnattempted
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? 'CORRECT' : isUnattempted ? 'UNATTEMPTED' : 'INCORRECT'}
                        </span>
                      </div>
                    </div>

                    {/* Question text */}
                    <h3 className="text-sm font-semibold text-slate-900 mb-3 leading-relaxed">
                      {q.question}
                    </h3>

                    {/* Code snippet if any */}
                    {q.codeSnippet && (
                      <div className="rounded-lg bg-slate-900 text-slate-100 p-3 font-mono text-xs overflow-x-auto mb-3">
                        <pre>{q.codeSnippet}</pre>
                      </div>
                    )}

                    {/* Options list */}
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userSelected.includes(optIdx);
                        const isRightAnswer = q.correctAnswers.includes(optIdx);
                        const alphabet = String.fromCharCode(65 + optIdx);

                        let optClasses = 'border-slate-200 text-slate-700 bg-white';
                        if (isRightAnswer && isChosen) {
                          optClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                        } else if (isRightAnswer) {
                          optClasses = 'border-emerald-400 bg-emerald-50/50 text-emerald-900 font-semibold';
                        } else if (isChosen) {
                          optClasses = 'border-rose-400 bg-rose-50 text-rose-950';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-lg border text-xs flex items-center justify-between ${optClasses}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] bg-white border border-slate-200">
                                {alphabet}
                              </span>
                              <span>{opt}</span>
                            </div>

                            <div className="flex items-center gap-2 text-[11px] shrink-0 font-semibold">
                              {isRightAnswer && (
                                <span className="text-emerald-700 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Correct Answer</span>
                                </span>
                              )}
                              {isChosen && !isRightAnswer && (
                                <span className="text-rose-600 flex items-center gap-1">
                                  <X className="w-3.5 h-3.5" />
                                  <span>Your Choice</span>
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Academic Explanation */}
                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                        Explanation:
                      </span>
                      <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
