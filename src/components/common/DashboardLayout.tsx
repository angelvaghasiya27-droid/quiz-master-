import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  Award,
  Shield,
  GraduationCap,
  ArrowRightLeft,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  actions
}) => {
  const { user, role, switchRole } = useAuth();
  const location = useLocation();

  const isStudent = role === 'student';

  const navItems = isStudent
    ? [
        { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Available Quizzes', href: '/quizzes', icon: BookOpen },
      ]
    : [
        { label: 'Admin Overview', href: '/admin', icon: LayoutDashboard },
        { label: 'Create New Quiz', href: '/admin/create-quiz', icon: PlusCircle },
        { label: 'Student Management', href: '/admin/students', icon: Users },
        { label: 'Quiz Catalog', href: '/quizzes', icon: BookOpen },
      ];

  const handleToggleRole = () => {
    switchRole(isStudent ? 'admin' : 'student');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex">
      {/* Sidebar (Desktop 260px) */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-slate-200 shrink-0">
        {/* User Card */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-sm">
              {user ? user.name.slice(0, 2).toUpperCase() : 'US'}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-slate-900 truncate">
                {user ? user.name : 'Guest User'}
              </h3>
              <p className="text-xs text-slate-500 truncate">
                {user ? user.department || user.email : 'alex.student@college.edu'}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Mode:
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                isStudent
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-indigo-50 text-indigo-700'
              }`}
            >
              {isStudent ? 'Student Portal' : 'Faculty Admin'}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 flex-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    active ? 'text-indigo-600' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Switch Persona Fast Action */}
        <div className="p-4 border-t border-slate-200">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <p className="text-[11px] font-medium text-slate-600 mb-2">
              Viewing as <strong className="text-slate-900">{isStudent ? 'Student' : 'Faculty Admin'}</strong>
            </p>
            <button
              onClick={handleToggleRole}
              className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-md text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-600" />
              <span>Switch to {isStudent ? 'Admin' : 'Student'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Breadcrumb & Actions Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>QuizMaster</span>
              <span>/</span>
              <span className="capitalize">{isStudent ? 'Student Portal' : 'Admin Console'}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>

          {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
        </div>

        {/* Page Body */}
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
