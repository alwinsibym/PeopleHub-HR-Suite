import { useState } from 'react';
import {
  DollarSign,
  Calendar,
  CheckCircle2,
  Receipt,
  Search,
  X,
  Download,
  CreditCard,
  TrendingUp,
  Wallet,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { departments } from '../data/sampleData';
import { useApp } from '../context/AppContext';

/* ── Shared payroll data ── */
const allPayroll = [
  { id: 'PAY-01', employeeId: 'EMP001', name: 'Ethan Wilson', role: 'Senior Software Developer', department: 'Engineering', base: '$9,200', bonus: '+$800', deductions: '-$1,550', net: '$8,450', status: 'Paid', payDate: 'Nov 01, 2026', month: 'November 2026', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 'PAY-02', employeeId: 'EMP002', name: 'Sophia Anderson', role: 'UI/UX Designer', department: 'Design', base: '$8,400', bonus: '+$600', deductions: '-$1,280', net: '$7,720', status: 'Paid', payDate: 'Nov 01, 2026', month: 'November 2026', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
  { id: 'PAY-03', employeeId: 'EMP003', name: 'Olivia Martin', role: 'HR Manager', department: 'Human Resources', base: '$8,800', bonus: '+$500', deductions: '-$1,250', net: '$8,050', status: 'Paid', payDate: 'Nov 01, 2026', month: 'November 2026', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 'PAY-04', employeeId: 'EMP004', name: 'Noah Thomas', role: 'Marketing Executive', department: 'Marketing', base: '$6,800', bonus: '+$400', deductions: '-$950', net: '$6,250', status: 'Processing', payDate: 'Nov 15, 2026', month: 'November 2026', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
  { id: 'PAY-05', employeeId: 'EMP005', name: 'Ava Johnson', role: 'Financial Analyst', department: 'Finance', base: '$8,100', bonus: '+$700', deductions: '-$1,240', net: '$7,560', status: 'Paid', payDate: 'Nov 01, 2026', month: 'November 2026', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { id: 'PAY-06', employeeId: 'EMP006', name: 'Liam Brown', role: 'Product Designer', department: 'Design', base: '$7,900', bonus: '+$500', deductions: '-$1,120', net: '$7,280', status: 'Paid', payDate: 'Nov 01, 2026', month: 'November 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  // Ethan's past months
  { id: 'PAY-01-OCT', employeeId: 'EMP001', name: 'Ethan Wilson', role: 'Senior Software Developer', department: 'Engineering', base: '$9,200', bonus: '+$600', deductions: '-$1,550', net: '$8,250', status: 'Paid', payDate: 'Oct 01, 2026', month: 'October 2026', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 'PAY-01-SEP', employeeId: 'EMP001', name: 'Ethan Wilson', role: 'Senior Software Developer', department: 'Engineering', base: '$9,200', bonus: '+$300', deductions: '-$1,550', net: '$7,950', status: 'Paid', payDate: 'Sep 01, 2026', month: 'September 2026', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
];

/* ── Employee Self-Service Payroll View ── */
function EmployeePayrollView() {
  const { showToast, currentUser } = useApp();
  const [expanded, setExpanded] = useState('PAY-01');

  const myPayslips = allPayroll.filter((p) => p.employeeId === 'EMP001');
  const latestPayslip = myPayslips[0];

  const breakdownItems = [
    { label: 'Base Salary', value: latestPayslip.base, type: 'positive' },
    { label: 'Performance Bonus', value: latestPayslip.bonus, type: 'positive' },
    { label: 'Tax (Federal + State)', value: '-$1,100', type: 'negative' },
    { label: 'Health Insurance', value: '-$280', type: 'negative' },
    { label: 'Provident Fund (6%)', value: '-$170', type: 'negative' },
  ];

  const ytdStats = [
    { label: 'YTD Gross Earnings', value: '$90,600', accent: 'primary' },
    { label: 'YTD Net Pay', value: '$82,900', accent: 'success' },
    { label: 'YTD Tax Paid', value: '$7,700', accent: 'warning' },
    { label: 'Next Pay Date', value: 'Dec 01, 2026', accent: 'info' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Payslips</h1>
        <p className="subtitle">Your personal salary breakdown and payslip history.</p>
      </div>

      {/* YTD Summary cards */}
      <div className="stat-cards" style={{ marginBottom: 24 }}>
        {ytdStats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-info">
              <h3 style={{ color: `var(--${s.accent})` }}>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest payslip breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <h2>Current Month Breakdown</h2>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>November 2026</span>
          </div>
          <div className="card-body">
            {breakdownItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < breakdownItems.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: item.type === 'positive' ? 'var(--success)' : 'var(--danger)', fontSize: '0.95rem' }}>{item.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTop: '2px solid var(--border)' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>Net Pay</span>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>{latestPayslip.net}</span>
            </div>
          </div>
        </div>

        {/* Pay info card */}
        <div className="card">
          <div className="card-header"><h2>Payment Details</h2></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Pay Period', value: 'Nov 01 – Nov 30, 2026' },
              { label: 'Pay Date', value: latestPayslip.payDate },
              { label: 'Payment Method', value: 'Direct Deposit' },
              { label: 'Bank Account', value: '•••• •••• •••• 4821' },
              { label: 'Status', value: latestPayslip.status },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontWeight: 600 }}>
                  {label === 'Status'
                    ? <span className="badge badge-success"><span className="badge-dot" />{value}</span>
                    : value}
                </span>
              </div>
            ))}
            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => showToast('November 2026 payslip downloaded (PDF)', 'success')}>
              <Download size={15} /> Download Payslip (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* Payslip history */}
      <div className="card">
        <div className="card-header"><h2>Payslip History</h2></div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Base Salary</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Pay Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Download</th>
            </tr>
          </thead>
          <tbody>
            {myPayslips.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.month}</td>
                <td>{p.base}</td>
                <td style={{ color: 'var(--success)', fontWeight: 600 }}>{p.bonus}</td>
                <td style={{ color: 'var(--danger)' }}>{p.deductions}</td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{p.net}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>{p.payDate}</td>
                <td><span className={`badge ${p.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}><span className="badge-dot" />{p.status}</span></td>
                <td style={{ textAlign: 'center' }}>
                  <button className="btn-icon" title="Download PDF" onClick={() => showToast(`${p.month} payslip downloaded`, 'success')}>
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Admin Payroll View ── */
function AdminPayrollView() {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All');

  const currentMonthPayroll = allPayroll.filter((p) => p.month === 'November 2026');

  const stats = [
    { label: 'Total Monthly Payroll', value: '$184,500', icon: DollarSign, accent: 'primary', trend: 'Nov 2026' },
    { label: 'Next Payday', value: 'Nov 15, 2026', icon: Calendar, accent: 'info', trend: 'In 11 days' },
    { label: 'Disbursed', value: '248 / 248', icon: CheckCircle2, accent: 'success', trend: '100% on time' },
    { label: 'Total Deductions', value: '$38,200', icon: Receipt, accent: 'warning', trend: 'Compliant' },
  ];

  const filtered = currentMonthPayroll.filter((p) => {
    const q = search.toLowerCase();
    return (p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q))
      && (deptFilter === 'All Departments' || p.department === deptFilter)
      && (statusFilter === 'All' || p.status === statusFilter);
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Payroll &amp; Compensation</h1>
        <p className="subtitle">Manage organizational salaries, monthly disbursements and payslips.</p>
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
            <input type="text" placeholder="Search by employee..." value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && <span className="clear-search-btn" onClick={() => setSearch('')}><X size={14} /></span>}
          </div>
          <select className="filter-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option><option>Paid</option><option>Processing</option>
          </select>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-outline" onClick={() => showToast('Disbursement batch report generated', 'success')}>
            <CreditCard size={15} /> Run Payroll
          </button>
        </div>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th><th>Department</th><th>Base Salary</th><th>Bonus</th><th>Deductions</th><th>Net Pay</th><th>Pay Date</th><th>Status</th><th style={{ textAlign: 'center' }}>Payslip</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="employee-cell">
                      <img src={item.avatar} alt={item.name} />
                      <div className="emp-info">
                        <span className="emp-name">{item.name}</span>
                        <span className="emp-email">{item.role}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.department}</td>
                  <td style={{ fontWeight: 500 }}>{item.base}</td>
                  <td style={{ color: 'var(--success)', fontWeight: 600 }}>{item.bonus}</td>
                  <td style={{ color: 'var(--danger)' }}>{item.deductions}</td>
                  <td style={{ fontWeight: 700 }}>{item.net}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>{item.payDate}</td>
                  <td><span className={`badge ${item.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}><span className="badge-dot" />{item.status}</span></td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-icon" title="Download Payslip" onClick={() => showToast(`Payslip for ${item.name} downloaded (PDF)`, 'success')}>
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Payroll() {
  const { userRole } = useApp();
  return userRole === 'employee' ? <EmployeePayrollView /> : <AdminPayrollView />;
}
