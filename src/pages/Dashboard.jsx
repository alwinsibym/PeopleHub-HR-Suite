import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  CalendarOff,
  Clock,
  FileText,
  Check,
  X,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Calendar,
  Award,
  Sparkles,
  LogIn,
  LogOut,
  Plus,
  Send,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { upcomingEvents } from '../data/sampleData';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    employees,
    leaveRequests,
    activities,
    approveLeave,
    rejectLeave,
    userRole,
    isClockedIn,
    toggleClock,
    submitEmployeeLeave,
  } = useApp();

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: 'Annual Leave',
    fromDate: '2026-11-24',
    toDate: '2026-11-25',
    days: 2,
    reason: 'Family trip for Thanksgiving',
  });

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending');
  const ethanLeaves = leaveRequests.filter((l) => l.employeeId === 'EMP001');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Admin stats
  const adminStats = [
    {
      label: 'Total Employees',
      value: employees.length > 8 ? employees.length : '248',
      icon: Users,
      accent: 'primary',
      trend: '+4 this month',
      trendType: 'positive',
      supporting: '98% retention rate',
    },
    {
      label: 'Present Today',
      value: '219',
      icon: UserCheck,
      accent: 'success',
      trend: '88.3% turnout',
      trendType: 'positive',
      supporting: '201 Onsite • 18 Remote',
    },
    {
      label: 'On Leave',
      value: '12',
      icon: CalendarOff,
      accent: 'warning',
      trend: '4.8% of workforce',
      trendType: 'caution',
      supporting: '8 Scheduled • 4 Sick',
    },
    {
      label: 'Pending Requests',
      value: pendingLeaves.length < 10 ? `0${pendingLeaves.length}` : pendingLeaves.length,
      icon: FileText,
      accent: 'danger',
      trend: 'Requires review',
      trendType: 'neutral',
      supporting: 'Avg review: 2.4 hrs',
    },
  ];

  // Employee stats for Ethan Wilson
  const employeeStats = [
    {
      label: 'My Attendance Rate',
      value: '98%',
      icon: UserCheck,
      accent: 'success',
      trend: 'Excellent',
      trendType: 'positive',
      supporting: '198 Present • 4 Absent',
    },
    {
      label: 'Leave Balance Available',
      value: '24d',
      icon: CalendarOff,
      accent: 'primary',
      trend: '12 Annual left',
      trendType: 'positive',
      supporting: '7 Sick • 5 Casual',
    },
    {
      label: 'Today’s Shift Status',
      value: isClockedIn ? 'Clocked In' : 'Clocked Out',
      icon: Clock,
      accent: isClockedIn ? 'success' : 'warning',
      trend: isClockedIn ? '09:02 AM' : 'Shift Ended',
      trendType: isClockedIn ? 'positive' : 'caution',
      supporting: 'Shift: 09:00 – 18:00',
    },
    {
      label: 'My Active Requests',
      value: `${ethanLeaves.filter((l) => l.status === 'Pending').length} Pending`,
      icon: FileText,
      accent: 'info',
      trend: 'In Review',
      trendType: 'neutral',
      supporting: 'Managed by Sarah M.',
    },
  ];

  const attendanceData = [
    { label: 'Present', value: 219, color: 'var(--success)' },
    { label: 'Absent', value: 9, color: 'var(--danger)' },
    { label: 'Late', value: 8, color: 'var(--warning)' },
    { label: 'On Leave', value: 12, color: 'var(--info)' },
  ];

  const weeklyData = [
    { day: 'Mon', pct: 92 },
    { day: 'Tue', pct: 96 },
    { day: 'Wed', pct: 94 },
    { day: 'Thu', pct: 97 },
    { day: 'Fri', pct: 89, isToday: true },
  ];

  const totalAttendance = attendanceData.reduce((s, d) => s + d.value, 0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    submitEmployeeLeave(leaveForm);
    setIsLeaveModalOpen(false);
  };

  return (
    <div className="page-content">
      {/* Page Header */}
      <div
        className="page-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <h1>
            {userRole === 'admin'
              ? 'Good morning, Sarah!'
              : 'Welcome back, Ethan! 👋'}
          </h1>
          <p className="subtitle">
            {userRole === 'admin'
              ? "Here's an overview of your workforce and operations today."
              : 'Here is your daily attendance, leave balances, and team updates.'}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {userRole === 'employee' && (
            <button
              onClick={() => setIsLeaveModalOpen(true)}
              className="btn btn-primary"
              style={{ padding: '7px 16px', borderRadius: 'var(--radius-full)' }}
            >
              <Plus size={15} /> Apply for Leave
            </button>
          )}
          <div
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              background: 'white',
              padding: '7px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <Clock size={15} style={{ color: 'var(--primary)' }} />
            <span>{today}</span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="stat-cards">
        {(userRole === 'admin' ? adminStats : employeeStats).map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-card-top">
              <span className="stat-label">{s.label}</span>
              <div className={`stat-icon ${s.accent}`}>
                <s.icon size={20} />
              </div>
            </div>
            <div>
              <div className="stat-card-bottom">
                <div className="stat-value">{s.value}</div>
                <span className={`stat-trend ${s.trendType}`}>
                  {s.trendType === 'positive' && <ArrowUpRight size={13} />}
                  {s.trend}
                </span>
              </div>
              <div className="stat-supporting-text">{s.supporting}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-Column Section */}
      <div className="two-col">
        {/* LEFT SECTION: Attendance Overview (or Employee Punch Card) */}
        {userRole === 'admin' ? (
          <div className="card">
            <div className="card-header">
              <div>
                <h2>Attendance Overview</h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Live daily biometric & web logs
                </span>
              </div>
              <button
                className="card-action-btn"
                onClick={() => navigate('/attendance')}
              >
                Full Log <ChevronRight size={14} />
              </button>
            </div>
            <div className="card-body">
              <div className="attendance-overview-wrapper">
                <div className="donut-container">
                  <div className="donut-chart">
                    <svg width="146" height="146" viewBox="0 0 146 146">
                      {attendanceData.map((segment, i) => {
                        const pct = segment.value / totalAttendance;
                        const dashArray = `${pct * circumference} ${circumference}`;
                        const dashOffset = -offset * circumference;
                        const el = (
                          <circle
                            key={i}
                            cx="73"
                            cy="73"
                            r={radius}
                            fill="none"
                            stroke={segment.color}
                            strokeWidth="15"
                            strokeDasharray={dashArray}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                          />
                        );
                        offset += pct;
                        return el;
                      })}
                      <circle cx="73" cy="73" r="44" fill="white" />
                    </svg>
                    <div className="donut-center">
                      <div className="donut-value">{totalAttendance}</div>
                      <div className="donut-label">Workforce</div>
                    </div>
                  </div>

                  <div className="donut-legend">
                    {attendanceData.map((d, i) => (
                      <div className="legend-item" key={i}>
                        <span className="legend-dot" style={{ background: d.color }} />
                        <div className="legend-info">
                          <span className="legend-label">{d.label}</span>
                          <span className="legend-value">{d.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Attendance Mini Visualization */}
                <div className="weekly-attendance-box">
                  <div className="weekly-attendance-header">
                    <span>Weekly Attendance Trend (Mon–Fri)</span>
                    <div className="weekly-attendance-rate">
                      <TrendingUp size={12} style={{ display: 'inline', marginRight: 4 }} />
                      94.8% Average
                    </div>
                  </div>
                  <div className="weekly-bars">
                    {weeklyData.map((w, idx) => (
                      <div className="weekly-bar-item" key={idx}>
                        <div className="bar-track" title={`${w.day}: ${w.pct}%`}>
                          <div
                            className={`bar-fill ${w.isToday ? 'highlight' : ''}`}
                            style={{ height: `${w.pct}%` }}
                          />
                        </div>
                        <span className="weekly-bar-label">{w.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Employee Quick Clock In & Attendance Card */
          <div className="card">
            <div className="card-header">
              <div>
                <h2>My Workday Clock & Shift</h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Standard Engineering Shift (09:00 – 18:00)
                </span>
              </div>
              <span className={`badge ${isClockedIn ? 'badge-success' : 'badge-warning'}`}>
                <span className="badge-dot" />
                {isClockedIn ? 'Active On Shift' : 'Clocked Out'}
              </span>
            </div>
            <div className="card-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: isClockedIn ? 'var(--success-light)' : 'var(--warning-light)',
                  color: isClockedIn ? 'var(--success)' : 'var(--warning)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                {isClockedIn ? <LogIn size={36} /> : <LogOut size={36} />}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)' }}>
                {isClockedIn ? 'Clocked in at 09:02 AM' : 'Shift Not Active'}
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: 4, maxWidth: 360, margin: '6px auto 20px' }}>
                {isClockedIn
                  ? 'Your biometric check-in was registered. Click below when departing for the day.'
                  : 'Start your shift now to log your daily attendance and active hours.'}
              </p>
              <button
                className={`btn ${isClockedIn ? 'btn-danger' : 'btn-success'}`}
                style={{ padding: '10px 24px', borderRadius: 'var(--radius-full)', minWidth: 180 }}
                onClick={toggleClock}
              >
                {isClockedIn ? <LogOut size={16} /> : <LogIn size={16} />}
                {isClockedIn ? 'Clock Out Now' : 'Clock In for Shift'}
              </button>
            </div>
          </div>
        )}

        {/* RIGHT SECTION: Pending Leave Requests (Admin: Approve; Employee: My Requests) */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2>
                {userRole === 'admin'
                  ? 'Pending Leave Requests'
                  : 'My Leave Applications'}
              </h2>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: 'var(--warning-light)',
                  color: 'var(--warning)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(230, 162, 60, 0.3)',
                }}
              >
                {userRole === 'admin' ? `${pendingLeaves.length} pending` : `${ethanLeaves.length} records`}
              </span>
            </div>
            <button
              className="card-action-btn"
              onClick={() => navigate('/attendance')}
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{userRole === 'admin' ? 'Employee' : 'Type'}</th>
                  <th>Duration</th>
                  <th>Dates</th>
                  <th style={{ textAlign: 'right' }}>
                    {userRole === 'admin' ? 'Actions' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(userRole === 'admin' ? pendingLeaves.slice(0, 4) : ethanLeaves.slice(0, 4)).map((lr) => (
                  <tr key={lr.id}>
                    <td>
                      {userRole === 'admin' ? (
                        <div className="employee-cell">
                          <div className="employee-avatar-wrapper">
                            <img src={lr.avatar} alt={lr.name} />
                            <span className="emp-status-dot active" />
                          </div>
                          <div className="emp-info">
                            <span className="emp-name">{lr.name}</span>
                            <span className="emp-email">{lr.department}</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <strong style={{ fontSize: '0.9rem', color: 'var(--text)' }}>
                            {lr.leaveType}
                          </strong>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {lr.reason}
                          </div>
                        </div>
                      )}
                    </td>
                    <td style={{ fontSize: '0.84rem', fontWeight: 600 }}>
                      {lr.days} {lr.days === 1 ? 'day' : 'days'}
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {new Date(lr.fromDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                      {lr.days > 1 &&
                        ` – ${new Date(lr.toDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}`}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {userRole === 'admin' ? (
                        <div
                          className="action-btns"
                          style={{ justifyContent: 'flex-end' }}
                        >
                          <button
                            className="btn btn-success btn-sm"
                            title="Quick Approve"
                            onClick={() => approveLeave(lr.id)}
                          >
                            <Check size={14} />
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            title="Quick Reject"
                            onClick={() => rejectLeave(lr.id)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`badge ${
                            lr.status === 'Approved'
                              ? 'badge-success'
                              : lr.status === 'Pending'
                              ? 'badge-warning'
                              : 'badge-danger'
                          }`}
                        >
                          <span className="badge-dot" />
                          {lr.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upcoming Company Milestones & Holidays */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} style={{ color: 'var(--primary)' }} />
            <h2>Upcoming Company Events & Holidays</h2>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Next 30 Days
          </span>
        </div>
        <div className="card-body" style={{ padding: '16px 22px' }}>
          <div className="upcoming-events-grid">
            {upcomingEvents.map((ev, i) => (
              <div className="upcoming-event-card" key={i}>
                <div className="event-icon-circle">
                  {ev.type === 'holiday' && <Calendar size={16} />}
                  {ev.type === 'celebration' && <Award size={16} />}
                  {ev.type === 'meeting' && <Users size={16} />}
                </div>
                <div>
                  <div className="event-title">{ev.title}</div>
                  <div className="event-date">{ev.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="card">
        <div className="card-header">
          <h2>Recent Workforce Activity</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Live audit log
          </span>
        </div>
        <div className="card-body">
          <div className="activity-list">
            {activities.slice(0, 5).map((a, i) => (
              <div className="activity-item" key={i}>
                <div className={`activity-dot-circle ${a.type}`}>
                  {a.type === 'leave' && <CalendarOff size={15} />}
                  {a.type === 'attendance' && <UserCheck size={15} />}
                  {a.type === 'profile' && <Users size={15} />}
                </div>
                <div className="activity-content">
                  <div className="activity-text">{a.text}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Leave Modal for Employee */}
      {isLeaveModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLeaveModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Apply for Leave</h3>
              <button
                className="drawer-close"
                onClick={() => setIsLeaveModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleLeaveSubmit}>
              <div className="modal-body">
                <div className="modal-form-group">
                  <label>Leave Category</label>
                  <select
                    value={leaveForm.type}
                    onChange={(e) =>
                      setLeaveForm({ ...leaveForm, type: e.target.value })
                    }
                  >
                    <option>Annual Leave (12 days left)</option>
                    <option>Sick Leave (7 days left)</option>
                    <option>Casual Leave (5 days left)</option>
                  </select>
                </div>
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>From Date</label>
                    <input
                      type="date"
                      value={leaveForm.fromDate}
                      onChange={(e) =>
                        setLeaveForm({ ...leaveForm, fromDate: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label>To Date</label>
                    <input
                      type="date"
                      value={leaveForm.toDate}
                      onChange={(e) =>
                        setLeaveForm({ ...leaveForm, toDate: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-form-group">
                  <label>Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={leaveForm.days}
                    onChange={(e) =>
                      setLeaveForm({ ...leaveForm, days: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label>Reason / Notes for Manager (Sarah Mitchell)</label>
                  <input
                    type="text"
                    value={leaveForm.reason}
                    placeholder="e.g. Attending family function"
                    onChange={(e) =>
                      setLeaveForm({ ...leaveForm, reason: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsLeaveModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} /> Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
