import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  UserCheck,
  Shield,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Auth() {
  const navigate = useNavigate();
  const { showToast, login } = useApp();

  const [email, setEmail] = useState('sarah.mitchell@peoplehub.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login('admin');
    showToast('Welcome back, Sarah! Authenticated as Administrator.', 'success');
    navigate('/');
  };

  const handleAdminDemoLogin = () => {
    login('admin');
    showToast('Signed in as Admin (Sarah Mitchell)', 'success');
    navigate('/');
  };

  const handleEmployeeDemoLogin = () => {
    login('employee');
    showToast('Signed in as Employee (Ethan Wilson)', 'success');
    navigate('/');
  };

  return (
    <div className="auth-viewport">
      <div className="auth-card-container">
        {/* ── LEFT SIDE: LOGIN FORM ── */}
        <div className="auth-left-panel">
          {/* Top Status Pill */}
          <div className="auth-top-status-row">
            <div className="status-operational-pill">
              <span className="pulse-green-dot" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Heading */}
          <div className="auth-heading-section">
            <h1 className="auth-title">Welcome back to PeopleHub</h1>
            <p className="auth-subtitle">
              Sign in to access your company workforce and management portal
            </p>
          </div>

          {/* SSO Quick Buttons */}
          <div className="sso-buttons-row">
            <button
              type="button"
              className="sso-btn"
              onClick={handleAdminDemoLogin}
              title="Quick sign-in with Google Workspace"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google Workspace</span>
            </button>

            <button
              type="button"
              className="sso-btn"
              onClick={handleEmployeeDemoLogin}
              title="Quick sign-in with Microsoft 365 / Okta"
            >
              <svg width="18" height="18" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              <span>Microsoft 365 / Okta</span>
            </button>
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">OR SIGN IN WITH EMAIL</span>
            <span className="auth-divider-line" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <label>Work Email</label>
              <div className="auth-input-wrapper">
                <Mail size={16} className="auth-input-icon" />
                <input
                  type="email"
                  required
                  placeholder="sarah.jenkins@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <div className="auth-label-row">
                <label>Password</label>
                <button
                  type="button"
                  className="auth-forgot-link"
                  onClick={() => showToast('Password reset link sent to registered email', 'success')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & SSO auto-detect */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me for 30 days</span>
              </label>

              <span className="sso-autodetect-hint">
                <span className="shield-dot-icon">🛡</span> SSO Auto-detect
              </span>
            </div>

            {/* Submit Primary Button */}
            <button type="submit" className="auth-submit-btn">
              <span>Sign in to PeopleHub</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Shortcuts for Reviewers */}
          <div className="auth-demo-shortcuts">
            <span className="demo-label">Reviewer 1-Click Access:</span>
            <div className="demo-pills-row">
              <button
                type="button"
                className="demo-pill admin"
                onClick={handleAdminDemoLogin}
              >
                <Sparkles size={13} />
                <span>Admin View (Sarah)</span>
              </button>
              <button
                type="button"
                className="demo-pill employee"
                onClick={handleEmployeeDemoLogin}
              >
                <UserCheck size={13} />
                <span>Employee View (Ethan)</span>
              </button>
            </div>
          </div>

          {/* Bottom Compliance Badges */}
          <div className="compliance-badges-grid">
            <div className="compliance-badge">
              <div className="badge-icon-box">
                <ShieldCheck size={14} />
              </div>
              <div className="badge-text">
                <strong>SOC2 Type II</strong>
                <span>Certified Audit</span>
              </div>
            </div>

            <div className="compliance-badge">
              <div className="badge-icon-box">
                <Lock size={14} />
              </div>
              <div className="badge-text">
                <strong>256-Bit SSL</strong>
                <span>Bank-grade Encrypt</span>
              </div>
            </div>

            <div className="compliance-badge">
              <div className="badge-icon-box">
                <Shield size={14} />
              </div>
              <div className="badge-text">
                <strong>GDPR / HIPAA</strong>
                <span>Full Compliance</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDE: HERO BLUE/PURPLE BRAND PANEL ── */}
        <div className="auth-right-panel">
          {/* Top badges */}
          <div className="right-panel-top">
            <div className="enterprise-badge">
              <Sparkles size={13} />
              <span>Enterprise 4.8 LTS</span>
            </div>
            <div className="regions-pill">
              <span>UK</span>
              <span>US</span>
              <span>SG</span>
            </div>
          </div>

          {/* Testimonial Quote Card */}
          <div className="testimonial-card">
            <div className="testimonial-stars-row">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span className="rating-score">5.0 / 5.0</span>
            </div>

            <p className="testimonial-quote">
              “PeopleHub simplified our onboarding and attendance tracking across 20+
              countries. It has become our single source of truth.”
            </p>

            <div className="testimonial-author">
              <div className="author-avatar-fallback">E</div>
              <div className="author-meta">
                <div className="author-name">Elena Rostova</div>
                <div className="author-title">
                  VP of People Operations, Meridian Global
                </div>
              </div>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className="right-metrics-grid">
            <div className="metric-glass-box">
              <div className="metric-num">99.98%</div>
              <div className="metric-desc">Payroll Accuracy</div>
            </div>
            <div className="metric-glass-box">
              <div className="metric-num">140k+</div>
              <div className="metric-desc">Active Personnel</div>
            </div>
          </div>

          {/* Footer */}
          <div className="right-panel-footer">
            <span>© 2026 PeopleHub Inc.</span>
            <div className="footer-legal-links">
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
