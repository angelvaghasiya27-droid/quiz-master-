import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Terminal, Award, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="no-print bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center font-bold">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-white">QuizMaster</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Standardized examination and timed assessment portal engineered for college students and faculty.
            </p>
            <div className="text-[11px] text-slate-500">
              Department of Computer Science & Engineering
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Assessment Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/quizzes?subject=Computer+Science" className="hover:text-indigo-400 transition-colors">
                  CS Fundamentals
                </Link>
              </li>
              <li>
                <Link to="/quizzes?subject=Programming+in+C" className="hover:text-indigo-400 transition-colors">
                  Programming in C
                </Link>
              </li>
              <li>
                <Link to="/quizzes?subject=Artificial+Intelligence" className="hover:text-indigo-400 transition-colors">
                  Artificial Intelligence Basics
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="hover:text-indigo-400 transition-colors">
                  All Available Quizzes
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Portals & Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-indigo-400 transition-colors">
                  Faculty Administration
                </Link>
              </li>
              <li>
                <Link to="/admin/create-quiz" className="hover:text-indigo-400 transition-colors">
                  Create New Quiz
                </Link>
              </li>
              <li>
                <Link to="/admin/students" className="hover:text-indigo-400 transition-colors">
                  Student Roster & Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Tech Disclaimer */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Frontend Project
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Developed as a 1st-Year College Frontend Development Project. Utilizes React 19, TypeScript, Tailwind CSS, and browser-local state storage.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Client-Side State</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Auto Evaluation</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Timer Engine</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; 2026 QuizMaster Online Assessment Portal. Academic Demonstration.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Client Security Active
            </span>
            <span>·</span>
            <Link to="/quizzes" className="hover:text-slate-300">Exam Instructions</Link>
            <span>·</span>
            <Link to="/dashboard" className="hover:text-slate-300">Sample Records</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
