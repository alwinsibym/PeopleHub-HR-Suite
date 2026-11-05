import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Pencil,
  Mail,
  Phone,
  MapPin,
  Hash,
  Building2,
  Briefcase,
  CalendarDays,
  User,
  CheckCircle2,
  X,
  Clock,
  ShieldCheck,
  TrendingUp,
  HeartHandshake,
  Laptop,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee } = useApp();

  // Find employee or fallback to Ethan Wilson (EMP001)
  const employee = employees.find((e) => e.id === id) || employees[0];

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    designation: employee.designation,
    department: employee.department,
    phone: employee.phone,
    location: employee.location,
    reportingManager: employee.reportingManager,
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateEmployee(employee.id, editForm);
    setIsEditModalOpen(false);
  };

  return (
    <div className="page-content">
      {/* Back button */}
      <button
        className="btn btn-outline"
        style={{ marginBottom: 20, borderRadius: 'var(--radius-full)' }}
        onClick={() => navigate('/employees')}
      >
        <ArrowLeft size={16} />
        Back to Employee Directory
      </button>

      {/* Profile Header Hero Card with Cover Banner */}
      <div className="profile-header-card">
        <div className="profile-cover-banner" />
        <div className="profile-header-content">
          <div className="profile-avatar-wrapper">
            <img
              className="profile-avatar"
              src={employee.avatar}
              alt={employee.name}
            />
            <span
              className="online-indicator"
              style={{ width: 14, height: 14, bottom: 6, right: 6 }}
            />
          </div>

          <div className="profile-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1>{employee.name}</h1>
              <span
                className={`badge ${
                  employee.status === 'Active' ? 'badge-success' : 'badge-info'
                }`}
              >
                <span className="badge-dot" />
                {employee.status}
              </span>
              <span
                className={`work-mode-pill ${
                  employee.workMode ? employee.workMode.toLowerCase() : 'hybrid'
                }`}
              >
                {employee.workMode || 'Hybrid'}
              </span>
            </div>

            <div className="profile-meta">
              <span>
                <Hash size={14} />
                {employee.id}
              </span>
              <span>
                <Briefcase size={14} />
                {employee.designation}
              </span>
              <span>
                <Building2 size={14} />
                {employee.department}
              </span>
              <span>
                <MapPin size={14} />
                {employee.location}
              </span>
              <span>
                <Clock size={14} />
                Tenure: {employee.tenure || '2 yrs 8 mos'}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditForm({
                  designation: employee.designation,
                  department: employee.department,
                  phone: employee.phone,
                  location: employee.location,
                  reportingManager: employee.reportingManager,
                });
                setIsEditModalOpen(true);
              }}
            >
              <Pencil size={15} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Information Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* PERSONAL INFORMATION */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h2>Personal Information</h2>
          </div>
          <div className="profile-section-body">
            <div className="profile-grid">
              <div className="profile-field">
                <span className="field-label">
                  <Mail size={12} /> Email Address
                </span>
                <span className="field-value">{employee.email}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">
                  <Phone size={12} /> Phone Number
                </span>
                <span className="field-value">{employee.phone}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">
                  <MapPin size={12} /> Residential Location
                </span>
                <span className="field-value">{employee.location}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">
                  <ShieldCheck size={12} /> Work Authorization
                </span>
                <span className="field-value">Citizen / Authorized</span>
              </div>
              <div className="profile-field" style={{ gridColumn: '1 / -1' }}>
                <span className="field-label">
                  <HeartHandshake size={12} /> Emergency Contact
                </span>
                <span className="field-value">
                  {employee.emergencyContact || 'Jessica Wilson (Spouse) • +1 (555) 234-9988'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* EMPLOYMENT DETAILS */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h2>Employment Details</h2>
          </div>
          <div className="profile-section-body">
            <div className="profile-grid">
              <div className="profile-field">
                <span className="field-label">Employee ID</span>
                <span className="field-value">{employee.id}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">Department</span>
                <span className="field-value">{employee.department}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">Designation</span>
                <span className="field-value">{employee.designation}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">
                  <CalendarDays size={12} /> Joining Date
                </span>
                <span className="field-value">
                  {new Date(employee.joiningDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="profile-field">
                <span className="field-label">
                  <Laptop size={12} /> Work Arrangement
                </span>
                <span className="field-value">{employee.workMode || 'Hybrid'} ({employee.employmentType})</span>
              </div>
              <div className="profile-field">
                <span className="field-label">
                  <User size={12} /> Reporting Manager
                </span>
                <span className="field-value">{employee.reportingManager}</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEAVE BALANCE */}
        <div className="profile-section">
          <div className="profile-section-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Leave Balance</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Fiscal Year 2026 • 24 Days Remaining
              </span>
            </div>
          </div>
          <div className="profile-section-body">
            <div className="leave-balance-grid">
              <div className="leave-balance-item">
                <div className="leave-count">{employee.leaveBalance.annual}</div>
                <div className="leave-label">Annual Leave</div>
                <div className="leave-total">Remaining of 18 days</div>
              </div>
              <div className="leave-balance-item">
                <div className="leave-count">{employee.leaveBalance.sick}</div>
                <div className="leave-label">Sick Leave</div>
                <div className="leave-total">Remaining of 10 days</div>
              </div>
              <div className="leave-balance-item">
                <div className="leave-count">{employee.leaveBalance.casual}</div>
                <div className="leave-label">Casual Leave</div>
                <div className="leave-total">Remaining of 07 days</div>
              </div>
            </div>
          </div>
        </div>

        {/* ATTENDANCE SUMMARY */}
        <div className="profile-section">
          <div className="profile-section-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Attendance Summary</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 600 }}>
                <TrendingUp size={12} style={{ display: 'inline', marginRight: 4 }} />
                Excellent Attendance Record
              </span>
            </div>
          </div>
          <div className="profile-section-body">
            <div className="attendance-summary-grid">
              <div className="attendance-summary-item">
                <div className="att-value" style={{ color: 'var(--success)' }}>
                  {employee.attendance.present}
                </div>
                <div className="att-label">Present Days</div>
              </div>
              <div className="attendance-summary-item">
                <div className="att-value" style={{ color: 'var(--danger)' }}>
                  {employee.attendance.absent}
                </div>
                <div className="att-label">Absent Days</div>
              </div>
              <div className="attendance-summary-item">
                <div className="att-value" style={{ color: 'var(--primary)' }}>
                  {employee.attendance.percentage}%
                </div>
                <div className="att-label">Turnout Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile Details</h3>
              <button
                className="drawer-close"
                onClick={() => setIsEditModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="modal-form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    value={editForm.designation}
                    onChange={(e) =>
                      setEditForm({ ...editForm, designation: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>Department</label>
                    <select
                      value={editForm.department}
                      onChange={(e) =>
                        setEditForm({ ...editForm, department: e.target.value })
                      }
                    >
                      <option>Engineering</option>
                      <option>Design</option>
                      <option>Human Resources</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Operations</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) =>
                        setEditForm({ ...editForm, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="modal-form-group">
                    <label>Reporting Manager</label>
                    <input
                      type="text"
                      value={editForm.reportingManager}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          reportingManager: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle2 size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
