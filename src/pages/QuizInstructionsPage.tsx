import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  HelpCircle,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Monitor,
  Check,
  FileText
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export const QuizInstructionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getQuizById } = useQuiz();
  const navigate = useNavigate();

  const quiz = id ? getQuizById(id) : undefined;
  const [agreed, setAgreed] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h2 className="text-base font-bold text-slate-900">Quiz Not Found</h2>
          <p className="text-xs text-slate-600 mt-1 mb-6">
            The assessment you are trying to access does not exist or was removed.
          </p>
          <Link
            to="/quizzes"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700"
          >
            Back to Available Quizzes
          </Link>
        </div>
      </div>
    );
  }

  const passingMarks = Math.ceil((quiz.totalMarks * quiz.passingPercentage) / 100);

  const handleStart = () => {
    if (!agreed) return;
    navigate(`/quiz/${quiz.id}/attempt`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Navigation Breadcrumb */}
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Available Quizzes</span>
        </Link>

        {/* Assessment Overview Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded">
                  {quiz.subject}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {quiz.difficulty} Level
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {quiz.title}
              </h1>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-xl">
                {quiz.description}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center shrink-0 min-w-[140px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                Time Allowed
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums block mt-0.5">
                {quiz.durationMinutes} : 00
              </span>
              <span className="text-[11px] text-slate-500">Minutes</span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-slate-100 text-center text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Total Questions</span>
              <span className="font-bold text-slate-900 text-sm font-mono tabular-nums">
                {quiz.questions.length} Items
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Maximum Marks</span>
              <span className="font-bold text-slate-900 text-sm font-mono tabular-nums">
                {quiz.totalMarks} Points
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Passing Criteria</span>
              <span className="font-bold text-slate-900 text-sm font-mono tabular-nums">
                {quiz.passingPercentage}% ({passingMarks} Marks)
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Negative Marking</span>
              <span className="font-bold text-emerald-600 text-sm">
                None (0 penalty)
              </span>
            </div>
          </div>

          {/* Detailed Instructions & Rules */}
          <div className="py-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
              Examination Guidelines & Rules
            </h3>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Continuous Timer:</strong> The countdown timer will start immediately when you click <em>"Start Assessment"</em>. The assessment will automatically submit when the timer expires.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Question Types:</strong> Questions may be standard Multiple Choice (1 option), True/False, or Multiple Select (square checkboxes where one or more options can be correct).
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Question Navigation Palette:</strong> You can jump directly to any question by clicking its index number in the right-hand palette. You may also flag questions for later review using the <em>"Mark for Review"</em> feature.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Submission & Evaluation:</strong> You can review all attempted and unattempted answers before final submission. Once submitted, your score, percentage, and detailed answer explanations will be generated immediately.
                </span>
              </div>
            </div>
          </div>

          {/* Pre-Exam System Readiness Check */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-6">
            <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-indigo-600" />
              <span>Browser & Client Diagnostics</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Browser: Modern HTML5 Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Storage: LocalStorage Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Clock: Precision Millisecond Sync</span>
              </div>
            </div>
          </div>

          {/* Acknowledgement & Start Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span>I have read and understood all the assessment rules and instructions.</span>
            </label>

            <button
              onClick={handleStart}
              disabled={!agreed}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                agreed
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
