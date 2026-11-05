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
  MessageSquare,
  User,
  ThumbsUp,
  ChevronRight,
} from 'lucide-react';
import { departments } from '../data/sampleData';
import { useApp } from '../context/AppContext';

/* ── Shared review data ── */
const allReviews = [
  { id: 'REV-01', employeeId: 'EMP001', name: 'Ethan Wilson', department: 'Engineering', role: 'Senior Software Developer', cycle: 'Q4 2026', rating: 4.8, goalCompletion: 95, status: 'Exceeds Expectations', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', feedback: 'Consistently delivers complex architectural initiatives ahead of schedule. Demonstrates strong mentorship capabilities and cross-functional collaboration.' },
  { id: 'REV-02', employeeId: 'EMP002', name: 'Sophia Anderson', department: 'Design', role: 'UI/UX Designer', cycle: 'Q4 2026', rating: 4.9, goalCompletion: 98, status: 'Exceeds Expectations', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', feedback: 'Exceptional craftsmanship in design systems and user flows. Highly valued by cross-functional teams.' },
  { id: 'REV-03', employeeId: 'EMP003', name: 'Olivia Martin', department: 'Human Resources', role: 'HR Manager', cycle: 'Q4 2026', rating: 4.6, goalCompletion: 92, status: 'Meets Expectations', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', feedback: 'Streamlined onboarding turnaround time and improved company-wide employee retention score by 14%.' },
  { id: 'REV-04', employeeId: 'EMP004', name: 'Noah Thomas', department: 'Marketing', role: 'Marketing Executive', cycle: 'Q4 2026', rating: 4.2, goalCompletion: 86, status: 'Meets Expectations', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', feedback: 'Solid performance across social campaigns and brand reach goals. On track with lead generation KPIs.' },
  { id: 'REV-05', employeeId: 'EMP005', name: 'Ava Johnson', department: 'Finance', role: 'Financial Analyst', cycle: 'Q4 2026', rating: 4.5, goalCompletion: 90, status: 'Meets Expectations', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', feedback: 'Accurate financial modeling and timely preparation of quarterly budget forecasts.' },
  { id: 'REV-06', employeeId: 'EMP006', name: 'Liam Brown', department: 'Design', role: 'Product Designer', cycle: 'Q4 2026', rating: 3.9, goalCompletion: 78, status: 'In Review', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', feedback: 'Review cycle currently open. Pending 360 feedback evaluation from engineering leads.' },
];

/* ── 360° peer feedback for Ethan Wilson ── */
const ethanPeerFeedback = [
  {
    reviewer: 'Sarah Mitchell',
    reviewerRole: 'HR Administrator',
    reviewerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    relationship: 'Manager',
    date: 'Oct 28, 2026',
    rating: 5.0,
    categories: { 'Technical Skills': 5, 'Communication': 4, 'Leadership': 5, 'Teamwork': 5 },
    comment: 'Ethan consistently goes above and beyond expectations. His architectural decisions for the Q3 platform migration were exceptional — delivered 2 weeks ahead of schedule with zero downtime. A model engineer and a great mentor to junior staff.',
  },
  {
    reviewer: 'Sophia Anderson',
    reviewerRole: 'UI/UX Designer',
    reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    relationship: 'Peer',
    date: 'Oct 25, 2026',
    rating: 4.8,
    categories: { 'Technical Skills': 5, 'Communication': 5, 'Collaboration': 5, 'Responsiveness': 4 },
    comment: 'Working with Ethan on the design-to-dev handoff has been seamless. He\'s always patient with design requirements and finds creative engineering solutions that preserve the design intent. Very collaborative.',
  },
  {
    reviewer: 'David Chen',
    reviewerRole: 'VP Engineering',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    relationship: 'Senior Manager',
    date: 'Oct 30, 2026',
    rating: 4.9,
    categories: { 'Technical Skills': 5, 'Problem Solving': 5, 'Initiative': 5, 'Documentation': 4 },
    comment: 'One of the strongest engineers on the team. Ethan\'s code quality, documentation standards, and initiative in driving best practices across the team are commendable. Highly recommend for a Tech Lead role.',
  },
  {
    reviewer: 'Noah Thomas',
    reviewerRole: 'Marketing Executive',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    relationship: 'Peer (Cross-functional)',
    date: 'Oct 22, 2026',
    rating: 4.6,
    categories: { 'Communication': 5, 'Availability': 4, 'Helpfulness': 5, 'Delivery': 5 },
    comment: 'Ethan supported our marketing analytics dashboard integration with great patience. He explained complex technical concepts clearly and delivered exactly what we needed on time.',
  },
];

/* ── Ethan's goals ── */
const ethanGoals = [
  { title: 'Complete GraphQL API Migration', completion: 100, status: 'Done', due: 'Sep 30, 2026' },
  { title: 'Mentor 2 Junior Engineers', completion: 100, status: 'Done', due: 'Oct 15, 2026' },
  { title: 'Reduce Build Time by 30%', completion: 90, status: 'On Track', due: 'Nov 30, 2026' },
  { title: 'Architecture RFC Documentation', completion: 75, status: 'In Progress', due: 'Dec 15, 2026' },
];

/* ── Star Rating Display ── */
function StarRating({ rating, size = 16 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill={rating >= i ? '#F59E0B' : rating >= i - 0.5 ? '#FCD34D' : 'none'} color={rating >= i - 0.5 ? '#F59E0B' : '#D1D5DB'} />
      ))}
    </span>
  );
}

/* ── Employee Self-Service Performance View ── */
function EmployeePerformanceView() {
  const myReview = allReviews.find((r) => r.employeeId === 'EMP001');
  const [activeTab, setActiveTab] = useState('overview');

  const relBadgeColor = (rel) =>
    rel === 'Manager' || rel === 'Senior Manager' ? 'var(--primary)' : rel === 'Peer' || rel.includes('Cross') ? 'var(--info)' : 'var(--success)';

  const goalStatusColor = (s) =>
    s === 'Done' ? 'var(--success)' : s === 'On Track' ? 'var(--primary)' : 'var(--warning)';

  const avgPeerRating = (ethanPeerFeedback.reduce((s, f) => s + f.rating, 0) / ethanPeerFeedback.length).toFixed(1);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Performance Review</h1>
        <p className="subtitle">Your Q4 2026 performance evaluation, goals, and 360° feedback.</p>
      </div>

      {/* Summary Cards */}
      <div className="stat-cards" style={{ marginBottom: 24 }}>
        {[
          { label: 'Overall Rating', value: `${myReview.rating} / 5.0`, accent: 'primary', sub: 'Q4 2026' },
          { label: 'Goal Completion', value: `${myReview.goalCompletion}%`, accent: 'success', sub: '4 of 4 goals tracked' },
          { label: '360° Peer Rating', value: `${avgPeerRating} / 5.0`, accent: 'info', sub: `${ethanPeerFeedback.length} reviewers` },
          { label: 'Evaluation Status', value: myReview.status, accent: 'warning', sub: 'Q4 cycle active' },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-info">
              <h3 style={{ color: `var(--${s.accent})`, fontSize: '1.3rem' }}>{s.value}</h3>
              <p>{s.label}</p>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          <Award size={16} /> Manager Review
        </button>
        <button className={`tab ${activeTab === 'goals' ? 'active' : ''}`} onClick={() => setActiveTab('goals')}>
          <Target size={16} /> Goals &amp; OKRs
        </button>
        <button className={`tab ${activeTab === 'feedback' ? 'active' : ''}`} onClick={() => setActiveTab('feedback')}>
          <MessageSquare size={16} /> 360° Peer Feedback
          <span style={{ marginLeft: 6, background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.72rem', padding: '1px 7px', borderRadius: 10, fontWeight: 600 }}>
            {ethanPeerFeedback.length}
          </span>
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={myReview.avatar} alt={myReview.name} style={{ width: 44, height: 44, borderRadius: '50%' }} />
              <div>
                <h2>{myReview.name}</h2>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{myReview.role} · {myReview.department}</span>
              </div>
            </div>
            <span className="badge badge-success"><span className="badge-dot" />{myReview.status}</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', gap: 24, background: 'var(--bg)', borderRadius: 'var(--radius-sm)', padding: 20, marginBottom: 20 }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>Overall Rating</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{myReview.rating}</div>
                <StarRating rating={myReview.rating} size={18} />
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>Goal Completion</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)' }}>{myReview.goalCompletion}%</div>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 4, marginTop: 8 }}>
                  <div style={{ height: '100%', width: `${myReview.goalCompletion}%`, background: 'var(--success)', borderRadius: 4 }} />
                </div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>Review Cycle</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>{myReview.cycle}</div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Reviewed: Oct 30, 2026</span>
              </div>
            </div>

            {/* Category ratings */}
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 14, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Category Breakdown</h3>
            {[
              { label: 'Technical Excellence', score: 5.0 },
              { label: 'Communication & Collaboration', score: 4.5 },
              { label: 'Leadership & Mentoring', score: 4.8 },
              { label: 'Initiative & Innovation', score: 4.9 },
              { label: 'Delivery & Reliability', score: 5.0 },
            ].map((cat) => (
              <div key={cat.label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <span style={{ flex: '0 0 220px', fontSize: '0.86rem', color: 'var(--text)' }}>{cat.label}</span>
                <div style={{ flex: 1, height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(cat.score / 5) * 100}%`, background: 'var(--primary)', borderRadius: 4 }} />
                </div>
                <span style={{ flex: '0 0 36px', textAlign: 'right', fontWeight: 700, fontSize: '0.86rem' }}>{cat.score}</span>
              </div>
            ))}

            {/* Manager comment */}
            <div style={{ marginTop: 20, padding: 16, background: 'var(--bg)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
                Manager's Overall Feedback — Sarah Mitchell
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)' }}>"{myReview.feedback}"</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="card">
          <div className="card-header"><h2>Goals &amp; OKRs — Q4 2026</h2></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ethanGoals.map((g, i) => (
              <div key={i} style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{g.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>Due: {g.due}</div>
                  </div>
                  <span style={{ background: `${goalStatusColor(g.status)}20`, color: goalStatusColor(g.status), fontSize: '0.76rem', fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>
                    {g.status}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${g.completion}%`, background: goalStatusColor(g.status), borderRadius: 4, transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.86rem', color: goalStatusColor(g.status) }}>{g.completion}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {ethanPeerFeedback.map((fb, i) => (
            <div key={i} className="card">
              <div className="card-body">
                {/* Reviewer header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
                  <img src={fb.reviewerAvatar} alt={fb.reviewer} style={{ width: 46, height: 46, borderRadius: '50%', border: '2px solid var(--border)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{fb.reviewer}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{fb.reviewerRole}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'inline-block', background: `${relBadgeColor(fb.relationship)}18`, color: relBadgeColor(fb.relationship), fontSize: '0.74rem', fontWeight: 600, padding: '3px 10px', borderRadius: 20, marginBottom: 4 }}>
                      {fb.relationship}
                    </span>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{fb.date}</div>
                  </div>
                </div>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <StarRating rating={fb.rating} size={17} />
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>{fb.rating} / 5.0</span>
                </div>

                {/* Category mini bars */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
                  {Object.entries(fb.categories).map(([cat, score]) => (
                    <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ flex: '0 0 120px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>{cat}</span>
                      <div style={{ flex: 1, height: 5, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(score / 5) * 100}%`, background: 'var(--primary)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text)', marginLeft: 4 }}>{score}</span>
                    </div>
                  ))}
                </div>

                {/* Comment */}
                <div style={{ padding: 14, background: 'var(--bg)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--border)' }}>
                  <MessageSquare size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6, color: 'var(--text-secondary)' }} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6 }}>{fb.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Admin Performance View (unchanged logic) ── */
function AdminPerformanceView() {
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

  const filtered = allReviews.filter((r) => {
    const q = search.toLowerCase();
    return (r.name.toLowerCase().includes(q) || r.role.toLowerCase().includes(q))
      && (deptFilter === 'All Departments' || r.department === deptFilter)
      && (statusFilter === 'All' || r.status === statusFilter);
  });

  const ratingColor = (r) => r >= 4.5 ? 'var(--success)' : r >= 4.0 ? 'var(--primary)' : r >= 3.5 ? 'var(--warning)' : 'var(--danger)';
  const statusBadge = (s) => s === 'Exceeds Expectations' ? 'badge-success' : s === 'Meets Expectations' ? 'badge-info' : 'badge-warning';

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Performance</h1>
        <p className="subtitle">Track employee quarterly evaluations, goal metrics and reviews.</p>
      </div>

      <div className="stat-cards">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className={`stat-icon ${s.accent}`}><s.icon size={22} /></div>
            <div className="stat-info">
              <h3>{s.value}</h3>
              <p>{s.label}</p>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{s.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-input">
            <Search size={15} />
            <input type="text" placeholder="Search employee..." value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && <span className="clear-search-btn" onClick={() => setSearch('')}><X size={14} /></span>}
          </div>
          <select className="filter-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option><option>Exceeds Expectations</option><option>Meets Expectations</option><option>In Review</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th><th>Cycle</th><th>Rating</th><th>Goal Completion</th><th>Status</th><th style={{ textAlign: 'center' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rev) => (
                <tr key={rev.id}>
                  <td>
                    <div className="employee-cell">
                      <img src={rev.avatar} alt={rev.name} />
                      <div className="emp-info">
                        <div className="emp-name">{rev.name}</div>
                        <div className="emp-email">{rev.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{rev.cycle}</td>
                  <td>
                    <span style={{ fontWeight: 700, color: ratingColor(rev.rating) }}>{rev.rating}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}> / 5.0</span>
                    <div style={{ marginTop: 4 }}><StarRating rating={rev.rating} size={12} /></div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${rev.goalCompletion}%`, background: 'var(--primary)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{rev.goalCompletion}%</span>
                    </div>
                  </td>
                  <td><span className={`badge ${statusBadge(rev.status)}`}><span className="badge-dot" />{rev.status}</span></td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setSelectedReview(rev)}>
                      <Eye size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedReview && (
        <div className="modal-overlay" onClick={() => setSelectedReview(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Performance Evaluation</h3>
              <button className="drawer-close" onClick={() => setSelectedReview(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
                <img src={selectedReview.avatar} alt={selectedReview.name} style={{ width: 48, height: 48, borderRadius: '50%' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{selectedReview.name}</h4>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{selectedReview.role} · {selectedReview.department}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg)', padding: 12, borderRadius: 8, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Overall Score</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{selectedReview.rating} / 5.0</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Goal Completion</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>{selectedReview.goalCompletion}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Cycle</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>{selectedReview.cycle}</div>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Manager Feedback</span>
                <p style={{ marginTop: 6, fontSize: '0.9rem', background: '#FAFAFD', padding: 12, borderRadius: 8, border: '1px solid var(--border)', lineHeight: 1.5 }}>"{selectedReview.feedback}"</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setSelectedReview(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Root export: role-aware ── */
export default function Performance() {
  const { userRole } = useApp();
  return userRole === 'employee' ? <EmployeePerformanceView /> : <AdminPerformanceView />;
}
