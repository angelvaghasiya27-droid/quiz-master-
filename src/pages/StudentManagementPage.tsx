import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Users,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  X,
  ExternalLink,
  Mail,
  GraduationCap
} from 'lucide-react';
import { SAMPLE_STUDENTS, StudentProfile } from '../data/sampleUsers';
import { useQuiz } from '../context/QuizContext';
import { DashboardLayout } from '../components/common/DashboardLayout';

export const StudentManagementPage: React.FC = () => {
  const { getUserAttempts } = useQuiz();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const filteredStudents = useMemo(() => {
    return SAMPLE_STUDENTS.filter(student => {
      const matchQuery =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchQuery;
    });
  }, [searchQuery]);

  const studentAttempts = selectedStudent ? getUserAttempts(selectedStudent.id) : [];

  return (
    <DashboardLayout
      title="Student Enrollment & Assessment Records"
      subtitle="Track student test completion, average grade distributions, and individual submissions."
      actions={
        <div className="text-xs text-slate-500 font-mono">
          Cohort Size: {SAMPLE_STUDENTS.length} Students
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search students by name, email, or student ID..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          <div className="text-xs text-slate-500">
            Showing <strong className="text-slate-900 font-mono">{filteredStudents.length}</strong> of {SAMPLE_STUDENTS.length} students
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-semibold tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Student ID</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3 text-center">Quizzes Taken</th>
                  <th className="px-6 py-3 text-right">Avg Score</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-100 shrink-0">
                          {student.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block truncate max-w-[200px]">
                            {student.name}
                          </span>
                          <span className="text-[11px] text-slate-500 truncate block">
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-slate-700 font-semibold">
                      {student.studentId}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 truncate max-w-[200px]">
                      {student.department}
                    </td>
                    <td className="px-6 py-3.5 text-center font-mono font-bold text-slate-900">
                      {student.completedQuizzes}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono font-bold text-indigo-700">
                      {student.averageScore}%
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-3 py-1.5 rounded text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                      >
                        View History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Student Attempt History Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                  {selectedStudent.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedStudent.studentId} · {selectedStudent.department}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Performance Stats Strip */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg text-center text-xs border border-slate-200/80">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Completed</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {selectedStudent.completedQuizzes} Quizzes
                </span>
              </div>
              <div className="border-x border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase">Average Score</span>
                <span className="font-bold text-indigo-600 font-mono text-sm">
                  {selectedStudent.averageScore}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Last Activity</span>
                <span className="font-bold text-slate-700 text-xs">
                  {selectedStudent.lastActive}
                </span>
              </div>
            </div>

            {/* Attempts List */}
            <div className="flex-1 overflow-y-auto space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Assessment Submissions Record
              </h4>

              {studentAttempts.length > 0 ? (
                <div className="space-y-2">
                  {studentAttempts.map(att => (
                    <div
                      key={att.id}
                      className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-xs"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900">{att.quizTitle}</h5>
                        <p className="text-[11px] text-slate-500">
                          {att.subject} · {new Date(att.submittedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-800">
                          {att.score}/{att.totalMarks} ({att.percentage}%)
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            att.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {att.passed ? 'PASSED' : 'FAILED'}
                        </span>
                        <Link
                          to={`/quiz/${att.quizId}/result?attemptId=${att.id}`}
                          onClick={() => setSelectedStudent(null)}
                          className="text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                          View Report
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs">
                  No submissions recorded in the local database for this student profile yet.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
