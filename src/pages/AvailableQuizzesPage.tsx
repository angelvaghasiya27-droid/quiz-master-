import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  HelpCircle,
  Award,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';

export const AvailableQuizzesPage: React.FC = () => {
  const { quizzes, getUserAttempts } = useQuiz();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const userAttempts = user ? getUserAttempts(user.id) : [];
  const attemptedMap = useMemo(() => {
    const map = new Map<string, { score: number; percentage: number; passed: boolean }>();
    userAttempts.forEach(att => {
      // Keep best or most recent
      if (!map.has(att.quizId) || att.percentage > map.get(att.quizId)!.percentage) {
        map.set(att.quizId, {
          score: att.score,
          percentage: att.percentage,
          passed: att.passed
        });
      }
    });
    return map;
  }, [userAttempts]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Extract unique subjects
  const subjects = useMemo(() => {
    const set = new Set<string>();
    quizzes.forEach(q => set.add(q.subject));
    return Array.from(set);
  }, [quizzes]);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(quiz => {
      // Search
      const matchSearch =
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      // Subject
      if (selectedSubject !== 'all' && quiz.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'all' && quiz.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Status
      const isAttempted = attemptedMap.has(quiz.id);
      if (selectedStatus === 'attempted' && !isAttempted) return false;
      if (selectedStatus === 'unattempted' && isAttempted) return false;

      return true;
    });
  }, [quizzes, searchQuery, selectedSubject, selectedDifficulty, selectedStatus, attemptedMap]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('all');
    setSelectedDifficulty('all');
    setSelectedStatus('all');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Assessment Catalog</span>
            <span>·</span>
            <span>Semester Quizzes 2026</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Available Online Quizzes & Exams
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Select an assessment to begin. Each exam features proctored live countdown timing, multiple-choice, true/false, and multiple-select questions.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by quiz title, keyword, or topic..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>

            {/* Subject Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-700"
              >
                <option value="all">All Subjects</option>
                {subjects.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-700"
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-700"
              >
                <option value="all">All Attempts</option>
                <option value="unattempted">Not Attempted</option>
                <option value="attempted">Attempted</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips & Clear */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-2">
              <span>Showing <strong className="text-slate-900 font-mono tabular-nums">{filteredQuizzes.length}</strong> of {quizzes.length} quizzes</span>
            </div>
            {(searchQuery || selectedSubject !== 'all' || selectedDifficulty !== 'all' || selectedStatus !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Quizzes Grid */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map(quiz => {
              const prev = attemptedMap.get(quiz.id);
              const isAttempted = !!prev;

              return (
                <div
                  key={quiz.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between p-6"
                >
                  <div>
                    {/* Top Tag Row */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {quiz.subject}
                      </span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded ${
                          quiz.difficulty === 'Beginner'
                            ? 'bg-emerald-50 text-emerald-700'
                            : quiz.difficulty === 'Intermediate'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {quiz.difficulty}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {quiz.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {quiz.description}
                    </p>

                    {/* Details row */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg text-center text-xs mb-4">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Questions</span>
                        <span className="font-bold text-slate-800 font-mono tabular-nums">
                          {quiz.questions.length}
                        </span>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-[10px] text-slate-500 block uppercase">Duration</span>
                        <span className="font-bold text-slate-800 font-mono tabular-nums">
                          {quiz.durationMinutes} min
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Marks</span>
                        <span className="font-bold text-slate-800 font-mono tabular-nums">
                          {quiz.totalMarks}
                        </span>
                      </div>
                    </div>

                    {/* Previous Result (if attempted) */}
                    {isAttempted && (
                      <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900 mb-4">
                        <div className="flex items-center gap-1.5 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Best Score: {prev.score} / {quiz.totalMarks}</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-700">{prev.percentage}%</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <Link
                      to={`/quiz/${quiz.id}/instructions`}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold transition-colors shadow-2xs ${
                        isAttempted
                          ? 'bg-slate-800 hover:bg-slate-900 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isAttempted ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retake Assessment</span>
                        </>
                      ) : (
                        <>
                          <span>Start Assessment</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-900">No quizzes match your filters</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, subject filter, or difficulty settings.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
