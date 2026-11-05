import { useState, useEffect } from 'react';
import {
  Search,
  Check,
  X,
  Eye,
  UserCheck,
  UserX,
  Clock,
  CalendarOff,
  FileText,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Info,
  Send,
  LogIn,
  LogOut,
  Timer,
  CheckCircle2,
  Calendar,
  Building,
  Briefcase,
} from 'lucide-react';
import { departments, employees } from '../data/sampleData';
import { useApp } from '../context/AppContext';

/* ─── helpers ─── */
function padZ(n) { return String(n).padStart(2, '0'); }

function fmtDuration(ms) {
  if (ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${padZ(h)}h ${padZ(m)}m ${padZ(s)}s`;
}

/* ─── Shift definitions ─── */
const shiftColors = {
  'Morning (09:00 - 18:00)': { bg: '#EBF2FF', text: '#2563EB', border: '#BFDBFE' },
  'General (09:00 - 18:00)': { bg: '#EBF2FF', text: '#2563EB', border: '#BFDBFE' },
  'Evening (13:00 - 22:00)': { bg: '#FDF4FF', text: '#9333EA', border: '#F5D0FE' },
  'Night (21:00 - 06:00)': { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A' },
  'Remote / WFH': { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
  'Weekly Off': { bg: '#F1F5F9', text: '#64748B', border: '#E2E8F0' },
};

/* ─── Sample Roster Data ─── */
const initialRosterData = [
  {
    employeeId: 'EMP001',
    name: 'Ethan Wilson',
    role: 'Senior Software Developer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    schedule: {
      Mon: 'General (09:00 - 18:00)',
      Tue: 'General (09:00 - 18:00)',
      Wed: 'Remote / WFH',
      Thu: 'General (09:00 - 18:00)',
      Fri: 'Remote / WFH',
      Sat: 'Weekly Off',
      Sun: 'Weekly Off',
    },
  },
  {
    employeeId: 'EMP002',
    name: 'Sophia Anderson',
    role: 'UI/UX Designer',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    schedule: {
      Mon: 'General (09:00 - 18:00)',
      Tue: 'General (09:00 - 18:00)',
      Wed: 'General (09:00 - 18:00)',
      Thu: 'Remote / WFH',
      Fri: 'General (09:00 - 18:00)',
      Sat: 'Weekly Off',
      Sun: 'Weekly Off',
    },
  },
  {
    employeeId: 'EMP003',
    name: 'Olivia Martin',
    role: 'HR Manager',
    department: 'Human Resources',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    schedule: {
      Mon: 'General (09:00 - 18:00)',
      Tue: 'General (09:00 - 18:00)',
      Wed: 'General (09:00 - 18:00)',
      Thu: 'General (09:00 - 18:00)',
      Fri: 'General (09:00 - 18:00)',
      Sat: 'Weekly Off',
      Sun: 'Weekly Off',
    },
  },
  {
    employeeId: 'EMP004',
    name: 'Noah Thomas',
    role: 'Marketing Executive',
    department: 'Marketing',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    schedule: {
      Mon: 'Remote / WFH',
      Tue: 'Remote / WFH',
      Wed: 'Remote / WFH',
      Thu: 'Remote / WFH',
      Fri: 'Remote / WFH',
      Sat: 'Weekly Off',
      Sun: 'Weekly Off',
    },
  },
  {
    employeeId: 'EMP005',
    name: 'Ava Johnson',
    role: 'Financial Analyst',
    department: 'Finance',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    schedule: {
      Mon: 'General (09:00 - 18:00)',
      Tue: 'General (09:00 - 18:00)',
      Wed: 'General (09:00 - 18:00)',
      Thu: 'General (09:00 - 18:00)',
      Fri: 'General (09:00 - 18:00)',
      Sat: 'Weekly Off',
      Sun: 'Weekly Off',
    },
  },
  {
    employeeId: 'EMP006',
    name: 'Liam Brown',
    role: 'Product Designer',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    schedule: {
      Mon: 'Evening (13:00 - 22:00)',
      Tue: 'Evening (13:00 - 22:00)',
      Wed: 'Evening (13:00 - 22:00)',
      Thu: 'Evening (13:00 - 22:00)',
      Fri: 'Evening (13:00 - 22:00)',
      Sat: 'Weekly Off',
      Sun: 'Weekly Off',
    },
  },
];

/* ─── Live Shift Timer (employee only) ─── */
function ShiftTimer({ isClockedIn, clockInTime, clockOutTime, SHIFT_START, SHIFT_END }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const shiftStart = new Date(now);
  shiftStart.setHours(SHIFT_START.h, SHIFT_START.m, 0, 0);
  const shiftEnd = new Date(now);
  shiftEnd.setHours(SHIFT_END.h, SHIFT_END.m, 0, 0);
  const shiftTotal = shiftEnd - shiftStart;

  if (clockOutTime) {
    const worked = clockOutTime - clockInTime;
    const pct = Math.min(100, (worked / shiftTotal) * 100);
    return (
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '24px 28px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--bg)', border: '3px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle2 size={30} color="var(--success)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: 4 }}>
            Shift Complete
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>
            {fmtDuration(worked)} worked
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Clocked in {clockInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} → Clocked out {clockOutTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={{ marginTop: 10, height: 6, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'var(--success)', borderRadius: 4, transition: 'width 1s linear' }} />
          </div>
        </div>
        <span className="badge badge-success" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>Logged Off</span>
      </div>
    );
  }

  if (!isClockedIn && now < shiftStart) {
    const timeToStart = shiftStart - now;
    return (
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '24px 28px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--info-light)', border: '3px solid var(--info)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Timer size={30} color="var(--info)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: 4 }}>
            Shift starts at {padZ(SHIFT_START.h)}:{padZ(SHIFT_START.m)}
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--info)', lineHeight: 1.1 }}>
            {fmtDuration(timeToStart)}
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Time remaining until your scheduled shift begins
          </div>
        </div>
        <span className="badge badge-info" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>Not Started</span>
      </div>
    );
  }

  if (isClockedIn && clockInTime) {
    const elapsed = now - clockInTime;
    const remaining = shiftEnd - now;
    const pct = Math.min(100, (elapsed / shiftTotal) * 100);
    return (
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--success)',
        borderRadius: 'var(--radius)',
        padding: '24px 28px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 28,
      }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--success-light)', border: '3px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Clock size={30} color="var(--success)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: 2 }}>
            Shift in progress · Clocked in at {clockInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={{ display: 'flex', gap: 36, marginTop: 4 }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--success)', lineHeight: 1.1 }}>{fmtDuration(elapsed)}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>Time Elapsed</div>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: remaining < 0 ? 'var(--danger)' : 'var(--warning)', lineHeight: 1.1 }}>
                {remaining < 0 ? '+' : ''}{fmtDuration(Math.abs(remaining))}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                {remaining < 0 ? 'Overtime' : 'Time Remaining'}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, height: 6, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: remaining < 0 ? 'var(--danger)' : 'var(--success)',
              borderRadius: 4,
              transition: 'width 1s linear',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            <span>09:00 AM</span>
            <span>Shift ends 06:00 PM</span>
          </div>
        </div>
        <span className="badge badge-success" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>● Active</span>
      </div>
    );
  }

  const timeLeft = shiftEnd - now;
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '24px 28px',
      marginBottom: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 24,
    }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--warning-light)', border: '3px solid var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LogIn size={30} color="var(--warning)" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, marginBottom: 4 }}>
          Shift in progress – Not yet clocked in
        </div>
        <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--warning)', lineHeight: 1.1 }}>
          {fmtDuration(timeLeft)} left in shift
        </div>
        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          Clock in now to start tracking your hours
        </div>
      </div>
      <span className="badge badge-warning" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>Not Clocked In</span>
    </div>
  );
}

/* ─── Duty Roster / Schedule Table ─── */
function RosterTable({ rosterData, isEmployee = false }) {
  const days = [
    { key: 'Mon', label: 'Mon, Nov 03' },
    { key: 'Tue', label: 'Tue, Nov 04' },
    { key: 'Wed', label: 'Wed, Nov 05', isToday: true },
    { key: 'Thu', label: 'Thu, Nov 06' },
    { key: 'Fri', label: 'Fri, Nov 07' },
    { key: 'Sat', label: 'Sat, Nov 08' },
    { key: 'Sun', label: 'Sun, Nov 09' },
  ];

  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Weekly Duty Roster &amp; Shifts</h2>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Week 45 · Nov 03 – Nov 09, 2026
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB' }} /> General (09-18)
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#059669' }} /> WFH
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#9333EA' }} /> Evening
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#64748B' }} /> Off
          </span>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table" style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', minWidth: 200 }}>Employee</th>
              {days.map((d) => (
                <th key={d.key} style={{ minWidth: 120, background: d.isToday ? '#EEEDFC' : undefined, color: d.isToday ? 'var(--primary)' : undefined }}>
                  {d.label}
                  {d.isToday && <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase' }}>Today</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rosterData.map((emp) => (
              <tr key={emp.employeeId}>
                <td style={{ textAlign: 'left' }}>
                  <div className="employee-cell">
                    <img src={emp.avatar} alt={emp.name} />
                    <div className="emp-info">
                      <span className="emp-name">{emp.name}</span>
                      <span className="emp-email">{emp.department}</span>
                    </div>
                  </div>
                </td>
                {days.map((d) => {
                  const shift = emp.schedule[d.key] || 'General (09:00 - 18:00)';
                  const style = shiftColors[shift] || shiftColors['General (09:00 - 18:00)'];
                  return (
                    <td key={d.key} style={{ background: d.isToday ? '#FAFAFD' : undefined, padding: '10px 6px' }}>
                      <div
                        style={{
                          background: style.bg,
                          color: style.text,
                          border: `1px solid ${style.border}`,
                          padding: '6px 8px',
                          borderRadius: 6,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          lineHeight: 1.2,
                        }}
                      >
                        {shift.includes('(') ? shift.split('(')[0] : shift}
                        <span style={{ display: 'block', fontSize: '0.68rem', opacity: 0.85, fontWeight: 500, marginTop: 2 }}>
                          {shift.includes('(') ? shift.split('(')[1].replace(')', '') : ''}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Employee Self-Service View ─── */
function EmployeeAttendanceView() {
  const {
    leaveRequests,
    isClockedIn,
    clockInTime,
    clockOutTime,
    SHIFT_START,
    SHIFT_END,
    toggleClock,
    submitEmployeeLeave,
  } = useApp();

  const [activeTab, setActiveTab] = useState('attendance');
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: 'Annual Leave',
    fromDate: '',
    toDate: '',
    days: 1,
    reason: '',
  });

  const myLeaves = leaveRequests.filter((l) => l.employeeId === 'EMP001');
  const myRoster = initialRosterData.filter((r) => r.employeeId === 'EMP001');

  const myAttendanceHistory = [
    { date: 'Nov 05, 2026', checkIn: '09:02 AM', checkOut: isClockedIn ? '—' : (clockOutTime ? clockOutTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'), status: 'Present', hours: isClockedIn ? 'In Progress' : '—' },
    { date: 'Nov 04, 2026', checkIn: '09:00 AM', checkOut: '06:03 PM', status: 'Present', hours: '9h 03m' },
    { date: 'Nov 03, 2026', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'Late', hours: '8h 45m' },
    { date: 'Nov 01, 2026', checkIn: '09:01 AM', checkOut: '06:00 PM', status: 'Present', hours: '8h 59m' },
    { date: 'Oct 31, 2026', checkIn: '09:00 AM', checkOut: '06:30 PM', status: 'Present', hours: '9h 30m' },
    { date: 'Oct 30, 2026', checkIn: '—', checkOut: '—', status: 'On Leave', hours: '—' },
    { date: 'Oct 29, 2026', checkIn: '09:05 AM', checkOut: '06:00 PM', status: 'Present', hours: '8h 55m' },
    { date: 'Oct 28, 2026', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', hours: '9h 00m' },
  ];

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    submitEmployeeLeave(leaveForm);
    setIsLeaveModalOpen(false);
    setLeaveForm({ type: 'Annual Leave', fromDate: '', toDate: '', days: 1, reason: '' });
  };

  const statusBadge = (s) => {
    if (s === 'Present') return 'badge-success';
    if (s === 'Late') return 'badge-warning';
    if (s === 'Absent') return 'badge-danger';
    return 'badge-info';
  };

  const leaveBadge = (s) => {
    if (s === 'Approved') return 'badge-success';
    if (s === 'Pending') return 'badge-warning';
    if (s === 'Rejected') return 'badge-danger';
    return 'badge-neutral';
  };

  return (
    <div className="page-content">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>My Attendance &amp; Leave</h1>
          <p className="subtitle">Your personal attendance records, weekly schedule, and leave history.</p>
        </div>
        <button
          className={`btn ${isClockedIn ? 'btn-danger' : 'btn-success'}`}
          onClick={toggleClock}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          {isClockedIn ? <LogOut size={16} /> : <LogIn size={16} />}
          {isClockedIn ? 'Clock Out' : 'Clock In'}
        </button>
      </div>

      {/* Live shift timer */}
      <ShiftTimer
        isClockedIn={isClockedIn}
        clockInTime={clockInTime}
        clockOutTime={clockOutTime}
        SHIFT_START={SHIFT_START}
        SHIFT_END={SHIFT_END}
      />

      {/* Quick stats */}
      <div className="stat-cards" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 24 }}>
        {[
          { label: 'Present Days', value: '198', accent: 'success', sub: 'This year' },
          { label: 'Absent Days', value: '4', accent: 'danger', sub: 'This year' },
          { label: 'Attendance Rate', value: '98%', accent: 'primary', sub: 'Excellent' },
          { label: 'Leave Balance', value: '24d', accent: 'info', sub: '12 Annual · 7 Sick · 5 Casual' },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-info">
              <h3 style={{ color: `var(--${s.accent})` }}>{s.value}</h3>
              <p>{s.label}</p>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>
          <CalendarDays size={16} /> My Attendance Log
        </button>
        <button className={`tab ${activeTab === 'roster' ? 'active' : ''}`} onClick={() => setActiveTab('roster')}>
          <Calendar size={16} /> My Shift Schedule
        </button>
        <button className={`tab ${activeTab === 'leave' ? 'active' : ''}`} onClick={() => setActiveTab('leave')}>
          <FileText size={16} /> My Leave Requests
          {myLeaves.filter(l => l.status === 'Pending').length > 0 && (
            <span style={{ marginLeft: 6, background: 'var(--warning-light)', color: 'var(--warning)', fontSize: '0.72rem', padding: '1px 7px', borderRadius: 10, fontWeight: 600 }}>
              {myLeaves.filter(l => l.status === 'Pending').length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'attendance' && (
        <div className="card">
          <div className="card-header">
            <h2>Attendance Log</h2>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Showing last 8 days</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours Worked</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myAttendanceHistory.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{r.date}</td>
                  <td style={{ color: r.checkIn === '—' ? 'var(--text-secondary)' : 'var(--text)', fontWeight: 600 }}>{r.checkIn}</td>
                  <td style={{ color: r.checkOut === '—' ? 'var(--text-secondary)' : 'var(--text)', fontWeight: 600 }}>{r.checkOut}</td>
                  <td style={{ fontWeight: 600, color: r.hours === 'In Progress' ? 'var(--success)' : 'var(--text)' }}>{r.hours}</td>
                  <td><span className={`badge ${statusBadge(r.status)}`}><span className="badge-dot" />{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'roster' && (
        <RosterTable rosterData={myRoster} isEmployee={true} />
      )}

      {activeTab === 'leave' && (
        <div className="card">
          <div className="card-header">
            <h2>My Leave Requests</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setIsLeaveModalOpen(true)}>
              <FileText size={14} /> Apply for Leave
            </button>
          </div>
          {myLeaves.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-secondary)' }}>
              <CalendarOff size={36} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p>No leave requests yet. Use the button above to apply.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myLeaves.map((lr) => (
                  <tr key={lr.id}>
                    <td style={{ fontWeight: 600 }}>{lr.leaveType}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>{lr.fromDate}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>{lr.toDate}</td>
                    <td style={{ fontWeight: 600 }}>{lr.days}d</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lr.reason || '—'}
                    </td>
                    <td><span className={`badge ${leaveBadge(lr.status)}`}><span className="badge-dot" />{lr.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Apply Leave Modal */}
      {isLeaveModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLeaveModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Apply for Leave</h3>
              <button className="drawer-close" onClick={() => setIsLeaveModalOpen(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleLeaveSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Leave Type</label>
                  <select className="filter-select" style={{ width: '100%' }} value={leaveForm.type}
                    onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}>
                    <option>Annual Leave (12 days left)</option>
                    <option>Sick Leave (7 days left)</option>
                    <option>Casual Leave (5 days left)</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>From Date</label>
                    <input type="date" required value={leaveForm.fromDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, fromDate: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.86rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>To Date</label>
                    <input type="date" required value={leaveForm.toDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, toDate: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.86rem' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Number of Days</label>
                  <input type="number" min="1" max="14" required value={leaveForm.days}
                    onChange={(e) => setLeaveForm({ ...leaveForm, days: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.86rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Reason / Notes</label>
                  <input type="text" required placeholder="e.g. Family function" value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.86rem' }} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsLeaveModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Send size={14} /> Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Admin View ─── */
function AdminAttendanceView() {
  const { attendance, leaveRequests, approveLeave, rejectLeave } = useApp();

  const [activeTab, setActiveTab] = useState('attendance');
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('Today');
  const [actionModal, setActionModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending');

  const attendanceStats = [
    { label: 'Present Today', value: '219', icon: UserCheck, accent: 'success', sub: '201 Onsite · 18 Remote' },
    { label: 'Absent Today', value: '09', icon: UserX, accent: 'danger', sub: '3 Unexcused absences' },
    { label: 'Late Arrival', value: '08', icon: Clock, accent: 'warning', sub: 'Avg delay: 18 mins' },
    { label: 'On Approved Leave', value: '12', icon: CalendarOff, accent: 'info', sub: '8 PTO · 4 Medical' },
  ];

  const leaveStats = [
    { label: 'Total Requests', value: '42', accent: 'primary', sub: 'Fiscal Year 2026' },
    { label: 'Pending Approval', value: pendingLeaves.length < 10 ? `0${pendingLeaves.length}` : pendingLeaves.length, accent: 'warning', sub: 'Action required' },
    { label: 'Approved', value: '28', accent: 'success', sub: '66% approved' },
    { label: 'Rejected', value: '06', accent: 'danger', sub: 'Policy non-compliant' },
  ];

  const filteredAttendance = attendance.filter((r) => {
    const q = search.toLowerCase();
    return (r.name.toLowerCase().includes(q) || r.employeeId.toLowerCase().includes(q))
      && (deptFilter === 'All Departments' || r.department === deptFilter)
      && (statusFilter === 'All' || statusFilter === 'All Status' || r.status === statusFilter);
  });

  const filteredRoster = initialRosterData.filter((r) => {
    const q = search.toLowerCase();
    return (r.name.toLowerCase().includes(q) || r.employeeId.toLowerCase().includes(q))
      && (deptFilter === 'All Departments' || r.department === deptFilter);
  });

  const filteredLeave = leaveRequests.filter((r) => {
    const q = search.toLowerCase();
    return (r.name.toLowerCase().includes(q) || r.leaveType.toLowerCase().includes(q))
      && (deptFilter === 'All Departments' || r.department === deptFilter)
      && (statusFilter === 'All' || statusFilter === 'All Status' || r.status === statusFilter);
  });

  const handleConfirm = () => {
    if (!actionModal) return;
    actionModal.action === 'approve' ? approveLeave(actionModal.id) : rejectLeave(actionModal.id);
    setActionModal(null);
  };

  const badgeClass = (s) =>
    s === 'Present' ? 'badge-success' : s === 'Late' ? 'badge-warning' : s === 'Absent' ? 'badge-danger' : 'badge-info';
  const leaveBadgeClass = (s) =>
    s === 'Approved' ? 'badge-success' : s === 'Pending' ? 'badge-warning' : 'badge-danger';

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Attendance &amp; Workforce Schedule</h1>
        <p className="subtitle">Track real-time attendance, manage shift rosters, and review employee leave requests.</p>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => { setActiveTab('attendance'); setSearch(''); setStatusFilter('All'); }}>
          <CalendarDays size={17} /> Attendance Records <span className="tab-badge">248 Total</span>
        </button>
        <button className={`tab ${activeTab === 'roster' ? 'active' : ''}`} onClick={() => { setActiveTab('roster'); setSearch(''); setStatusFilter('All'); }}>
          <Calendar size={17} /> Duty Roster &amp; Shifts <span className="tab-badge">Weekly View</span>
        </button>
        <button className={`tab ${activeTab === 'leave' ? 'active' : ''}`} onClick={() => { setActiveTab('leave'); setSearch(''); setStatusFilter('All'); }}>
          <FileText size={17} /> Leave Requests <span className="tab-badge">{pendingLeaves.length} Pending</span>
        </button>
      </div>

      {activeTab !== 'roster' && (
        <div className="stat-cards">
          {(activeTab === 'attendance' ? attendanceStats : leaveStats).map((s, i) => (
            <div className="stat-card" key={i}>
              <div className={`stat-icon ${s.accent}`}>{s.icon ? <s.icon size={22} /> : <FileText size={22} />}</div>
              <div className="stat-info">
                <h3>{s.value}</h3>
                <p>{s.label}</p>
                {s.sub && <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{s.sub}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab !== 'roster' && (
        <div className="toolbar">
          <div className="toolbar-left">
            {activeTab === 'attendance' && (
              <div style={{ display: 'flex', gap: 4, background: 'white', padding: 4, borderRadius: 'var(--radius-full)', border: '1px solid var(--border)' }}>
                {['Today', 'Yesterday', 'Weekly'].map((d) => (
                  <button key={d} onClick={() => setSelectedDateFilter(d)} style={{ padding: '5px 14px', fontSize: '0.82rem', fontWeight: 600, borderRadius: 'var(--radius-full)', background: selectedDateFilter === d ? 'var(--primary)' : 'transparent', color: selectedDateFilter === d ? 'white' : 'var(--text-secondary)', transition: 'all 0.15s' }}>{d}</button>
                ))}
              </div>
            )}
            <div className="search-input">
              <Search size={15} />
              <input type="text" placeholder="Search by employee or ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
              {search && <span className="clear-search-btn" onClick={() => setSearch('')} title="Clear"><X size={14} /></span>}
            </div>
            <select className="filter-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {activeTab === 'attendance'
                ? ['All Status', 'Present', 'Late', 'Absent', 'On Leave'].map(o => <option key={o}>{o}</option>)
                : ['All Status', 'Pending', 'Approved', 'Rejected'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      )}

      {activeTab === 'roster' ? (
        <RosterTable rosterData={filteredRoster} />
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            {activeTab === 'attendance' ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th><th>Shift</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Source</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((r) => (
                    <tr key={r.employeeId}>
                      <td>
                        <div className="employee-cell">
                          <img src={r.avatar} alt={r.name} />
                          <div className="emp-info">
                            <div className="emp-name">{r.name}</div>
                            <div className="emp-email">{r.department} · {r.employeeId}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>{r.shift || '09:00 – 18:00'}</td>
                      <td style={{ fontWeight: 600 }}>{r.checkIn}</td>
                      <td style={{ fontWeight: 600 }}>{r.checkOut}</td>
                      <td style={{ fontWeight: 600 }}>{r.workingHours}</td>
                      <td><span style={{ background: 'var(--bg)', padding: '3px 9px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{r.source || 'Web App'}</span></td>
                      <td><span className={`badge ${badgeClass(r.status)}`}><span className="badge-dot" />{r.status}</span></td>
                    </tr>
                  ))}
                  {filteredAttendance.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: 44, color: 'var(--text-secondary)' }}>No records found.</td></tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th><th>Leave Type</th><th>Duration</th><th>From → To</th><th>Reason</th><th>Balance</th><th>Status</th><th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeave.map((lr) => (
                    <tr key={lr.id}>
                      <td>
                        <div className="employee-cell">
                          <img src={lr.avatar} alt={lr.name} />
                          <div className="emp-info">
                            <div className="emp-name">{lr.name}</div>
                            <div className="emp-email">{lr.department}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{lr.leaveType}</td>
                      <td>{lr.days}d</td>
                      <td style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{lr.fromDate} → {lr.toDate}</td>
                      <td style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lr.reason || '—'}</td>
                      <td>{lr.balanceRemaining ?? 12}d</td>
                      <td><span className={`badge ${leaveBadgeClass(lr.status)}`}><span className="badge-dot" />{lr.status}</span></td>
                      <td>
                        {lr.status === 'Pending' ? (
                          <div className="action-btns" style={{ justifyContent: 'center' }}>
                            <button className="btn btn-success btn-sm" onClick={() => setActionModal({ id: lr.id, name: lr.name, action: 'approve' })}><Check size={13} /> Approve</button>
                            <button className="btn btn-danger btn-sm" onClick={() => setActionModal({ id: lr.id, name: lr.name, action: 'reject' })}><X size={13} /> Reject</button>
                            <button className="btn-icon" title="Details" onClick={() => setViewModal(lr)}><Eye size={14} /></button>
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center' }}>
                            <button className="btn-icon" title="Details" onClick={() => setViewModal(lr)}><Eye size={14} /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredLeave.length === 0 && (
                    <tr><td colSpan={8} style={{ textAlign: 'center', padding: 44, color: 'var(--text-secondary)' }}>No leave requests found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="pagination">
            <span className="pagination-info">Showing {activeTab === 'attendance' ? filteredAttendance.length : filteredLeave.length} records</span>
            <div className="pagination-buttons">
              <button disabled><ChevronLeft size={16} /></button>
              <button className="active">1</button>
              <button>2</button>
              <button><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {actionModal && (
        <div className="modal-overlay" onClick={() => setActionModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{actionModal.action === 'approve' ? 'Approve' : 'Reject'} Leave Request</h3>
              <button className="drawer-close" onClick={() => setActionModal(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to <strong>{actionModal.action}</strong> the leave request for <strong>{actionModal.name}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setActionModal(null)}>Cancel</button>
              <button className={`btn ${actionModal.action === 'approve' ? 'btn-success' : 'btn-danger'}`} onClick={handleConfirm}>
                {actionModal.action === 'approve' ? <><Check size={14} /> Approve</> : <><X size={14} /> Reject</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewModal && (
        <div className="modal-overlay" onClick={() => setViewModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Leave Request Details</h3>
              <button className="drawer-close" onClick={() => setViewModal(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
                <img src={viewModal.avatar} alt={viewModal.name} style={{ width: 48, height: 48, borderRadius: '50%' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{viewModal.name}</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{viewModal.department} · ID: {viewModal.employeeId}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: '0.88rem' }}>
                {[['Leave Type', viewModal.leaveType], ['Duration', `${viewModal.days} Days`], ['From', viewModal.fromDate], ['To', viewModal.toDate]].map(([l, v]) => (
                  <div key={l}>
                    <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase' }}>{l}</span>
                    <strong>{v}</strong>
                  </div>
                ))}
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase' }}>Reason</span>
                  <p style={{ marginTop: 4, background: 'var(--bg)', padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>"{viewModal.reason || 'Personal leave request'}"</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setViewModal(null)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Root export: role-aware ─── */
export default function AttendanceLeave() {
  const { userRole } = useApp();
  return userRole === 'employee' ? <EmployeeAttendanceView /> : <AdminAttendanceView />;
}
