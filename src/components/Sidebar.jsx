import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Award,
  DollarSign,
  HelpCircle,
  Hexagon,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const location = useLocation();
  const { employees, leaveRequests, showToast, userRole, currentUser } = useApp();

  const pendingCount = leaveRequests.filter((r) => r.status === 'Pending').length;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Hexagon size={20} strokeWidth={2.5} />
        </div>
        <div className="logo-brand">
          <span className="logo-title">PeopleHub</span>
          <span className="logo-tagline">
            {userRole === 'admin' ? 'HR Suite' : 'Employee Portal'}
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">
          {userRole === 'admin' ? 'Core Modules' : 'My Workspace'}
        </div>

        <NavLink
          to="/"
          className={`nav-item${isActive('/') ? ' active' : ''}`}
          end
        >
          <LayoutDashboard size={18} />
          <span>{userRole === 'admin' ? 'Dashboard' : 'My Dashboard'}</span>
        </NavLink>

        {userRole === 'admin' ? (
          <NavLink
            to="/employees"
            className={`nav-item${isActive('/employees') ? ' active' : ''}`}
          >
            <Users size={18} />
            <span style={{ flex: 1 }}>Employees</span>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 600,
                background: isActive('/employees') ? 'white' : 'var(--bg)',
                color: isActive('/employees') ? 'var(--primary)' : 'var(--text-secondary)',
                padding: '2px 7px',
                borderRadius: 10,
                border: '1px solid var(--border)',
              }}
            >
              248
            </span>
          </NavLink>
        ) : (
          <NavLink
            to="/employees/EMP001"
            className={`nav-item${isActive('/employees') ? ' active' : ''}`}
          >
            <User size={18} />
            <span style={{ flex: 1 }}>My Profile</span>
          </NavLink>
        )}

        <NavLink
          to="/attendance"
          className={`nav-item${isActive('/attendance') ? ' active' : ''}`}
        >
          <CalendarClock size={18} />
          <span style={{ flex: 1 }}>
            {userRole === 'admin' ? 'Attendance & Leave' : 'My Attendance & Leave'}
          </span>
          {pendingCount > 0 && userRole === 'admin' && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                background: 'var(--warning-light)',
                color: 'var(--warning)',
                padding: '2px 7px',
                borderRadius: 10,
                border: '1px solid #F6D7A0',
              }}
            >
              08
            </span>
          )}
        </NavLink>

        <div className="nav-section-label" style={{ marginTop: 8 }}>
          {userRole === 'admin' ? 'Additional Concepts' : 'My Records'}
        </div>

        <NavLink
          to="/performance"
          className={`nav-item${isActive('/performance') ? ' active' : ''}`}
        >
          <Award size={18} />
          <span>{userRole === 'admin' ? 'Performance' : 'My Reviews'}</span>
        </NavLink>

        <NavLink
          to="/payroll"
          className={`nav-item${isActive('/payroll') ? ' active' : ''}`}
        >
          <DollarSign size={18} />
          <span>{userRole === 'admin' ? 'Payroll' : 'My Payslips'}</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div
          className="nav-item"
          style={{ padding: '8px 10px' }}
          onClick={() => showToast('Help guide & shortcuts (Press ?)', 'success')}
        >
          <HelpCircle size={18} />
          <span>Help & Support</span>
        </div>

        <div className="sidebar-profile">
          <div className="sidebar-profile-avatar-wrapper">
            <img src={currentUser.avatar} alt={currentUser.name} />
            <span className="online-indicator" />
          </div>
          <div className="sidebar-profile-info">
            <div className="name">{currentUser.name}</div>
            <div className="role">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
