import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, User as UserIcon, LogOut, Menu, X, Shield, BookOpen, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, role, switchRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const handleRoleToggle = () => {
    const nextRole = role === 'student' ? 'admin' : 'student';
    switchRole(nextRole);
    if (nextRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 text-slate-900 group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-tight">
              QuizMaster
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-600 leading-none">
              Assessment Portal
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links (Single-line, clean text with hover effect) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link
            to="/"
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-indigo-600 ${
              isActive('/') && location.pathname === '/' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/quizzes"
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-indigo-600 ${
              isActive('/quizzes') ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Available Quizzes
          </Link>
          <Link
            to="/dashboard"
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-indigo-600 ${
              isActive('/dashboard') ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Student Portal
          </Link>
          <Link
            to="/admin"
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-indigo-600 ${
              isActive('/admin') ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Admin Panel
          </Link>
        </nav>

        {/* Zone 3: Primary Action & User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Demo Switcher Button */}
          <button
            onClick={handleRoleToggle}
            title={`Switch to ${role === 'student' ? 'Faculty Admin' : 'Student'} mode`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            {role === 'student' ? (
              <>
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                <span>Switch to Admin Mode</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Switch to Student Mode</span>
              </>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                aria-expanded={userDropdownOpen}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[120px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">
                    {user.role} Demo
                  </span>
                </div>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {user.role === 'admin' ? 'Faculty Admin' : 'Student (Demo)'}
                    </span>
                  </div>

                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <Layers className="w-4 h-4 text-slate-500" />
                    <span>My Dashboard</span>
                  </Link>
                  <Link
                    to="/quizzes"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    <span>Browse Quizzes</span>
                  </Link>

                  <button
                    onClick={handleRoleToggle}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 border-t border-slate-100"
                  >
                    <Shield className="w-4 h-4 text-slate-500" />
                    <span>Switch to {role === 'student' ? 'Admin' : 'Student'}</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      navigate('/login');
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 border-t border-slate-100"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            to="/quizzes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Available Quizzes
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Student Portal
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Admin Panel
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                handleRoleToggle();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
            >
              Switch Role (Now: {role.toUpperCase()})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
