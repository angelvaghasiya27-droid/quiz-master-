import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  HelpCircle,
  Clock,
  Award,
  Layers,
  Code2,
  CheckCircle2,
  AlertTriangle,
  MoveUp,
  MoveDown
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { Quiz, Question, QuestionType, Difficulty } from '../types/quiz';
import { DashboardLayout } from '../components/common/DashboardLayout';

export const CreateQuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuizById, saveQuiz } = useQuiz();
  const { user } = useAuth();

  const isEditing = !!id;
  const existingQuiz = id ? getQuizById(id) : undefined;

  // Metadata Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [customSubject, setCustomSubject] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [passingPercentage, setPassingPercentage] = useState(60);

  // Questions List State
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q_' + Date.now(),
      question: '',
      type: 'multiple-choice',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswers: [0],
      marks: 2,
      explanation: ''
    }
  ]);

  const [error, setError] = useState<string | null>(null);

  // Pre-fill on editing
  useEffect(() => {
    if (isEditing && existingQuiz) {
      setTitle(existingQuiz.title);
      setDescription(existingQuiz.description);
      setSubject(existingQuiz.subject);
      setDurationMinutes(existingQuiz.durationMinutes);
      setDifficulty(existingQuiz.difficulty);
      setPassingPercentage(existingQuiz.passingPercentage);
      setQuestions(existingQuiz.questions);
    }
  }, [isEditing, existingQuiz]);

  const handleAddQuestion = () => {
    const newQ: Question = {
      id: 'q_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
      question: '',
      type: 'multiple-choice',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswers: [0],
      marks: 2,
      explanation: ''
    };
    setQuestions(prev => [...prev, newQ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    if (questions.length <= 1) {
      alert('A quiz must have at least one question.');
      return;
    }
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleQuestionChange = (idx: number, updates: Partial<Question>) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], ...updates };
      return copy;
    });
  };

  const handleTypeChange = (idx: number, newType: QuestionType) => {
    setQuestions(prev => {
      const copy = [...prev];
      const q = copy[idx];
      let newOptions = q.options;
      let newCorrect = [0];

      if (newType === 'true-false') {
        newOptions = ['True', 'False'];
        newCorrect = [0];
      } else if (newOptions.length < 2) {
        newOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
      }

      copy[idx] = {
        ...q,
        type: newType,
        options: newOptions,
        correctAnswers: newCorrect
      };
      return copy;
    });
  };

  const handleOptionTextChange = (qIdx: number, optIdx: number, text: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      const opts = [...copy[qIdx].options];
      opts[optIdx] = text;
      copy[qIdx] = { ...copy[qIdx], options: opts };
      return copy;
    });
  };

  const handleAddOption = (qIdx: number) => {
    setQuestions(prev => {
      const copy = [...prev];
      const opts = [...copy[qIdx].options, `Option ${copy[qIdx].options.length + 1}`];
      copy[qIdx] = { ...copy[qIdx], options: opts };
      return copy;
    });
  };

  const handleRemoveOption = (qIdx: number, optIdx: number) => {
    setQuestions(prev => {
      const copy = [...prev];
      if (copy[qIdx].options.length <= 2) {
        alert('Each question must have at least 2 answer choices.');
        return prev;
      }
      const opts = copy[qIdx].options.filter((_, i) => i !== optIdx);
      // Adjust correct answers
      const newCorrect = copy[qIdx].correctAnswers
        .filter(i => i !== optIdx)
        .map(i => (i > optIdx ? i - 1 : i));
      copy[qIdx] = {
        ...copy[qIdx],
        options: opts,
        correctAnswers: newCorrect.length > 0 ? newCorrect : [0]
      };
      return copy;
    });
  };

  const handleToggleCorrectAnswer = (qIdx: number, optIdx: number) => {
    setQuestions(prev => {
      const copy = [...prev];
      const q = copy[qIdx];

      if (q.type === 'multiple-select') {
        const existing = q.correctAnswers;
        let updated: number[];
        if (existing.includes(optIdx)) {
          if (existing.length === 1) return prev; // Keep at least one
          updated = existing.filter(i => i !== optIdx);
        } else {
          updated = [...existing, optIdx];
        }
        copy[qIdx] = { ...q, correctAnswers: updated };
      } else {
        // Single select or True/False
        copy[qIdx] = { ...q, correctAnswers: [optIdx] };
      }

      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please provide a descriptive quiz title.');
      return;
    }

    if (questions.some(q => !q.question.trim())) {
      setError('All questions must have a non-empty question statement.');
      return;
    }

    const finalSubject = subject === 'Other' ? customSubject.trim() || 'General Studies' : subject;
    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 2), 0);

    const quizPayload: Quiz = {
      id: isEditing && existingQuiz ? existingQuiz.id : 'quiz_' + Date.now(),
      title: title.trim(),
      description: description.trim() || 'Standard collegiate curriculum assessment module.',
      subject: finalSubject,
      durationMinutes: Number(durationMinutes) || 15,
      totalMarks,
      passingPercentage: Number(passingPercentage) || 60,
      difficulty,
      questions,
      createdAt: isEditing && existingQuiz ? existingQuiz.createdAt : new Date().toISOString().split('T')[0],
      author: user ? user.name : 'Faculty Administrator'
    };

    saveQuiz(quizPayload);
    navigate('/admin');
  };

  return (
    <DashboardLayout
      title={isEditing ? `Edit: ${existingQuiz?.title}` : 'Create New Assessment Module'}
      subtitle="Author questions, assign point weightings, and configure time constraints."
      actions={
        <Link
          to="/admin"
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & Back</span>
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. Quiz Metadata Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Assessment Details & Settings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quiz Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                placeholder="e.g. Data Structures & Algorithms (Module 1)"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description / Syllabus Coverage
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={2}
                placeholder="Briefly describe what competencies or topics this exam evaluates..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subject / Department
              </label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-700"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Programming in C">Programming in C</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Other">Custom Subject</option>
              </select>
              {subject === 'Other' && (
                <input
                  type="text"
                  value={customSubject}
                  onChange={e => setCustomSubject(e.target.value)}
                  placeholder="Enter custom subject name..."
                  className="mt-2 w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              )}
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as Difficulty)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-700"
              >
                <option value="Beginner">Beginner (1st Year Intro)</option>
                <option value="Intermediate">Intermediate (Core Concepts)</option>
                <option value="Advanced">Advanced (Comprehensive)</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Duration (Minutes) *
              </label>
              <input
                type="number"
                min={1}
                max={180}
                value={durationMinutes}
                onChange={e => setDurationMinutes(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              />
            </div>

            {/* Passing Percentage */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Passing Threshold (%)
              </label>
              <input
                type="number"
                min={10}
                max={100}
                value={passingPercentage}
                onChange={e => setPassingPercentage(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              />
            </div>
          </div>
        </div>

        {/* 2. Questions Builder Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Examination Questions ({questions.length})
              </h3>
              <p className="text-xs text-slate-500">
                Configure question stems, multiple choices, and correct solution keys.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Question</span>
            </button>
          </div>

          {questions.map((q, qIdx) => (
            <div
              key={q.id}
              className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {qIdx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Question #{qIdx + 1}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Question Type */}
                  <select
                    value={q.type}
                    onChange={e => handleTypeChange(qIdx, e.target.value as QuestionType)}
                    className="py-1 px-2.5 text-xs border border-slate-300 rounded-md bg-white text-slate-700 font-medium"
                  >
                    <option value="multiple-choice">Multiple Choice (Single)</option>
                    <option value="true-false">True / False</option>
                    <option value="multiple-select">Multiple Select (Checkboxes)</option>
                  </select>

                  {/* Marks */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-500">Marks:</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={q.marks}
                      onChange={e => handleQuestionChange(qIdx, { marks: Number(e.target.value) || 1 })}
                      className="w-14 py-1 px-2 text-xs border border-slate-300 rounded-md text-center bg-white font-mono"
                    />
                  </div>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(qIdx)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Statement */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Question Text *
                </label>
                <textarea
                  value={q.question}
                  onChange={e => handleQuestionChange(qIdx, { question: e.target.value })}
                  rows={2}
                  required
                  placeholder="Enter the question statement clearly..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              {/* Optional Code Snippet */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Optional Code Snippet (C / Java / Python / Pseudocode)</span>
                </label>
                <textarea
                  value={q.codeSnippet || ''}
                  onChange={e => handleQuestionChange(qIdx, { codeSnippet: e.target.value })}
                  rows={3}
                  placeholder={`#include <stdio.h>\nint main() {\n  // Code goes here...\n}`}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                />
              </div>

              {/* Options & Correct Answer Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Options & Correct Answer ({q.type === 'multiple-select' ? 'Click checkboxes for all correct options' : 'Select radio for correct answer'})
                  </label>
                  {q.type !== 'true-false' && q.options.length < 6 && (
                    <button
                      type="button"
                      onClick={() => handleAddOption(qIdx)}
                      className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Option</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {q.options.map((optText, optIdx) => {
                    const isCorrect = q.correctAnswers.includes(optIdx);
                    const isMulti = q.type === 'multiple-select';

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                          isCorrect ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50/50 border-slate-200'
                        }`}
                      >
                        {/* Radio or Checkbox */}
                        <button
                          type="button"
                          onClick={() => handleToggleCorrectAnswer(qIdx, optIdx)}
                          className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs transition-colors cursor-pointer shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-slate-300 text-slate-400 hover:border-slate-400'
                          }`}
                          title={isCorrect ? 'Marked as correct' : 'Click to mark correct'}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </button>

                        {/* Option Text Input */}
                        <input
                          type="text"
                          value={optText}
                          onChange={e => handleOptionTextChange(qIdx, optIdx, e.target.value)}
                          disabled={q.type === 'true-false'}
                          required
                          className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:ring-1 focus:ring-indigo-500"
                        />

                        {/* Remove Option (if not true/false) */}
                        {q.type !== 'true-false' && q.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(qIdx, optIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Solution Explanation */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Answer Explanation / Solution Rationale
                </label>
                <input
                  type="text"
                  value={q.explanation}
                  onChange={e => handleQuestionChange(qIdx, { explanation: e.target.value })}
                  placeholder="Explain why this answer is correct (shown to students during post-exam review)..."
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>
          ))}

          {/* Add another question bottom CTA */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Question</span>
            </button>
          </div>
        </div>

        {/* Submit & Save Bar */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <Link
            to="/admin"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes & Update Quiz' : 'Publish & Save Quiz to Portal'}</span>
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};
