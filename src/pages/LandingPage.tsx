import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Shield,
  Award,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  FileText,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';

export const LandingPage: React.FC = () => {
  const { switchRole } = useAuth();
  const { quizzes } = useQuiz();
  const navigate = useNavigate();

  const handleDemoStudent = () => {
    switchRole('student');
    navigate('/dashboard');
  };

  const handleDemoAdmin = () => {
    switchRole('admin');
    navigate('/admin');
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-md">
                <span>College Academic Examination Portal</span>
                <span aria-hidden="true">·</span>
                <span>Term Assessments 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
                Standardized Online Quiz & Assessment Portal
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Experience real-world examination standards. Features precision countdown timers, interactive question navigation palettes, multi-format evaluations, and instant analytical performance scorecards.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/quizzes"
                  className="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <span>Browse Available Quizzes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleDemoStudent}
                  className="px-5 py-3 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors inline-flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Student Demo Dashboard</span>
                </button>

                <button
                  onClick={handleDemoAdmin}
                  className="px-5 py-3 rounded-lg text-sm font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Faculty Admin Portal</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Zero Backend Requirement</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Auto-Submitting Timer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Printable Certificates</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Quiz Mockup Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6 relative">
                {/* Simulated Exam Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">
                      Live Simulation
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      Programming in C (Mid-Term)
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900 text-amber-400 font-mono text-xs px-2.5 py-1 rounded">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>14:38</span>
                  </div>
                </div>

                {/* Simulated Question */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Question 03 of 10</span>
                    <span className="font-semibold text-slate-700">+2 Marks</span>
                  </div>

                  <p className="text-sm font-medium text-slate-900 leading-snug">
                    What does the pointer expression <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">*(ptr + 2)</code> evaluate to for array <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">&#123;10, 20, 30, 40&#125;</code>?
                  </p>

                  {/* Options */}
                  <div className="space-y-2 pt-1">
                    {['10', '20', '30 (Correct Answer)', '40'].map((opt, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-between ${
                          i === 2
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt}</span>
                        {i === 2 && <CheckCircle className="w-4 h-4 text-indigo-600" />}
                      </div>
                    ))}
                  </div>

                  {/* Question Palette preview */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                      <span>Palette Status</span>
                      <span>3 Answered · 1 Review</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[1, 2, 3, 4, 5].map(num => (
                        <div
                          key={num}
                          className={`h-7 rounded text-xs font-bold flex items-center justify-center ${
                            num === 1 || num === 2
                              ? 'bg-emerald-600 text-white'
                              : num === 3
                              ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                              : num === 4
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="bg-slate-50 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">3 Modules</div>
              <div className="text-xs text-slate-500 mt-1">CS, C & AI Included</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">30+ Questions</div>
              <div className="text-xs text-slate-500 mt-1">Curated with Explanations</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">100% Client-Side</div>
              <div className="text-xs text-slate-500 mt-1">Local Storage Persistence</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">Instant Results</div>
              <div className="text-xs text-slate-500 mt-1">Printable Certificates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quizzes Section */}
      <section id="quizzes" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Curriculum Assessment Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Featured Sample Quizzes
              </h2>
            </div>
            <Link
              to="/quizzes"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View All Available Quizzes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quizzes.slice(0, 3).map((quiz, index) => {
              const icons = [Cpu, Code2, Layers];
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={quiz.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all shadow-2xs hover:shadow-md p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {quiz.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2">{quiz.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {quiz.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{quiz.questions.length} Questions</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{quiz.durationMinutes} Mins</span>
                      </div>
                      <span>·</span>
                      <span className="font-semibold text-slate-700">{quiz.totalMarks} Marks</span>
                    </div>
                  </div>

                  <div className="pt-5 mt-4">
                    <Link
                      to={`/quiz/${quiz.id}/instructions`}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs"
                    >
                      <span>Take Assessment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Platform Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Examination Features Built for Academic Rigor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Engineered with full client-side state preservation, reactive timers, and analytical feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Precision Countdown Timer
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatic second-by-second countdown with visual color transitions (green to warning red) and auto-submission when time runs out.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Interactive Question Palette
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full visual grid tracking answered, unanswered, marked for review, and current questions with instantaneous navigation jumps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Automatic Evaluation & Explanations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant score calculation with accurate pass/fail thresholds, question-by-question solution keys, and printable report certificates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Multi-Type Question Formats
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full support for standard Multiple Choice, True/False, and Multi-Select checkboxes, complete with formatted code snippet blocks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Faculty Quiz Builder
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interactive admin dashboard allowing instructors to add, edit, preview, and delete custom quizzes stored directly in browser storage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Student Roster Management
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Faculty oversight table tracking student profiles, completion rates, overall performance percentages, and individual attempt histories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Exam Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              How Assessment Testing Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Select Assessment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose from Computer Science, C Programming, or AI. Review exam instructions, total marks, duration, and passing criteria.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Take Timed Exam</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Answer single and multi-select questions with live timer feedback. Use the question palette to jump, review, and confirm submission.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Instant Scorecard & Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get immediate pass/fail analysis, review correct answers with detailed explanations, and print or download your verified result sheet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Helper Section */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Ready to Explore? Test Drive with Demo Personas
            </h3>
            <p className="text-xs text-slate-600 max-w-xl mx-auto mb-6">
              Switch roles freely to test the student quiz-taking workflow or the faculty quiz creation and student management interface.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDemoStudent}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs flex items-center justify-center gap-2"
              >
                <span>Login as Student (Alex Rivera)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDemoAdmin}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                <span>Login as Faculty (Prof. Sharma)</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
