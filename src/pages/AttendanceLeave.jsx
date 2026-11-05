import { useState } from 'react';
import {
  Search,
  Check,
  X,
  Eye,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserX,
  Clock,
  CalendarOff,
  FileText,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { departments } from '../data/sampleData';
import { useApp } from '../context/AppContext';

export default function AttendanceLeave() {
  const {
    attendance,
    leaveRequests,
    approveLeave,
    rejectLeave,
  } = useApp();

  const [activeTab, setActiveTab] = useState('attendance');
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('Today');

  // Modal dialog state for confirmation & details
  const [actionModal, setActionModal] = useState(null); // { id, name, type, action: 'approve' | 'reject' }
  const [viewModal, setViewModal] = useState(null); // selected leave request object

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending');
  const approvedLeaves = leaveRequests.filter((l) => l.status === 'Approved');
  const rejectedLeaves = leaveRequests.filter((l) => l.status === 'Rejected');

  // Stats for Tab A (Attendance)
  const attendanceStats = [
    { label: 'Present Today', value: '219', icon: UserCheck, accent: 'success', sub: '201 Onsite • 18 Remote' },
    { label: 'Absent Today', value: '09', icon: UserX, accent: 'danger', sub: '3 Unexcused absences' },
    { label: 'Late Arrival', value: '08', icon: Clock, accent: 'warning', sub: 'Avg delay: 18 mins' },
    { label: 'On Approved Leave', value: '12', icon: CalendarOff, accent: 'info', sub: '8 PTO • 4 Medical' },
  ];

  // Stats for Tab B (Leave Requests) - matching exact assessment specs: 42, 08, 28, 06
  const pendingCountDisplay = pendingLeaves.length < 10 ? `0${pendingLeaves.length}` : pendingLeaves.length;
  const leaveStats = [
    { label: 'Total Requests', value: '42', accent: 'primary', sub: 'Fiscal Year 2026' },
    {
      label: 'Pending Approval',
      value: pendingCountDisplay,
      accent: 'warning',
      sub: 'Action required',
    },
    { label: 'Approved Requests', value: '28', accent: 'success', sub: '66% approved' },
    {
      label: 'Rejected Requests',
      value: '06',
      accent: 'danger',
      sub: 'Policy non-compliant',
    },
  ];

  // Filtered attendance records
  const filteredAttendance = attendance.filter((r) => {
    const q = search.toLowerCase();
    const matchesSearch =
      r.name.toLowerCase().includes(q) ||
      r.employeeId.toLowerCase().includes(q);
    const matchesDept =
      deptFilter === 'All Departments' || r.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  // Filtered leave requests
  const filteredLeave = leaveRequests.filter((r) => {
    const q = search.toLowerCase();
    const matchesSearch =
      r.name.toLowerCase().includes(q) ||
      r.employeeId.toLowerCase().includes(q) ||
      r.leaveType.toLowerCase().includes(q);
    const matchesDept =
      deptFilter === 'All Departments' || r.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleConfirmAction = () => {
    if (!actionModal) return;
    if (actionModal.action === 'approve') {
      approveLeave(actionModal.id);
    } else {
      rejectLeave(actionModal.id);
    }
    setActionModal(null);
  };

  const resetFilters = () => {
    setSearch('');
    setDeptFilter('All Departments');
    setStatusFilter('All');
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Attendance & Leave</h1>
        <p className="subtitle">
          Track real-time biometric attendance and manage employee leave requests.
        </p>
      </div>

      {/* Unified Tab Switcher */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('attendance');
            resetFilters();
          }}
        >
          <CalendarDays size={17} />
          <span>Attendance Records</span>
          <span className="tab-badge">248 Total</span>
        </button>
        <button
          className={`tab ${activeTab === 'leave' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('leave');
            resetFilters();
          }}
        >
          <FileText size={17} />
          <span>Leave Requests</span>
          <span className="tab-badge">{pendingLeaves.length} Pending</span>
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="stat-cards">
        {(activeTab === 'attendance' ? attendanceStats : leaveStats).map(
          (s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-card-top">
                <span className="stat-label">{s.label}</span>
                <div className={`stat-icon ${s.accent}`}>
                  {'icon' in s ? <s.icon size={20} /> : <FileText size={20} />}
                </div>
              </div>
              <div>
                <div className="stat-card-bottom">
                  <div className="stat-value">{s.value}</div>
                  <span
                    className={`stat-trend ${
                      s.accent === 'success'
                        ? 'positive'
                        : s.accent === 'warning'
                        ? 'caution'
                        : 'neutral'
                    }`}
                  >
                    {activeTab === 'attendance' ? 'Today' : 'YTD 2026'}
                  </span>
                </div>
                {s.sub && <div className="stat-supporting-text">{s.sub}</div>}
              </div>
            </div>
          )
        )}
      </div>

      {/* Toolbar & Filter Bar */}
      <div className="toolbar">
        <div className="toolbar-left">
          {activeTab === 'attendance' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'white',
                padding: '4px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border)',
              }}
            >
              {['Today', 'Yesterday', 'Weekly'].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDateFilter(d)}
                  style={{
                    padding: '5px 14px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-full)',
                    background: selectedDateFilter === d ? 'var(--primary)' : 'transparent',
                    color: selectedDateFilter === d ? 'white' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          )}

          <div className="search-input">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search by employee or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <span
                className="clear-search-btn"
                onClick={() => setSearch('')}
                title="Clear"
              >
                <X size={14} />
              </span>
            )}
          </div>

          <select
            className="filter-select"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {activeTab === 'attendance' ? (
              <>
                <option>All Status</option>
                <option>Present</option>
                <option>Late</option>
                <option>Absent</option>
                <option>On Leave</option>
              </>
            ) : (
              <>
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card">
        <div className="data-table-wrapper">
          {activeTab === 'attendance' ? (
            /* ── TAB A: Attendance Records Table ── */
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Shift Timing</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Working Hours</th>
                  <th>Source / Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((r) => (
                  <tr key={r.employeeId}>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar-wrapper">
                          <img src={r.avatar} alt={r.name} />
                          <span
                            className={`emp-status-dot ${
                              r.status === 'Present' || r.status === 'Late'
                                ? 'active'
                                : 'leave'
                            }`}
                          />
                        </div>
                        <span className="emp-info">
                          <span className="emp-name">{r.name}</span>
                          <span className="emp-email">{r.department} • {r.employeeId}</span>
                        </span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                      {r.shift || '09:00 – 18:00'}
                    </td>
                    <td style={{ color: r.checkIn === '—' ? 'var(--text-muted)' : 'var(--text)', fontWeight: 600 }}>
                      {r.checkIn}
                    </td>
                    <td style={{ color: r.checkOut === '—' ? 'var(--text-muted)' : 'var(--text)', fontWeight: 600 }}>
                      {r.checkOut}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text)' }}>
                      {r.workingHours}
                    </td>
                    <td>
                      <span
                        style={{
                          background: 'var(--bg)',
                          padding: '3px 9px',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--border)',
                          fontSize: '0.76rem',
                          color: 'var(--text-secondary)',
                          fontWeight: 500,
                        }}
                      >
                        {r.source || 'Web App'}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          r.status === 'Present'
                            ? 'badge-success'
                            : r.status === 'Late'
                            ? 'badge-warning'
                            : r.status === 'Absent'
                            ? 'badge-danger'
                            : 'badge-info'
                        }`}
                      >
                        <span className="badge-dot" />
                        {r.status}
                        {r.lateBy && ` (${r.lateBy})`}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredAttendance.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: 'center',
                        padding: 44,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      No attendance records found matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            /* ── TAB B: Leave Requests Table ── */
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Duration</th>
                  <th>Leave Reason</th>
                  <th>Remaining Bal.</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeave.map((lr) => (
                  <tr key={lr.id}>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar-wrapper">
                          <img src={lr.avatar} alt={lr.name} />
                          <span className="emp-status-dot active" />
                        </div>
                        <span className="emp-info">
                          <span className="emp-name">{lr.name}</span>
                          <span className="emp-email">{lr.department}</span>
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">
                        {lr.leaveType}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                      <div style={{ color: 'var(--text)', fontWeight: 600 }}>
                        {lr.days} {lr.days === 1 ? 'day' : 'days'}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {new Date(lr.fromDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        –{' '}
                        {new Date(lr.toDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </td>
                    <td style={{ maxWidth: 220, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lr.reason || 'Personal leave request'}
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          background: 'var(--bg)',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          border: '1px solid var(--border)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: lr.balanceRemaining < 5 ? 'var(--warning)' : 'var(--text)',
                        }}
                      >
                        {lr.balanceRemaining || 12} days left
                      </span>
                    </td>
                    <td>
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
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {lr.status === 'Pending' ? (
                        <div
                          className="action-btns"
                          style={{ justifyContent: 'center' }}
                        >
                          <button
                            className="btn btn-success btn-sm"
                            title="Approve Leave"
                            onClick={() =>
                              setActionModal({
                                id: lr.id,
                                name: lr.name,
                                type: lr.leaveType,
                                days: lr.days,
                                reason: lr.reason,
                                action: 'approve',
                              })
                            }
                          >
                            <Check size={14} />
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            title="Reject Leave"
                            onClick={() =>
                              setActionModal({
                                id: lr.id,
                                name: lr.name,
                                type: lr.leaveType,
                                days: lr.days,
                                reason: lr.reason,
                                action: 'reject',
                              })
                            }
                          >
                            <X size={14} />
                          </button>
                          <button
                            className="btn-icon"
                            title="View Full Details"
                            onClick={() => setViewModal(lr)}
                          >
                            <Eye size={15} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-outline btn-sm"
                          style={{ padding: '4px 12px', fontSize: '0.78rem', borderRadius: 'var(--radius-full)' }}
                          onClick={() => setViewModal(lr)}
                        >
                          <Info size={13} />
                          Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredLeave.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: 'center',
                        padding: 44,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <span className="pagination-info">
            Showing{' '}
            {activeTab === 'attendance'
              ? filteredAttendance.length
              : filteredLeave.length}{' '}
            records
          </span>
          <div className="pagination-buttons">
            <button disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="active">1</button>
            <button>2</button>
            <button>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal Dialog for Approve / Reject */}
      {actionModal && (
        <div className="modal-overlay" onClick={() => setActionModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {actionModal.action === 'approve'
                  ? 'Approve Leave Request'
                  : 'Reject Leave Request'}
              </h3>
              <button
                className="drawer-close"
                onClick={() => setActionModal(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p>
                {actionModal.action === 'approve' ? (
                  <>
                    Are you sure you want to approve the{' '}
                    <strong>{actionModal.type}</strong> ({actionModal.days} days) for{' '}
                    <strong>{actionModal.name}</strong>?
                    <br />
                    {actionModal.reason && (
                      <em style={{ display: 'block', marginTop: 8, color: 'var(--text-muted)' }}>
                        "{actionModal.reason}"
                      </em>
                    )}
                    <br />
                    The attendance calendar and employee leave balance will be updated automatically.
                  </>
                ) : (
                  <>
                    Are you sure you want to reject the{' '}
                    <strong>{actionModal.type}</strong> for{' '}
                    <strong>{actionModal.name}</strong>?
                    <br />
                    A notification will be sent to the employee.
                  </>
                )}
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setActionModal(null)}
              >
                Cancel
              </button>
              <button
                className={`btn ${
                  actionModal.action === 'approve' ? 'btn-success' : 'btn-danger'
                }`}
                style={
                  actionModal.action === 'reject'
                    ? {
                        background: 'var(--danger)',
                        color: 'white',
                        border: 'none',
                      }
                    : {}
                }
                onClick={handleConfirmAction}
              >
                {actionModal.action === 'approve' ? (
                  <>
                    <CheckCircle2 size={16} /> Confirm Approval
                  </>
                ) : (
                  <>
                    <XCircle size={16} /> Confirm Rejection
                  </>
                )}
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
              <button
                className="drawer-close"
                onClick={() => setViewModal(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 18,
                  paddingBottom: 14,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <img
                  src={viewModal.avatar}
                  alt={viewModal.name}
                  style={{ width: 48, height: 48, borderRadius: '50%' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                    {viewModal.name}
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {viewModal.department} • ID: {viewModal.employeeId}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 14,
                  fontSize: '0.88rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                    Leave Type
                  </span>
                  <strong>{viewModal.leaveType}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                    Duration
                  </span>
                  <strong>{viewModal.days} Days</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                    From Date
                  </span>
                  <span>{viewModal.fromDate}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                    To Date
                  </span>
                  <span>{viewModal.toDate}</span>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                    Reason & Notes
                  </span>
                  <p style={{ marginTop: 4, background: 'var(--bg)', padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    "{viewModal.reason || 'Personal leave request'}"
                  </p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                    Remaining Leave Balance
                  </span>
                  <strong>{viewModal.balanceRemaining || 12} Days</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                    Current Status
                  </span>
                  <span
                    className={`badge ${
                      viewModal.status === 'Approved'
                        ? 'badge-success'
                        : viewModal.status === 'Pending'
                        ? 'badge-warning'
                        : 'badge-danger'
                    }`}
                    style={{ marginTop: 4 }}
                  >
                    <span className="badge-dot" />
                    {viewModal.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => setViewModal(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
