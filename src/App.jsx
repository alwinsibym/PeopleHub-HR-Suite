import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeProfile from './pages/EmployeeProfile';
import AttendanceLeave from './pages/AttendanceLeave';
import Performance from './pages/Performance';
import Payroll from './pages/Payroll';
import Auth from './pages/Auth';
import { AppProvider, useApp } from './context/AppContext';
import { CheckCircle2, XCircle } from 'lucide-react';
import './App.css';

function ToastContainer() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className={`toast ${toast.type}`}>
      {toast.type === 'success' ? (
        <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
      ) : (
        <XCircle size={18} style={{ color: 'var(--danger)' }} />
      )}
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}

function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Header />
        {children}
      </div>
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Standalone Authentication Route (Sign In / Sign Up) */}
          <Route path="/login" element={<Auth />} />

          {/* Main Workspace Layout Routes */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/employees"
            element={
              <MainLayout>
                <Employees />
              </MainLayout>
            }
          />
          <Route
            path="/employees/:id"
            element={
              <MainLayout>
                <EmployeeProfile />
              </MainLayout>
            }
          />
          <Route
            path="/attendance"
            element={
              <MainLayout>
                <AttendanceLeave />
              </MainLayout>
            }
          />
          <Route
            path="/performance"
            element={
              <MainLayout>
                <Performance />
              </MainLayout>
            }
          />
          <Route
            path="/payroll"
            element={
              <MainLayout>
                <Payroll />
              </MainLayout>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
