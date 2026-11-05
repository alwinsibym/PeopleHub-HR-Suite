import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Mail,
  Building2,
  Hash,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Clock,
  Sparkles,
} from 'lucide-react';
import { departments } from '../data/sampleData';
import { useApp } from '../context/AppContext';

export default function Employees() {
  const navigate = useNavigate();
  const { employees, addEmployee } = useApp();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Employee Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    designation: '',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
  });

  const filtered = employees.filter((emp) => {
    const q = search.toLowerCase();
    const matchesSearch =
      emp.name.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.id.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q);
    const matchesDept =
      deptFilter === 'All Departments' || emp.department === deptFilter;
    const matchesStatus =
      statusFilter === 'All' || emp.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.designation) return;

    addEmployee(formData);
    setFormData({
      name: '',
      email: '',
      department: 'Engineering',
      designation: '',
      location: 'San Francisco, CA',
      workMode: 'Hybrid',
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Employees</h1>
        <p className="subtitle">View and manage your organization's directory and profiles.</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <span
            style={{
              fontSize: '0.86rem',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              background: 'white',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
            }}
          >
            Total Employees:{' '}
            <strong style={{ color: 'var(--primary)', marginLeft: 4 }}>
              {employees.length > 8 ? employees.length : 248}
            </strong>
          </span>

          <div className="search-input">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search by name, role or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <span
                className="clear-search-btn"
                onClick={() => setSearch('')}
                title="Clear search"
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
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
          </select>
        </div>

        <div className="toolbar-right">
          <button
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Work Mode</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="employee-cell">
                      <div className="employee-avatar-wrapper">
                        <img src={emp.avatar} alt={emp.name} />
                        <span
                          className={`emp-status-dot ${
                            emp.status === 'Active' ? 'active' : 'leave'
                          }`}
                        />
                      </div>
                      <div className="emp-info">
                        <div className="emp-name">{emp.name}</div>
                        <div className="emp-email">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {emp.id}
                  </td>
                  <td>
                    <span
                      style={{
                        background: 'var(--bg)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border)',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                      }}
                    >
                      {emp.department}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text)', fontWeight: 500 }}>
                    {emp.designation}
                  </td>
                  <td>
                    <span
                      className={`work-mode-pill ${
                        emp.workMode ? emp.workMode.toLowerCase() : 'hybrid'
                      }`}
                    >
                      {emp.workMode || 'Hybrid'}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        emp.status === 'Active'
                          ? 'badge-success'
                          : emp.status === 'On Leave'
                          ? 'badge-info'
                          : 'badge-neutral'
                      }`}
                    >
                      <span className="badge-dot" />
                      {emp.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div
                      className="action-btns"
                      style={{ justifyContent: 'center' }}
                    >
                      <button
                        className="btn-icon"
                        title="Quick Preview"
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ padding: '5px 12px', fontSize: '0.78rem', borderRadius: 'var(--radius-full)' }}
                        onClick={() => navigate(`/employees/${emp.id}`)}
                      >
                        Profile <ArrowRight size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: 'center',
                      padding: 48,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <Search
                      size={32}
                      style={{
                        margin: '0 auto 8px',
                        display: 'block',
                        color: 'var(--text-muted)',
                      }}
                    />
                    No employees found matching your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <span className="pagination-info">
            Showing {filtered.length} of {employees.length > 8 ? employees.length : 248} employees
          </span>
          <div className="pagination-buttons">
            <button disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Profile Preview Drawer */}
      {selectedEmployee && (
        <>
          <div
            className="drawer-overlay"
            onClick={() => setSelectedEmployee(null)}
          />
          <div className="drawer">
            <div className="drawer-header">
              <h3>Employee Overview</h3>
              <button
                className="drawer-close"
                onClick={() => setSelectedEmployee(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="drawer-body">
              <div className="drawer-hero">
                <img
                  className="drawer-profile-img"
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                />
                <div className="drawer-profile-name">
                  {selectedEmployee.name}
                </div>
                <div className="drawer-profile-role">
                  {selectedEmployee.designation}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <span className="badge badge-info">
                    <span className="badge-dot" />
                    {selectedEmployee.department}
                  </span>
                  <span className={`work-mode-pill ${selectedEmployee.workMode ? selectedEmployee.workMode.toLowerCase() : 'hybrid'}`}>
                    {selectedEmployee.workMode || 'Hybrid'}
                  </span>
                </div>
              </div>

              <div className="drawer-details">
                <div className="drawer-detail-card">
                  <div className="drawer-detail-icon">
                    <Mail size={16} />
                  </div>
                  <div className="drawer-detail-text">
                    <div className="detail-label">Email Address</div>
                    <div className="detail-value">{selectedEmployee.email}</div>
                  </div>
                </div>

                <div className="drawer-detail-card">
                  <div className="drawer-detail-icon">
                    <Hash size={16} />
                  </div>
                  <div className="drawer-detail-text">
                    <div className="detail-label">Employee ID</div>
                    <div className="detail-value">{selectedEmployee.id}</div>
                  </div>
                </div>

                <div className="drawer-detail-card">
                  <div className="drawer-detail-icon">
                    <Clock size={16} />
                  </div>
                  <div className="drawer-detail-text">
                    <div className="detail-label">Tenure at Organization</div>
                    <div className="detail-value">
                      {selectedEmployee.tenure || '2 yrs 4 mos'}
                    </div>
                  </div>
                </div>

                <div className="drawer-detail-card">
                  <div className="drawer-detail-icon">
                    <MapPin size={16} />
                  </div>
                  <div className="drawer-detail-text">
                    <div className="detail-label">Work Location</div>
                    <div className="detail-value">
                      {selectedEmployee.location || 'San Francisco, CA'}
                    </div>
                  </div>
                </div>

                <div className="drawer-detail-card">
                  <div className="drawer-detail-icon">
                    <User size={16} />
                  </div>
                  <div className="drawer-detail-text">
                    <div className="detail-label">Reporting Manager</div>
                    <div className="detail-value">
                      {selectedEmployee.reportingManager || 'David Chen'}
                    </div>
                  </div>
                </div>

                {/* Skills tags */}
                {selectedEmployee.skills && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.4px' }}>
                      Key Skills & Specializations
                    </div>
                    <div>
                      {selectedEmployee.skills.map((s, idx) => (
                        <span className="skill-tag" key={idx}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="drawer-footer">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/employees/${selectedEmployee.id}`)}
              >
                View Full Profile <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Employee</h3>
              <button
                className="drawer-close"
                onClick={() => setIsAddModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="modal-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rachel Green"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="modal-form-group">
                  <label>Work Email</label>
                  <input
                    type="email"
                    placeholder="rachel.green@peoplehub.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
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
                    <label>Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Frontend Engineer"
                      required
                      value={formData.designation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          designation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>Work Mode</label>
                    <select
                      value={formData.workMode}
                      onChange={(e) =>
                        setFormData({ ...formData, workMode: e.target.value })
                      }
                    >
                      <option>Hybrid</option>
                      <option>Onsite</option>
                      <option>Remote</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco, CA"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <CheckCircle2 size={16} /> Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
