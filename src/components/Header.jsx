import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  ChevronRight,
  Clock,
  UserCheck,
  CalendarOff,
  User,
  Settings,
  LogOut,
  CheckCheck,
  Building2,
  Repeat,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const breadcrumbMap = {
  '/': ['Dashboard'],
  '/employees': ['Employees', 'Directory'],
  '/attendance': ['Attendance & Leave'],
  '/performance': ['Performance', 'Reviews'],
  '/payroll': ['Payroll & Compensation'],
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast, userRole, currentUser, switchRole } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: 'Olivia Martin requested annual leave (Nov 10–12)',
      time: '2 hours ago',
      icon: CalendarOff,
      color: 'var(--primary-light)',
      iconColor: 'var(--primary)',
      unread: true,
    },
    {
      id: 2,
      text: 'Ethan Wilson checked in at 09:02 AM via Biometric',
      time: '3 hours ago',
      icon: Clock,
      color: 'var(--success-light)',
      iconColor: 'var(--success)',
      unread: true,
    },
    {
      id: 3,
      text: 'Noah Thomas submitted annual leave request (Nov 15–18)',
      time: '5 hours ago',
      icon: CalendarOff,
      color: 'var(--primary-light)',
      iconColor: 'var(--primary)',
      unread: true,
    },
    {
      id: 4,
      text: '219 employees present today across all departments',
      time: '6 hours ago',
      icon: UserCheck,
      color: 'var(--info-light)',
      iconColor: 'var(--info)',
      unread: false,
    },
  ]);

  const crumbs =
    breadcrumbMap[location.pathname] ||
    (location.pathname.startsWith('/employees/')
      ? ['Employees', 'Profile Details']
      : ['Dashboard']);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    setUnreadCount(0);
    showToast('All notifications marked as read', 'success');
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <div className="company-badge">
          <Building2 size={13} style={{ color: 'var(--primary)' }} />
          <span>Manzio Creative Studio</span>
        </div>

        <nav className="breadcrumb">
          {crumbs.map((crumb, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ChevronRight size={13} />
              <span className={i === crumbs.length - 1 ? 'current' : ''}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>

      <div className="header-right">
        {/* Role Switcher Pill for Interview Demo */}
        <button
          onClick={() => switchRole(userRole === 'admin' ? 'employee' : 'admin')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '5px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border)',
            background: userRole === 'admin' ? 'var(--primary-light)' : 'var(--success-light)',
            color: userRole === 'admin' ? 'var(--primary)' : 'var(--success)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          title="Click to toggle perspective between Administrator and Employee"
        >
          <Repeat size={13} />
          <span>
            {userRole === 'admin' ? 'Mode: Admin' : 'Mode: Employee (Ethan)'}
          </span>
          <span style={{ fontSize: '0.7rem', opacity: 0.8, textDecoration: 'underline' }}>
            Switch
          </span>
        </button>

        {/* Workforce Live Pulse */}
        <div className="workforce-pulse-badge">
          <span className="pulse-dot" />
          <span>219 Active Today</span>
        </div>

        <div className="header-search">
          <Search size={15} />
          <input
            type="text"
            placeholder="Quick search (Ctrl + K)..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value) {
                navigate('/employees');
              }
            }}
          />
        </div>

        {/* Notification Popover */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            className="header-icon-btn"
            onClick={() => {
              setShowNotif(!showNotif);
              setShowProfileMenu(false);
            }}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="badge-dot" />}
          </button>

          {showNotif && (
            <div className="dropdown-menu notif-dropdown">
              <div className="notif-dropdown-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h4>Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="notif-badge-pill">{unreadCount} new</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    style={{
                      fontSize: '0.76rem',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <CheckCheck size={13} />
                    Mark all read
                  </button>
                )}
              </div>
              <div className="notif-list">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`notif-item ${n.unread ? 'unread' : ''}`}
                    onClick={() => {
                      if (n.unread) {
                        setNotifications((prev) =>
                          prev.map((item) =>
                            item.id === n.id ? { ...item, unread: false } : item
                          )
                        );
                        setUnreadCount((c) => Math.max(0, c - 1));
                      }
                    }}
                  >
                    <div
                      className="notif-icon-circle"
                      style={{ background: n.color, color: n.iconColor }}
                    >
                      <n.icon size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="notif-text">{n.text}</div>
                      <div className="notif-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="notif-footer">
                <button onClick={() => navigate('/attendance')}>
                  View all attendance & leave updates
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            className="header-avatar-btn"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotif(false);
            }}
            title={currentUser.name}
          >
            <img src={currentUser.avatar} alt={currentUser.name} />
          </button>

          {showProfileMenu && (
            <div className="dropdown-menu profile-dropdown">
              <div className="profile-dropdown-user">
                <div className="user-name">{currentUser.name}</div>
                <div className="user-email">{currentUser.email}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600, marginTop: 2 }}>
                  Role: {currentUser.role}
                </div>
              </div>
              <button
                className="dropdown-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/employees/EMP001');
                }}
              >
                <User size={15} />
                {userRole === 'admin' ? 'View Sample Profile' : 'My Full Profile'}
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  switchRole(userRole === 'admin' ? 'employee' : 'admin');
                }}
              >
                <Repeat size={15} />
                {userRole === 'admin' ? 'Switch to Employee View' : 'Switch to Admin View'}
              </button>
              <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
              <button
                className="dropdown-item danger"
                onClick={() => {
                  setShowProfileMenu(false);
                  showToast('Logged out of session', 'success');
                  navigate('/login');
                }}
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
