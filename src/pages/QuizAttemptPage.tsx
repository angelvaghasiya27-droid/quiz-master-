import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  HelpCircle,
  Flag,
  ArrowLeft,
  ArrowRight,
  Send,
  AlertTriangle,
  RotateCcw,
  CheckSquare,
  Square,
  Bookmark,
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { Question } from '../types/quiz';

interface QuestionState {
  selectedOptions: number[];
  isMarkedForReview: boolean;
  isVisited: boolean;
}

export const QuizAttemptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuizById, recordAttempt } = useQuiz();
  const { user } = useAuth();

  const quiz = id ? getQuizById(id) : undefined;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Initialize quiz state and timer
  useEffect(() => {
    if (!quiz) return;

    // Total seconds for quiz
    const totalSeconds = quiz.durationMinutes * 60;
    setTimeRemainingSeconds(totalSeconds);
    startTimeRef.current = Date.now();

    // Initialize question tracking
    const initial: Record<string, QuestionState> = {};
    quiz.questions.forEach((q, idx) => {
      initial[q.id] = {
        selectedOptions: [],
        isMarkedForReview: false,
        isVisited: idx === 0
      };
    });
    setQuestionStates(initial);
  }, [quiz]);

  // Handle countdown timer
  useEffect(() => {
    if (!quiz || timeRemainingSeconds <= 0) return;

    timerRef.current = window.setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quiz]);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h2 className="text-base font-bold text-slate-900">Quiz Not Found</h2>
          <Link
            to="/quizzes"
            className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion: Question = quiz.questions[currentIndex];
  const currentState: QuestionState = questionStates[currentQuestion.id] || {
    selectedOptions: [],
    isMarkedForReview: false,
    isVisited: true
  };

  // Option selection logic
  const handleSelectOption = (optionIndex: number) => {
    setQuestionStates(prev => {
      const existing = prev[currentQuestion.id]?.selectedOptions || [];
      let updated: number[];

      if (currentQuestion.type === 'multiple-select') {
        // Toggle option in array
        if (existing.includes(optionIndex)) {
          updated = existing.filter(idx => idx !== optionIndex);
        } else {
          updated = [...existing, optionIndex];
        }
      } else {
        // Single choice or True/False: replace
        updated = [optionIndex];
      }

      return {
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          selectedOptions: updated,
          isVisited: true
        }
      };
    });
  };

  const handleClearSelection = () => {
    setQuestionStates(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        selectedOptions: []
      }
    }));
  };

  const handleToggleMarkForReview = () => {
    setQuestionStates(prev => {
      const curr = prev[currentQuestion.id];
      return {
        ...prev,
        [currentQuestion.id]: {
          ...curr,
          isMarkedForReview: !curr.isMarkedForReview
        }
      };
    });
  };

  const handleNavigateQuestion = (index: number) => {
    if (index < 0 || index >= quiz.questions.length) return;
    const targetQ = quiz.questions[index];
    setQuestionStates(prev => ({
      ...prev,
      [targetQ.id]: {
        ...prev[targetQ.id],
        isVisited: true
      }
    }));
    setCurrentIndex(index);
  };

  // Live Statistics for Palette
  const answeredCount = Object.values(questionStates).filter(
    s => s.selectedOptions.length > 0
  ).length;

  const markedForReviewCount = Object.values(questionStates).filter(
    s => s.isMarkedForReview
  ).length;

  const unansweredCount = quiz.questions.length - answeredCount;

  // Format timer MM:SS
  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const isTimeCritical = timeRemainingSeconds <= 120; // 2 minutes or less

  // Actual Submission Logic
  const executeSubmission = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (timerRef.current) clearInterval(timerRef.current);

    const elapsedSeconds = Math.max(
      1,
      Math.floor((Date.now() - startTimeRef.current) / 1000)
    );

    // Format answers dictionary for recordAttempt
    const answersRecord: Record<string, number[]> = {};
    quiz.questions.forEach(q => {
      answersRecord[q.id] = questionStates[q.id]?.selectedOptions || [];
    });

    const newAttempt = recordAttempt({
      quizId: quiz.id,
      userId: user?.id || 'guest_student',
      userName: user?.name || 'Alex Rivera (Student)',
      userEmail: user?.email || 'alex.student@college.edu',
      answers: answersRecord,
      timeTakenSeconds: elapsedSeconds
    });

    navigate(`/quiz/${quiz.id}/result?attemptId=${newAttempt.id}`, { replace: true });
  };

  const handleTimeExpired = () => {
    setIsTimeUpModalOpen(true);
    setTimeout(() => {
      executeSubmission();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col select-none">
      {/* Top Examination Proctor Header */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-slate-800 px-2 py-0.5 rounded">
              Active Assessment
            </span>
            <h1 className="text-sm sm:text-base font-bold text-white truncate">
              {quiz.title}
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            {/* Live Countdown Clock */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm sm:text-base font-bold tracking-wider transition-colors ${
                isTimeCritical
                  ? 'bg-rose-950 text-rose-300 border border-rose-700 animate-pulse'
                  : 'bg-slate-800 text-amber-300 border border-slate-700'
              }`}
            >
              <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-400' : 'text-amber-400'}`} />
              <span>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>

            {/* Quick Submit Button in Header */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Finish &</span>
              <span>Submit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace: 2 Column Layout (Left: Question Area, Right: Palette) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Question Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col min-h-[580px]">
          {/* Question Subheader */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">
                Question {currentIndex + 1} of {quiz.questions.length}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize">
                {currentQuestion.type.replace('-', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-slate-600 font-mono">
                +{currentQuestion.marks} Marks
              </span>
              <button
                onClick={handleToggleMarkForReview}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                  currentState.isMarkedForReview
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${currentState.isMarkedForReview ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{currentState.isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 flex-1 space-y-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>

            {/* Code Snippet Box (if present) */}
            {currentQuestion.codeSnippet && (
              <div className="rounded-lg bg-slate-900 border border-slate-800 text-slate-100 p-4 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <span>Source Code (C)</span>
                  <span>Read Only</span>
                </div>
                <pre>{currentQuestion.codeSnippet}</pre>
              </div>
            )}

            {/* Instruction for Multiple Select */}
            {currentQuestion.type === 'multiple-select' && (
              <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Multiple Select: Select all options that apply (more than one answer may be correct).</span>
              </div>
            )}

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = currentState.selectedOptions.includes(optIdx);
                const isMultipleSelect = currentQuestion.type === 'multiple-select';
                const alphabet = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md shrink-0 flex items-center justify-center font-bold text-xs transition-colors mt-0.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {isMultipleSelect ? (
                        isSelected ? <CheckSquare className="w-4 h-4" /> : alphabet
                      ) : (
                        alphabet
                      )}
                    </div>
                    <span className="flex-1 leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Control Bar */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/60 rounded-b-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavigateQuestion(currentIndex - 1)}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  currentIndex === 0
                    ? 'text-slate-300 bg-slate-100 cursor-not-allowed'
                    : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleClearSelection}
                disabled={currentState.selectedOptions.length === 0}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  currentState.selectedOptions.length === 0
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
                }`}
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              {currentIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={() => handleNavigateQuestion(currentIndex + 1)}
                  className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-2xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Exam</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Question Navigation Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Question Palette
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {quiz.questions.length} Items Total
              </span>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 shrink-0" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-200 shrink-0" />
                <span>Not Answered ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-500 shrink-0" />
                <span>Review ({markedForReviewCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-indigo-600 ring-2 ring-indigo-300 shrink-0" />
                <span>Current Item</span>
              </div>
            </div>

            {/* Grid of Question Buttons */}
            <div className="grid grid-cols-5 gap-2">
              {quiz.questions.map((q, qIdx) => {
                const s = questionStates[q.id] || {
                  selectedOptions: [],
                  isMarkedForReview: false,
                  isVisited: false
                };
                const hasAnswer = s.selectedOptions.length > 0;
                const isCurrent = qIdx === currentIndex;
                const isMarked = s.isMarkedForReview;

                let colorClasses = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (hasAnswer && isMarked) {
                  colorClasses = 'bg-indigo-600 text-white font-bold';
                } else if (hasAnswer) {
                  colorClasses = 'bg-emerald-600 text-white font-bold';
                } else if (isMarked) {
                  colorClasses = 'bg-amber-500 text-white font-bold';
                }

                if (isCurrent) {
                  colorClasses += ' ring-2 ring-offset-2 ring-indigo-600';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleNavigateQuestion(qIdx)}
                    className={`h-9 rounded-lg text-xs font-semibold transition-all flex items-center justify-center relative cursor-pointer ${colorClasses}`}
                    title={`Question ${qIdx + 1}: ${hasAnswer ? 'Answered' : 'Unanswered'}${isMarked ? ' (Marked for review)' : ''}`}
                  >
                    <span>{qIdx + 1}</span>
                    {isMarked && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action inside palette */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-2xs flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Final Assessment</span>
              </button>
            </div>
          </div>

          {/* Guidelines Reminder Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[11px] text-slate-600 space-y-1.5">
            <p className="font-bold text-slate-800 text-xs">Examination Invariants:</p>
            <p>• Navigating does not reset chosen selections.</p>
            <p>• Answers auto-submit when the countdown reaches 00:00.</p>
            <p>• Marked items are evaluated if an answer is selected.</p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Confirm Assessment Submission
                </h3>
                <p className="text-xs text-slate-500">
                  Review your summary before submitting.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg text-center text-xs border border-slate-200/80">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Answered</span>
                <span className="text-emerald-600 font-bold font-mono text-sm">
                  {answeredCount}
                </span>
              </div>
              <div className="border-x border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase">Unanswered</span>
                <span className="text-rose-600 font-bold font-mono text-sm">
                  {unansweredCount}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Review</span>
                <span className="text-amber-600 font-bold font-mono text-sm">
                  {markedForReviewCount}
                </span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                Warning: You still have <strong>{unansweredCount}</strong> unattempted question{unansweredCount === 1 ? '' : 's'}. Are you sure you wish to submit now?
              </p>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Return to Quiz
              </button>
              <button
                type="button"
                onClick={executeSubmission}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1.5"
              >
                <span>{isSubmitting ? 'Evaluating...' : 'Yes, Submit Test'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Submit Time Expired Modal */}
      {isTimeUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-sm w-full p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Time Expired!
            </h3>
            <p className="text-xs text-slate-600">
              The allotted exam duration has ended. Your answers have been preserved and are being automatically evaluated...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
