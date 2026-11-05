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
  Building,
} from 'lucide-react';
import { departments } from '../data/sampleData';
import { useApp } from '../context/AppContext';

const initialPayroll = [
  {
    id: 'PAY-01',
    name: 'Ethan Wilson',
    role: 'Senior Software Developer',
    department: 'Engineering',
    base: '$9,200',
    bonus: '+$800',
    net: '$8,450',
    status: 'Paid',
    payDate: 'Nov 01, 2026',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'PAY-02',
    name: 'Sophia Anderson',
    role: 'UI/UX Designer',
    department: 'Design',
    base: '$8,400',
    bonus: '+$600',
    net: '$7,720',
    status: 'Paid',
    payDate: 'Nov 01, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'PAY-03',
    name: 'Olivia Martin',
    role: 'HR Manager',
    department: 'Human Resources',
    base: '$8,800',
    bonus: '+$500',
    net: '$8,050',
    status: 'Paid',
    payDate: 'Nov 01, 2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'PAY-04',
    name: 'Noah Thomas',
    role: 'Marketing Executive',
    department: 'Marketing',
    base: '$6,800',
    bonus: '+$400',
    net: '$6,250',
    status: 'Processing',
    payDate: 'Nov 05, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'PAY-05',
    name: 'Ava Johnson',
    role: 'Financial Analyst',
    department: 'Finance',
    base: '$8,100',
    bonus: '+$700',
    net: '$7,560',
    status: 'Paid',
    payDate: 'Nov 01, 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'PAY-06',
    name: 'Liam Brown',
    role: 'Product Designer',
    department: 'Design',
    base: '$7,900',
    bonus: '+$500',
    net: '$7,280',
    status: 'Paid',
    payDate: 'Nov 01, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
];

export default function Payroll() {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All');

  const stats = [
    { label: 'Total Monthly Payroll', value: '$184,500', icon: DollarSign, accent: 'primary', trend: 'Nov 2026' },
    { label: 'Next Scheduled Payday', value: 'Nov 15, 2026', icon: Calendar, accent: 'info', trend: 'In 11 days' },
    { label: 'Disbursed Employees', value: '248 / 248', icon: CheckCircle2, accent: 'success', trend: '100% on time' },
    { label: 'Total Taxes & Deductions', value: '$38,200', icon: Receipt, accent: 'warning', trend: 'Compliant' },
  ];

  const filtered = initialPayroll.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q);
    const matchesDept =
      deptFilter === 'All Departments' || p.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const downloadPayslip = (name) => {
    showToast(`Payslip for ${name} downloaded successfully (PDF)`, 'success');
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Payroll & Compensation</h1>
        <p className="subtitle">
          Manage organizational salaries, monthly disbursements and payslips.
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
              <span className="stat-trend positive">{s.trend}</span>
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
              placeholder="Search by employee..."
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
            <option>Paid</option>
            <option>Processing</option>
          </select>
        </div>

        <div className="toolbar-right">
          <button
            className="btn btn-outline"
            onClick={() => showToast('Disbursement batch report generated', 'success')}
          >
            <CreditCard size={15} /> Run Payroll
          </button>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="card">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Base Salary</th>
                <th>Allowances / Bonus</th>
                <th>Net Payable</th>
                <th>Pay Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Payslip</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="employee-cell">
                      <div className="employee-avatar-wrapper">
                        <img src={item.avatar} alt={item.name} />
                        <span className="emp-status-dot active" />
                      </div>
                      <div className="emp-info">
                        <span className="emp-name">{item.name}</span>
                        <span className="emp-email">{item.role}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.department}</td>
                  <td style={{ fontWeight: 500 }}>{item.base}</td>
                  <td style={{ color: 'var(--success)', fontWeight: 600 }}>
                    {item.bonus}
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--text)' }}>
                    {item.net}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                    {item.payDate}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === 'Paid' ? 'badge-success' : 'badge-warning'
                      }`}
                    >
                      <span className="badge-dot" />
                      {item.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-icon"
                      title="Download Payslip (PDF)"
                      onClick={() => downloadPayslip(item.name)}
                    >
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
