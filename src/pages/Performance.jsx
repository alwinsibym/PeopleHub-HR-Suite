import { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Target,
  Clock,
  Search,
  X,
  Star,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { departments } from '../data/sampleData';
import { useApp } from '../context/AppContext';

const initialReviews = [
  {
    id: 'REV-01',
    name: 'Ethan Wilson',
    department: 'Engineering',
    role: 'Senior Software Developer',
    cycle: 'Q4 2026',
    rating: 4.8,
    goalCompletion: 95,
    status: 'Exceeds Expectations',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    feedback: 'Consistently delivers complex architectural initiatives ahead of schedule. Demonstrates strong mentorship.',
  },
  {
    id: 'REV-02',
    name: 'Sophia Anderson',
    department: 'Design',
    role: 'UI/UX Designer',
    cycle: 'Q4 2026',
    rating: 4.9,
    goalCompletion: 98,
    status: 'Exceeds Expectations',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    feedback: 'Exceptional craftsmanship in design systems and user flows. Highly valued by cross-functional teams.',
  },
  {
    id: 'REV-03',
    name: 'Olivia Martin',
    department: 'Human Resources',
    role: 'HR Manager',
    cycle: 'Q4 2026',
    rating: 4.6,
    goalCompletion: 92,
    status: 'Meets Expectations',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    feedback: 'Streamlined onboarding turnaround time and improved company-wide employee retention score by 14%.',
  },
  {
    id: 'REV-04',
    name: 'Noah Thomas',
    department: 'Marketing',
    role: 'Marketing Executive',
    cycle: 'Q4 2026',
    rating: 4.2,
    goalCompletion: 86,
    status: 'Meets Expectations',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    feedback: 'Solid performance across social campaigns and brand reach goals. On track with lead generation KPIs.',
  },
  {
    id: 'REV-05',
    name: 'Ava Johnson',
    department: 'Finance',
    role: 'Financial Analyst',
    cycle: 'Q4 2026',
    rating: 4.5,
    goalCompletion: 90,
    status: 'Meets Expectations',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    feedback: 'Accurate financial modeling and timely preparation of quarterly budget forecasts.',
  },
  {
    id: 'REV-06',
    name: 'Liam Brown',
    department: 'Design',
    role: 'Product Designer',
    cycle: 'Q4 2026',
    rating: 3.9,
    goalCompletion: 78,
    status: 'In Review',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    feedback: 'Review cycle currently open. Pending 360 feedback evaluation from engineering leads.',
  },
];

export default function Performance() {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReview, setSelectedReview] = useState(null);

  const stats = [
    { label: 'Average Rating', value: '4.5 / 5.0', icon: Award, accent: 'primary', trend: '+0.3 vs Q3' },
    { label: 'Reviews Completed', value: '234 / 248', icon: CheckCircle2, accent: 'success', trend: '94% finished' },
    { label: 'Goals On Track', value: '91%', icon: Target, accent: 'info', trend: 'High velocity' },
    { label: 'Pending Evaluations', value: '14', icon: Clock, accent: 'warning', trend: 'Due Nov 30' },
  ];

  const filtered = initialReviews.filter((r) => {
    const q = search.toLowerCase();
    const matchesSearch =
      r.name.toLowerCase().includes(q) || r.role.toLowerCase().includes(q);
    const matchesDept =
      deptFilter === 'All Departments' || r.department === deptFilter;
    const matchesStatus =
      statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Performance</h1>
        <p className="subtitle">
          Track employee quarterly evaluations, goal metrics and reviews.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="stat-cards">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-card-top">
              <span className="stat-label">{s.label}</span>
              <div className={`stat-icon ${s.accent}`}>
                <s.icon size={20} />
              </div>
            </div>
            <div className="stat-card-bottom">
              <div className="stat-value">{s.value}</div>
              <span className="stat-trend positive">
                <TrendingUp size={12} />
                {s.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-input">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search by employee or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <span className="clear-search-btn" onClick={() => setSearch('')}>
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
            <option>Exceeds Expectations</option>
            <option>Meets Expectations</option>
            <option>In Review</option>
          </select>
        </div>

        <div className="toolbar-right">
          <button
            className="btn btn-outline"
            onClick={() => showToast('Performance review cycle exported (CSV)', 'success')}
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Cycle</th>
                <th>Rating</th>
                <th>Goal Progress</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rev) => (
                <tr key={rev.id}>
                  <td>
                    <div className="employee-cell">
                      <div className="employee-avatar-wrapper">
                        <img src={rev.avatar} alt={rev.name} />
                        <span className="emp-status-dot active" />
                      </div>
                      <div className="emp-info">
                        <span className="emp-name">{rev.name}</span>
                        <span className="emp-email">{rev.role}</span>
                      </div>
                    </div>
                  </td>
                  <td>{rev.department}</td>
                  <td>
                    <span
                      style={{
                        background: 'var(--bg)',
                        padding: '3px 8px',
                        borderRadius: 6,
                        border: '1px solid var(--border)',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                      }}
                    >
                      {rev.cycle}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 700 }}>
                      <Star size={15} fill="#E6A23C" color="#E6A23C" />
                      <span>{rev.rating}</span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>/ 5.0</span>
                    </div>
                  </td>
                  <td style={{ minWidth: 140 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          flex: 1,
                          height: 7,
                          background: '#E5E7EB',
                          borderRadius: 4,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${rev.goalCompletion}%`,
                            height: '100%',
                            background:
                              rev.goalCompletion >= 90
                                ? 'var(--success)'
                                : rev.goalCompletion >= 75
                                ? 'var(--primary)'
                                : 'var(--warning)',
                            borderRadius: 4,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                        {rev.goalCompletion}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        rev.status === 'Exceeds Expectations'
                          ? 'badge-success'
                          : rev.status === 'Meets Expectations'
                          ? 'badge-info'
                          : 'badge-warning'
                      }`}
                    >
                      <span className="badge-dot" />
                      {rev.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedReview(rev)}
                    >
                      <Eye size={13} /> Review Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Details Modal */}
      {selectedReview && (
        <div className="modal-overlay" onClick={() => setSelectedReview(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Performance Evaluation</h3>
              <button
                className="drawer-close"
                onClick={() => setSelectedReview(null)}
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
                  marginBottom: 16,
                  paddingBottom: 14,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <img
                  src={selectedReview.avatar}
                  alt={selectedReview.name}
                  style={{ width: 48, height: 48, borderRadius: '50%' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                    {selectedReview.name}
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {selectedReview.role} • {selectedReview.department}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg)', padding: 12, borderRadius: 8 }}>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Overall Score</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{selectedReview.rating} / 5.0</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Goal Completion</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>{selectedReview.goalCompletion}%</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Cycle</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>{selectedReview.cycle}</div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Manager Feedback & Rationale
                  </span>
                  <p style={{ marginTop: 6, fontSize: '0.9rem', color: 'var(--text)', background: '#FAFAFD', padding: 12, borderRadius: 8, border: '1px solid var(--border)', lineHeight: 1.5 }}>
                    "{selectedReview.feedback}"
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => setSelectedReview(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
